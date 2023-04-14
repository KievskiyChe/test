import {
  Multicall,
  type ContractCallResults,
  type ContractCallContext,
} from "ethereum-multicall";
import { erc20ABI } from "vagmi";
import MANAGER_ABI from "../v1/abis/Manager.json";
import ROUTER_ABI from "../v1/abis/Router.json";
import FACTORY_ABI from "../v1/abis/Factory.json";
import { ethers } from "ethers";
import { Token } from "./models/Token";

const MANAGER = "0xcec89431A41Aaf5e2A3c4B53f5DBDb7E105d2b88";
const ROUTER = "0xc717A38C0E5AC1ef450FFa4935Dc2c411D8E42aC";
const FACTORY = "0xDF2ec38e2128E8c8C403F9603237EdCFF65CC35e";

const formatUnits = (value: string, decimals: number) => {
  return ethers.utils.formatUnits(value, decimals);
};

const fetchTokens = async (
  tokens: string[],
  usdc: string | any,
  provider: any,
  needSpotPrice = true
) => {
  const multicall = new Multicall({
    ethersProvider: provider,
    tryAggregate: true,
  });

  const tokenCalls = tokens.map((token) => {
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

  const tokenResults = await multicall.call(tokenCalls);

  const formattedTokens = tokens.map((token) => {
    const tokenResult = tokenResults.results[token];
    const name = tokenResult.callsReturnContext[0].returnValues[0];
    const symbol = tokenResult.callsReturnContext[1].returnValues[0];
    const decimals = tokenResult.callsReturnContext[2].returnValues[0];

    return {
      address: token,
      name,
      symbol,
      decimals,
    };
  });

  if (needSpotPrice) {
    await fetchTokenPrices(formattedTokens, usdc, provider);
  }
  await fetchTokenAmounts(formattedTokens, provider);
  await fetchTokenAllowances(formattedTokens, provider);

  return formattedTokens.map((token) => {
    const t = new Token(token as any);
    return t.get();
  });
};

const fetchToken = async (
  token: string,
  usdc: string | any,
  provider: any,
  needSpotPrice: boolean
) => {
  const tokens = await fetchTokens([token], usdc, provider, needSpotPrice);
  return tokens[0];
};

const fetchTokenPrices = async (tokens: any[], usdc: string, provider: any) => {
  const multicall = new Multicall({
    ethersProvider: provider,
    tryAggregate: true,
  });

  const tokenPrices = async () => {
    const tokenCalls = tokens.map((token) => {
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

    const tokenResults = await multicall.call(tokenCalls);

    tokens.map((token) => {
      const priceResult =
        tokenResults.results[token.address].callsReturnContext[0]
          .returnValues[0].hex;
      const liquidityPoolResult =
        tokenResults.results[token.address].callsReturnContext[1]
          .returnValues[1];
      token.liquidityPoolAddress = liquidityPoolResult;
      token.price = formatUnits(priceResult, token.decimals);
    });
  };

  const tokenLiquidity = async () => {
    const liquidityPoolCalls = tokens.map((token) => {
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

    const liquidityPoolResults = await multicall.call(liquidityPoolCalls);

    tokens.map((token) => {
      const liquidityPoolResult =
        liquidityPoolResults.results[token.address].callsReturnContext[0]
          .returnValues[0].hex;
      token.liquidityPool = formatUnits(liquidityPoolResult, 6);
    });
  };

  await tokenPrices();
  await tokenLiquidity();
};

const fetchTokenAmounts = async (tokens: any[], provider: any) => {
  const multicall = new Multicall({
    ethersProvider: provider,
    tryAggregate: true,
  });

  const userAddress = window.__USER_ADDRESS__;

  if (!userAddress) {
    tokens.map((token) => {
      token.amount = "0.00";
    });
    return;
  }

  const tokenCalls = tokens.map((token) => {
    return {
      reference: token.address,
      contractAddress: token.address,
      abi: erc20ABI,
      calls: [
        {
          reference: "balanceOf",
          methodName: "balanceOf(address)",
          methodParameters: [userAddress],
        },
      ],
    };
  });

  const tokenResults = await multicall.call(tokenCalls);

  tokens.map((token) => {
    const tokenResult =
      tokenResults.results[token.address].callsReturnContext[0].returnValues[0]
        .hex;
    token.amount = formatUnits(tokenResult, token.decimals);
  });
};

const fetchTokenAllowances = async (tokens: any[], provider: any) => {
  const multicall = new Multicall({
    ethersProvider: provider,
    tryAggregate: true,
  });

  const userAddress = window.__USER_ADDRESS__;

  if (!userAddress) {
    tokens.map((token) => {
      token.allowance = "0.00";
      token.approved = false;
      token.approvedManager = false;
      token.allowanceManager = "0.00";
      token.managerAddress = MANAGER;
      token.routerAddress = ROUTER;
    });
    return;
  }

  const tokenCalls = tokens.map((token) => {
    return {
      reference: token.address,
      contractAddress: token.address,
      abi: erc20ABI,
      calls: [
        {
          reference: "allowance",
          methodName: "allowance(address,address)",
          methodParameters: [userAddress, ROUTER],
        },
        {
          reference: "allowance",
          methodName: "allowance(address,address)",
          methodParameters: [userAddress, MANAGER],
        },
      ],
    };
  });

  const tokenResults = await multicall.call(tokenCalls);

  tokens.map((token) => {
    const tokenResultRouter =
      tokenResults.results[token.address].callsReturnContext[0].returnValues[0]
        .hex;
    const tokenResultManager =
      tokenResults.results[token.address].callsReturnContext[1].returnValues[0]
        .hex;
    token.allowance = formatUnits(tokenResultRouter, token.decimals);
    token.approved = !!+token.allowance;
    token.allowanceManager = formatUnits(tokenResultManager, token.decimals);
    token.approvedManager = !!+token.allowanceManager;
    token.managerAddress = MANAGER;
    token.routerAddress = ROUTER;
  });
};

const fetchRewards = async (currentTournamentId: number, provider: any) => {
  const userAddress = window.__USER_ADDRESS__;
  const tournamentIds = Array.from(
    { length: currentTournamentId },
    (_, i) => i
  );

  if (!userAddress) return Promise.resolve([]);

  const promises = tournamentIds.map(async (tournamentId) => {
    return await fetchRewardsByTournamentId(
      tournamentId,
      userAddress,
      provider
    );
  });

  const arr = (await Promise.all(promises)) as any[];

  const rewards = arr.sort((a, b) => {
    if (a.canClaim === true && b.canClaim === false) {
      return -1;
    } else if (a.canClaim === false && b.canClaim === true) {
      return 1;
    } else {
      return 0;
    }
  });

  return rewards;
};

const fetchRewardsByTournamentId = async (
  tournamentId: number,
  userAddress: string,
  provider: any
) => {
  const multicall = new Multicall({
    ethersProvider: provider,
    tryAggregate: true,
  });

  const rewardCalls = [
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

  const rewardResults = await multicall.call([
    {
      reference: "rewards",
      contractAddress: MANAGER,
      abi: MANAGER_ABI,
      calls: rewardCalls,
    },
  ]);

  const rewards =
    +rewardResults.results["rewards"].callsReturnContext[0].returnValues[0].hex;
  const winningToken =
    rewardResults.results["rewards"].callsReturnContext[1].returnValues[0];

  const token = await fetchToken(winningToken, null, provider, false);
  if (!token) return null;

  const userBalance = await token.balanceOf(userAddress);
  const userReward = Number(rewards) * Number(userBalance);

  // userReward / 1e6
  const reward = String(userReward / 10 ** token.decimals);
  token.amount = userBalance;

  const approved = token.approvedManager;
  const canClaim = parseFloat(userBalance) > 0;

  return { tournamentId, token, reward, canClaim, approved };
};

export default async function main(provider: any) {
  const multicall = new Multicall({
    ethersProvider: provider,
    tryAggregate: true,
  });

  const pre = [{ reference: "id", methodName: "id()", methodParameters: [] }];

  const preResult = await multicall.call([
    {
      reference: "pre",
      contractAddress: MANAGER,
      abi: MANAGER_ABI,
      calls: pre,
    },
  ]);

  const tournamentId = Number(
    preResult.results["pre"].callsReturnContext[0].returnValues[0].hex
  );

  const managerCalls = [
    { reference: "usdc", methodName: "usdc()", methodParameters: [] },
    { reference: "round", methodName: "round()", methodParameters: [] },
    { reference: "startTime", methodName: "startTime()", methodParameters: [] },
    {
      reference: "status",
      methodName: "isTournamentActive()",
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
      methodParameters: [tournamentId],
    },
    {
      reference: "baseTokens",
      methodName: "getTokens(uint256)",
      methodParameters: [0],
    },
    {
      reference: "tokens",
      methodName: "getTokens(uint256)",
      methodParameters: [tournamentId],
    },
    {
      reference: "winningToken",
      methodName: "getWinningToken(uint256)",
      methodParameters: [tournamentId],
    },
    {
      reference: "reward",
      methodName: "getReward(uint256)",
      methodParameters: [tournamentId],
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

  const managerResult = await multicall.call([
    {
      reference: "manager",
      contractAddress: MANAGER,
      abi: MANAGER_ABI,
      calls: managerCalls,
    },
  ]);

  const manager = {} as any;
  manager.id = tournamentId;
  for (const call in managerCalls) {
    const key = managerCalls[call].reference;
    const valueData = managerResult.results["manager"].callsReturnContext[call]
      .returnValues as any;
    const value = valueData.length === 1 ? valueData[0] : valueData;

    let data: any = value;

    if (key === "startTime") {
      data = Number(value.hex) * 1000;
    }

    if (key === "pendingFees" || key === "pendingRewards") {
      data = formatUnits(value, 6);
    }

    if (key === "reward") {
      data = formatUnits(value, 18);
    }

    manager[key] = data;
  }

  if (
    manager.tokens.some(
      (token: any) => token === "0x0000000000000000000000000000000000000000"
    )
  ) {
    manager.tokens = await fetchTokens(
      manager.baseTokens,
      manager.usdc,
      provider
    );
    manager.usdc = await fetchToken(manager.usdc, null, provider, false);
  } else {
    manager.tokens = await fetchTokens(manager.tokens, manager.usdc, provider);
    manager.usdc = await fetchToken(manager.usdc, null, provider, false);
  }
  manager.usdc.price = "1.00";

  const factoryCall = [
    {
      reference: "factory",
      methodName: "fee()",
      methodParameters: [],
    },
  ];

  const factoryResult = await multicall.call([
    {
      reference: "factory",
      contractAddress: FACTORY,
      abi: FACTORY_ABI,
      calls: factoryCall,
    },
  ]);

  manager.fee =
    Number(
      factoryResult.results["factory"].callsReturnContext[0].returnValues[0].hex
    ) / 1000;

  manager.rewards = await fetchRewards(manager.id, provider);
  console.log(manager);

  return manager;
}

export const preFetch = async (provider: any) => {
  const multicall = new Multicall({
    ethersProvider: provider,
    tryAggregate: true,
  });

  const pre = [
    { reference: "status", methodName: "isTournamentActive()", methodParameters: [] },
  ];

  const preResult = await multicall.call([
    {
      reference: "pre",
      contractAddress: MANAGER,
      abi: MANAGER_ABI,
      calls: pre,
    },
  ]);

  const status = preResult.results["pre"].callsReturnContext[0].returnValues[0] as boolean;

  return status;
};
