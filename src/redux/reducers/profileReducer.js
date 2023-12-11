import {
  CLEAR_PROFILE,
  SET_PROFILE,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
} from "@/constants/constants";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload;
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        direccion: {
          ...state.direccion,
          ...action.payload,
        },
      };

    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
};
