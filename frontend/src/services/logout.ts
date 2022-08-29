import { historyPush } from './push';

export const cleanTokens = () => {
  localStorage.removeItem('accessToken');
};

export const forceLogout = () => {
  cleanTokens();
  historyPush('login');
};
