export const usePopupsStore = defineStore("popups-module", () => {
  const popups = ref<Popup[]>([]);

  const showPopup = (popup: Popup) => {
    popups.value.push(popup);
  };

  const hidePopup = (popup: Popup) => {
    popups.value = popups.value.filter((p) => p !== popup);
  };

  const hideAllPopups = () => {
    popups.value = [];
  };

  const exists = (popup: Popup) => {
    return popups.value.includes(popup);
  };

  return {
    popups,
    showPopup,
    hidePopup,
    hideAllPopups,
    exists,
  };
});
