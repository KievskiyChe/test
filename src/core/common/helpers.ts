import { ethers } from "ethers";

export const formatUnits = (value: string, decimals: number) => {
  return ethers.utils.formatUnits(value, decimals);
};

export const INVALID_TOKEN_ADDRESS =
  "0x0000000000000000000000000000000000000000";

export const parseResults = <T>(results: any[]): T => {
  let obj = {} as any;
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const key = result.reference;
    const valueData = result.returnValues as any;
    obj[key] = parseValue(valueData);
  }
  return obj;
};

const parseValue = (valueData: any) => {
  const value = valueData.length === 1 ? valueData[0] : valueData;
  if (value.type && value.type === 'BigNumber') {
    return ethers.BigNumber.from(value.hex).toString();
  } else {
    return value;
  }
}
