
import { SET_TOKEN, SET_TOKEN_ERROR } from '@/constants/constants';
export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: token,
});

  