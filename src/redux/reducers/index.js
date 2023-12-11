import authReducer from './authReducer';
import basketReducer from './basketReducer';
import checkoutReducer from './checkoutReducer';
import filterReducer from './filterReducer';
import miscReducer from './miscReducer';

import profileReducer from './profileReducer';
import tokenReducer from './tokenReducer';
import userReducer from './userReducer';

const rootReducer = {

  basket: basketReducer,
  auth: authReducer,
  profile: profileReducer,
  filter: filterReducer,
  users: userReducer,
  checkout: checkoutReducer,
  app: miscReducer,
  token: tokenReducer
};
  export default rootReducer;