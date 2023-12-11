// Your reducer file
import { SET_TOKEN } from "@/constants/constants";

const initialState = {
  token: null,
  error: null,
};

export default (state ={}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      
      return {
        ...state,
        token: action.payload,
      };
    // other cases...
    default: 
      return state;
     
  }
};
