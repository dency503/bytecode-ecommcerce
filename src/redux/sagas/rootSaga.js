import * as ACTION from "@/constants/constants";
import { takeLatest } from "redux-saga/effects";
import authSaga from "./authSaga";
import profileSaga from "./profileSaga";

function* rootSaga() {
  yield takeLatest(
    [
      ACTION.SIGNIN,
      ACTION.SIGNUP,
      ACTION.SIGNOUT,
      ACTION.SIGNIN_WITH_GOOGLE,
      ACTION.SIGNIN_WITH_FACEBOOK,
      ACTION.SIGNIN_WITH_GITHUB,
      ACTION.ON_AUTHSTATE_CHANGED,
      ACTION.ON_AUTHSTATE_SUCCESS,
      ACTION.ON_AUTHSTATE_FAIL,
      ACTION.SET_AUTH_PERSISTENCE,
      ACTION.RESET_PASSWORD,
    ],
    authSaga
  );

  yield takeLatest([ACTION.UPDATE_ADDRESS, ACTION.UPDATE_PROFILE], profileSaga);
}

export default rootSaga;
