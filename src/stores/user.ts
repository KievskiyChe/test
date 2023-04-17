// import type {
//   ConnectorResponse,
//   INetwork,
//   IWallet,
// } from "vue-dapp-connector/dist/types";

// export interface User {
//   wallet: IWallet;
//   network: INetwork;
// }

export const useUserStore = defineStore("user-module", () => {
  const user = ref<any | null>();
  const multicall = ref<boolean>(localStorage.getItem("multicall") === "true" ? true : false);
  const usdcBalance = ref<string>("0.00");

  const setMulticall = (data: boolean) => {
    multicall.value = data;
    localStorage.setItem("multicall", data.toString());
  };

  const setUser = (data: any | null) => {
    const { pushNotification } = useNotificationStore();
    if (!data) {
      pushNotification({
        status: INotificationStatus.PENDING,
        title: "Warning",
        description: "Disconnected from wallet",
        closeTimeout: 10,
      });
    }
    user.value = data;
  };

  const setUsdcBalance = (data: string) => {
    usdcBalance.value = data;
  };

  const getShortAddress = () => {
    if (!user.value) return "";
    return (
      user.value.wallet.address.slice(0, 6) +
      "..." +
      user.value.wallet.address.slice(-4)
    );
  };

  return {
    user,
    multicall,
    usdcBalance,
    setMulticall,
    setUser,
    setUsdcBalance,
    getShortAddress,
  };
});
