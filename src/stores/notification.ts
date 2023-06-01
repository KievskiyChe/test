import { v4 as uuidv4 } from "uuid";

const DEFAULT_TIMEOUT = 5000;

export const useNotificationStore = defineStore("notification-module", () => {
  const notifications = ref<INotification[]>([]);

  const pushNotification = (notification: INotification) => {
    const id = uuidv4();
    notifications.value.push({ ...notification, id, closeTimeout: DEFAULT_TIMEOUT });
    return id;
  };

  const removeNotification = (notification: INotification) => {
    notifications.value = notifications.value.filter(
      (n) => n.id !== notification.id
    );
  };

  const removeNotificationById = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  };

  const checkIfExistNotification = (status: INotificationStatus) => {
    return notifications.value.some((n) => n.status === status);
  };

  const removeAllNotifications = () => {
    notifications.value = [];
  };

  return {
    notifications,
    pushNotification,
    removeNotification,
    removeNotificationById,
    checkIfExistNotification,
    removeAllNotifications,
  };
});
