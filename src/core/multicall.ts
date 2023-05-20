import { Multicall } from "ethereum-multicall";
import {
  formatUnits,
  INVALID_TOKEN_ADDRESS,
  parseResults,
} from "./common/helpers";

import { erc20ABI } from "vagmi";
import MANAGER_ABI from "./abis/Manager.json";
import FACTORY_ABI from "./abis/Factory.json";

import { Token } from "./models/Token";
import type { ManagerData, ManagerDataResults } from "./common/interfaces";

const ROUTER = import.meta.env.VITE_APP_ROUTER_ADDRESS;
const MANAGER = import.meta.env.VITE_APP_MANAGER_ADDRESS;
const FACTORY = import.meta.env.VITE_APP_FACTORY_ADDRESS;

export class Caller {
  private multicall: Multicall;
  private userAddress: string;

  constructor() {
    const provider = window.__PROVIDER__;
    const userAddress = window.__USER_ADDRESS__;
    this.multicall = new Multicall({
      ethersProvider: provider,
      tryAggregate: true,
    });
    this.userAddress = userAddress;
  }

  private init = () => {
    const provider = window.__PROVIDER__;
    const userAddress = window.__USER_ADDRESS__;
    this.multicall = new Multicall({
      ethersProvider: provider,
      tryAggregate: true,
    });
    this.userAddress = userAddress;
  };

  preFetch = async (): Promise<boolean> => {
    const { status } = await this.fetchStatusAndId();
    return status;
  };

  fetchStatusAndId = async (): Promise<{ id: number; status: boolean }> => {
    const request = [
      {
        reference: "id",
        methodName: "id()",
        methodParameters: [],
      },
      {
        reference: "status",
        methodName: "isTournamentActive()",
        methodParameters: [],
      },
    ];

    const calls = [
      {
        reference: "data",
        contractAddress: MANAGER,
        abi: MANAGER_ABI,
        calls: request,
      },
    ];

    const { results } = await this.multicall.call(calls);
    const { callsReturnContext } = results["data"];
    const { id, status } = parseResults<{ id: string; status: boolean }>(
      callsReturnContext
    );

    return {
      id: +id,
      status,
    };
  };

  main = async () => {
    this.init();
    const { id, status } = await this.fetchStatusAndId();

    const request = [
      { reference: "usdc", methodName: "usdc()", methodParameters: [] },
      { reference: "round", methodName: "round()", methodParameters: [] },
      {
        reference: "startTime",
        methodName: "startTime()",
        methodParameters: [],
      },
      {
        reference: "isRoundActive",
        methodName: "isRoundActive()",
        methodParameters: [],
      },
      {
        reference: "bracket",
        methodName: "getBracket(uint256)",
        methodParameters: [id],
      },
      {
        reference: "baseTokens",
        methodName: "getTokens(uint256)",
        methodParameters: [0],
      },
      {
        reference: "tokens",
        methodName: "getTokens(uint256)",
        methodParameters: [id],
      },
      {
        reference: "winningToken",
        methodName: "getWinningToken(uint256)",
        methodParameters: [id],
      },
      {
        reference: "reward",
        methodName: "getReward(uint256)",
        methodParameters: [id],
      },
      {
        reference: "pendingFees",
        methodName: "pendingFees()",
        methodParameters: [],
      },
      {
        reference: "pendingRewards",
        methodName: "pendingRewards()",
        methodParameters: [],
      },
    ];

    const { results } = await this.multicall.call([
      {
        reference: "manager",
        contractAddress: MANAGER,
        abi: MANAGER_ABI,
        calls: request,
      },
    ]);

    const { callsReturnContext } = results["manager"];
    const {
      baseTokens,
      tokens,
      bracket,
      isRoundActive,
      pendingFees,
      pendingRewards,
      reward,
      round,
      startTime,
      usdc,
      winningToken,
    } = parseResults<ManagerDataResults>(callsReturnContext);

    const manager: ManagerData = {
      id,
      status,
      baseTokens,
      bracket,
      isRoundActive,
      pendingFees,
      pendingRewards,
      reward,
      round,
      startTime: Number(startTime) * 1000,
      winningToken,
    };

    if (tokens.some((token: any) => token === INVALID_TOKEN_ADDRESS)) {
      manager.tokens = await this.fetchTokens(baseTokens, usdc);
      manager.usdc = await this.fetchToken(usdc, null, false);
    } else {
      manager.tokens = await this.fetchTokens(tokens, usdc);
      manager.usdc = await this.fetchToken(usdc, null, false);
    }
    manager.usdc.price = "1.00";

    const factoryRequest = [
      {
        reference: "fee",
        methodName: "fee()",
        methodParameters: [],
      },
    ];

    const factoryResult = await this.multicall.call([
      {
        reference: "factory",
        contractAddress: FACTORY,
        abi: FACTORY_ABI,
        calls: factoryRequest,
      },
    ]);

    const { fee } = parseResults<{ fee: string }>(
      factoryResult.results["factory"].callsReturnContext
    );
    manager.fee = Number(fee) / 1000;
    manager.rewards = await this.fetchRewards(manager.id);

    return manager;
  };

