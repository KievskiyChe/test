import { BigNumber, ethers } from "ethers";
import type { Globals } from "./interfaces";

export const setGlobals = ({
  userAddress,
  provider,
  signer,
}: Globals): void => {
  window.__PROVIDER__ = provider;
  window.__SIGNER__ = signer;
  window.__USER_ADDRESS__ = userAddress ?? "";
};

export const updateGlobalsAddress = (address: string): void => {
  window.__USER_ADDRESS__ = address;
};

export const typewatch = (() => {
  let timer = null as any;
  return function (callback: CallableFunction, ms: number) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getImage = (image: string) => {
  const name = image.replace(" ", "_").toLowerCase();
  return new URL(`/src/assets/img/${name}`, import.meta.url).href;
};

export const getBackgroundImage = (image: string) => {
  return `background-image: url(${getImage(image)})`;
};

export const cutString = (string: string, length: number) => {
  return string.substring(0, length);
};

export const cutStringWithDots = (string: string, length: number) => {
  return string.length > length
    ? `${string.substring(0, length)}..` // cut string and add dots
    : string;
};

export const parseString = (string: string, length: number) => {
  return parseFloat(string).toFixed(length);
};

export const parseUnits = (amount: string, decimals: number) => {
  return ethers.utils.parseUnits(amount, decimals).toString();
};

export const checkNetwork = (chainId: number) => {
  const chain = import.meta.env.VITE_APP_CHAIN;
  const { showPopup } = usePopupsStore();

  if (chainId !== +chain) {
    showPopup(Popup.INVALID_NETWORK);
    return false;
  }
  return true;
};

export const calculateUSD = (
  amount: number | string | undefined,
  price: number | string | undefined
) => {
  if (!amount || !price) return 0;

  const _amount = parseFloat(amount.toString());
  const _price = parseFloat(price.toString());
  const amountUSD = _amount * _price;

  return parseFloat(amountUSD.toString()).toFixed(4);
};

export const calculateSlippage = (
  amount: string, // amountOut
  slippage: string | number, // user slippage input
  decimals: number // token decimals
) => {
  const _amount = BigNumber.from(parseUnits(parseFloat(amount).toFixed(2), decimals))
  const _slippage = 1 - Number(slippage) / 100
  const result = Number(_amount) * Number(_slippage)
  return Math.floor(result).toLocaleString('fullwide', {useGrouping:false})
};

export const switchNetwork = (chainId: number) => {
  const chain = ethers.utils.hexValue(chainId);

  window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: chain }],
  });
};

export const addTokenToMetaMask = async (symbol: string): Promise<void> => {
  const tokens: any = {
    sith: "0x73C1ED004281015361875F343e6C3e14Fc3BC8EF",
    jedi: "0xA54E19A4256c36337041D22e8aAEB4C3beA0F4FB",
    mando: "0xE901DF50AEd500137B737B23c178d31B904C3454",
    hutt: "0xfa22Fe578059d80c5D65916FeA258D109E59874f",
    tusk: "0x876Af204795099BDBE8899d23a361ea60749df22",
    tech: "0xDDeCa0078ce2D1e9d3D55c13D30FA56FC1166543",
    nsis: "0xe18aDA84281d31f52Ef3CEbF12c6ec242249719a",
    deaw: "0x9Fae8e060A51e2f96Ba34658627E7dC29844F347",
  };

  const options = {
    address: tokens[symbol.toLowerCase()],
    symbol: symbol.toUpperCase(),
    decimals: 6,
    image: `${getImage(`tokens/${symbol.toLowerCase()}.png`)}`,
  };

  try {
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: { type: "ERC20", options },
    });
  } catch (error) {
    console.log(error);
  }
};

export const nFormatter = (num: number): string => {
  const abbreviations = ["", "K", "M", "B", "T", "Qa"];
  let abbreviatedNum = num;
  let abbreviationIndex = 0;

  while (abbreviatedNum >= 1000) {
    abbreviatedNum /= 1000;
    abbreviationIndex++;
  }

  if (abbreviationIndex > 0 && abbreviationIndex < abbreviations.length) {
    return `${abbreviatedNum.toFixed(2)}${abbreviations[abbreviationIndex]}`;
  } else {
    return parseFloat(num.toString()).toFixed(2);
  }
};

export default nFormatter;
