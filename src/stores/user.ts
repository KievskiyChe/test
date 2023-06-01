export const useUserStore = defineStore("user-module", () => {
  const usdcBalance = ref<string>("0.00");

  const setUsdcBalance = (data: string) => {
    usdcBalance.value = data;
  };

  return {
    usdcBalance,
    setUsdcBalance,
  };
});