  fetchTokens = async (
    tokens: string[],
    usdc: string | any,
    needSpotPrice = true
  ): Promise<Token[]> => {
    const calls = tokens.map((token) => {
      return {
        reference: token,
        contractAddress: token,
        abi: erc20ABI,
        calls: [
          { reference: "name", methodName: "name()", methodParameters: [] },
          { reference: "symbol", methodName: "symbol()", methodParameters: [] },
          {
            reference: "decimals",
            methodName: "decimals()",
            methodParameters: [],
          },
        ],
      };
    });

    const { results } = await this.multicall.call(calls);

    const formattedTokens = tokens.map((token) => {
      const obj = parseResults<any>(results[token].callsReturnContext);
      return {
        ...obj,
        address: token,
      };
    });

    const promises = [];
    if (needSpotPrice) {
      promises.push(this.fetchTokenPrices(formattedTokens, usdc));
    }
    promises.push(this.fetchTokenAmounts(formattedTokens));
    promises.push(this.fetchTokenAllowances(formattedTokens));

    await Promise.all(promises);

    return formattedTokens.map((token) => {
      const t = new Token(token as any);
      return t.getAsset();
    });
  };

  fetchToken = async (
    token: string,
    usdc: string | any,
    needSpotPrice: boolean
  ): Promise<Token> => {
    const tokens = await this.fetchTokens([token], usdc, needSpotPrice);
    return tokens[0];
  };

  fetchTokenPrices = async (tokens: any[], usdc: string) => {
    if (tokens.some((token: any) => token.address === INVALID_TOKEN_ADDRESS)) {
      return;
    }
    const tokenPrices = async () => {
      const calls = tokens.map((token) => {
        return {
          reference: token.address,
          contractAddress: MANAGER,
          abi: MANAGER_ABI,
          calls: [
            {
              reference: "price",
              methodName: "getSpotPrice(address)",
              methodParameters: [token.address],
            },
            {
              reference: "liquidityPool",
              methodName: "getSpotPriceAndPair(address)",
              methodParameters: [token.address],
            },
          ],
        };
      });

      const { results } = await this.multicall.call(calls);

      tokens.map((token) => {
        if (token.address === INVALID_TOKEN_ADDRESS) return;
        const obj = parseResults<any>(
          results[token.address].callsReturnContext
        );
        token.liquidityPoolAddress = obj.liquidityPool[1];
        token.price = formatUnits(obj.price.toString(), 18);
      });
    };

    const tokenLiquidity = async () => {
      const calls = tokens.map((token) => {
        return {
          reference: token.address,
          contractAddress: usdc,
          abi: erc20ABI,
          calls: [
            {
              reference: "liquidityPool",
              methodName: "balanceOf(address)",
              methodParameters: [token.liquidityPoolAddress],
            },
          ],
        };
      });

      const { results } = await this.multicall.call(calls);

      tokens.map((token) => {
        const obj = parseResults<{ liquidityPool: string }>(
          results[token.address].callsReturnContext
        );
        token.liquidityPool = formatUnits(obj.liquidityPool, 18);
      });
    };

    await tokenPrices();
    await tokenLiquidity();
  };

