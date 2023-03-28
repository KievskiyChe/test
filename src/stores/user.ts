import type {
  ConnectorResponse,
  INetwork,
  IWallet,
} from "vue-dapp-connector/dist/types";

export interface User {
  wallet: IWallet;
  network: INetwork;
}

export const useUserStore = defineStore("user-module", () => {
  const user = ref<User | null>();

  const setUser = (data: ConnectorResponse | null) => {
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
    setUser,
    getShortAddress,
  };
});