  fetchTokenAmounts = async (tokens: any[]) => {
    if (!this.userAddress) {
      for (const token of tokens) {
        token.amount = "0.00";
      }
      return;
    }

    const calls = tokens.map((token) => {
      return {
        reference: token.address,
        contractAddress: token.address,
        abi: erc20ABI,
        calls: [
          {
            reference: "balanceOf",
            methodName: "balanceOf(address)",
            methodParameters: [this.userAddress],
          },
        ],
      };
    });

    const { results } = await this.multicall.call(calls);

    tokens.map((token) => {
      if (token.address === INVALID_TOKEN_ADDRESS) return;
      const obj = parseResults<{ balanceOf: string }>(
        results[token.address].callsReturnContext
      );
      token.amount = formatUnits(obj.balanceOf.toString(), token.decimals);
    });
  };

  fetchTokenAllowances = async (tokens: any[]) => {
    if (!this.userAddress) {
      for (const token of tokens) {
        token.allowance = "0.00";
        token.approved = false;
        token.approvedManager = false;
        token.allowanceManager = "0.00";
        token.managerAddress = MANAGER;
        token.routerAddress = ROUTER;
      }
      return;
    }

    const calls = tokens.map((token) => {
      return {
        reference: token.address,
        contractAddress: token.address,
        abi: erc20ABI,
        calls: [
          {
            reference: "allowance",
            methodName: "allowance(address,address)",
            methodParameters: [this.userAddress, ROUTER],
          },
          {
            reference: "allowanceManager",
            methodName: "allowance(address,address)",
            methodParameters: [this.userAddress, MANAGER],
          },
        ],
      };
    });

    const { results } = await this.multicall.call(calls);

    tokens.map((token) => {
      if (token.address === INVALID_TOKEN_ADDRESS) return;
      const obj = parseResults<any>(results[token.address].callsReturnContext);
      token.routerAddress = ROUTER;
      token.managerAddress = MANAGER;
      token.allowance = formatUnits(obj.allowance, token.decimals);
      token.approved = !!+token.allowance;
      token.allowanceManager = formatUnits(
        obj.allowanceManager,
        token.decimals
      );
      token.approvedManager = !!+token.allowanceManager;
      token.needMoreApprove = +token.allowance < +token.amount;
    });
  };

  fetchRewards = async (currentTournamentId: number) => {
    const tournamentIds = Array.from(
      { length: currentTournamentId },
      (_, i) => i
    );

    if (!this.userAddress) return Promise.resolve([]);

    const promises = tournamentIds.map((tournamentId) => {
      return this.fetchRewardsByTournamentId(tournamentId);
    });

    const arr = (await Promise.all(promises)) as any[];

    return arr.sort((a, b) => {
      if (a.canClaim === true && b.canClaim === false) {
        return -1;
      } else if (a.canClaim === false && b.canClaim === true) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  fetchRewardsByTournamentId = async (tournamentId: number) => {
    const request = [
      {
        reference: "reward",
        methodName: "getReward(uint256)",
        methodParameters: [tournamentId],
      },
      {
        reference: "winningToken",
        methodName: "getWinningToken(uint256)",
        methodParameters: [tournamentId],
      },
    ];

    const { results } = await this.multicall.call([
      {
        reference: "rewards",
        contractAddress: MANAGER,
        abi: MANAGER_ABI,
        calls: request,
      },
    ]);

    const data = parseResults<{ reward: string; winningToken: string }>(
      results["rewards"].callsReturnContext
    );
    const rewards = +data.reward;
    const winningToken = data.winningToken;

    const token = await this.fetchToken(winningToken, null, false);
    if (!token) return null;

    const userBalance = await token.balanceOf(this.userAddress);
    const userReward = Number(rewards) * Number(userBalance);

    // userReward / 1e18
    const reward = String(userReward / 10 ** 18);
    token.amount = userBalance;

    const approved = Number(token.allowanceManager) >= Number(token.amount);
    const canClaim = parseFloat(userBalance) > 0;

    return { tournamentId, token, reward, canClaim, approved };
  };
}
