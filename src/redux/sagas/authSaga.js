import {
  ON_AUTHSTATE_FAIL,
  ON_AUTHSTATE_SUCCESS,
  RESET_PASSWORD,
  SET_AUTH_PERSISTENCE,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
} from "@/constants/constants";
//import { SIGNIN as ROUTE_SIGNIN } from '@/constants/routes';
//import defaultAvatar from '@/images/defaultAvatar.jpg';
//import defaultBanner from '@/images/defaultBanner.jpg';
import { call, put } from "redux-saga/effects";
import { signInSuccess, signOutSuccess } from "@/redux/actions/authActions";

import { clearBasket, setBasketItems } from "@/redux/actions/basketActions";

import { setAuthenticating, setAuthStatus } from "@/redux/actions/miscActions";
import { clearProfile, setProfile } from "@/redux/actions/profileActions";

import {
  getUsername,
  authApiService,
  getCart,
} from "../../services/authApiService";
import jwtDecode from "jwt-decode";

function* handleError(e) {
  const obj = { success: false, type: "auth", isError: true };
  yield put(setAuthenticating(false));

  switch (e.code) {
    case "auth/network-request-failed":
      yield put(
        setAuthStatus({
          ...obj,
          message: "Network error has occured. Please try again.",
        })
      );
      break;
    case "auth/email-already-in-use":
      yield put(
        setAuthStatus({
          ...obj,
          message: "Email is already in use. Please use another email",
        })
      );
      break;
    case "auth/wrong-password":
      yield put(
        setAuthStatus({ ...obj, message: "Incorrect email or password" })
      );
      break;
    case "auth/user-not-found":
      yield put(
        setAuthStatus({ ...obj, message: "Incorrect email or password" })
      );
      break;
    case "auth/reset-password-error":
      yield put(
        setAuthStatus({
          ...obj,
          message:
            "Failed to send password reset email. Did you type your email correctly?",
        })
      );
      break;
    default:
      yield put(setAuthStatus({ ...obj, message: e.message }));
      break;
  }
}
function* initRequest() {
  yield put(setAuthenticating());
  yield put(setAuthStatus({}));
}

function* authSaga({ type, payload }) {
  switch (type) {
    case SIGNIN:
      try {
        yield initRequest();
        const token = yield call(
          authApiService.signIn,
          payload.email,
          payload.password
        );

        const decode = jwtDecode(token);

        const account = yield call(getUsername);

        const user = {
          clienteId: account.clienteId || " ",
          nombreCliente: account.nombreCliente || " ",
          apellidoCliente: account.apellidoCliente || " ",
          email: account.email || " ",
          telefono: account.telefono || " ",
          direccion: account.direccion || " ",
          fechaCreacion: account.fechaCreacion || " ",
          role: decode.role,
          token: token,
        };
        const cart = yield call(getCart);
        const formattedCart = cart.items.map((item) => ({
          productoId: item.producto.productoId,
          descripcionProducto: item.producto.descripcion,
          nombreProducto: item.producto.nombreProducto,
          precio: item.producto.precio,
          stock: item.producto.stock,
          imagenURl: item.producto.imagenURl,
          quantity: item.cantidad
        }));

        yield put(setBasketItems(formattedCart));
        yield put(setProfile(user));
        // yield put(setBasketItems(user.basket));
        yield put(
          signInSuccess({
            id: user.clienteId,
            role: user.role,
            provider: "email",
          })
        );

        yield put(
          setAuthStatus({
            success: true,
            type: "auth",
            isError: false,
            message: "Successfully signed in. Redirecting...",
          })
        );
        yield put(setAuthenticating(false));
      } catch (e) {
        yield handleError(e);
      }
      break;

    /* case SIGNUP:
      try {
        yield initRequest();

        const ref = yield call(firebase.createAccount, payload.email, payload.password);
        const fullname = payload.fullname.split(' ').map((name) => name[0].toUpperCase().concat(name.substring(1))).join(' ');
        const user = {
          fullname,
          avatar: defaultAvatar,
          banner: defaultBanner,
          email: payload.email,
          address: '',
          basket: [],
          mobile: { data: {} },
          role: 'USER',
          dateJoined: ref.user.metadata.creationTime || new Date().getTime()
        };

        yield call(firebase.addUser, ref.user.uid, user);
        yield put(setProfile(user));
        yield put(setAuthenticating(false));
      } catch (e) {
        yield handleError(e);
      }
      break;*/
    case SIGNOUT: {
      try {
        yield initRequest();

        yield put(clearProfile());
        yield put(clearBasket());

        yield put(signOutSuccess());
        yield put(setAuthenticating(false));
      } catch (e) {
        console.log(e);
      }
      break;
    }
    /* case RESET_PASSWORD: {
      try {
        yield initRequest();
        yield call(firebase.passwordReset, payload);
        yield put(setAuthStatus({
          success: true,
          type: 'reset',
          message: 'Password reset email has been sent to your provided email.'
        }));
        yield put(setAuthenticating(false));
      } catch (e) {
        handleError({ code: 'auth/reset-password-error' });
      }
      break;
    }*/

    case ON_AUTHSTATE_FAIL: {
      yield put(clearProfile());
      yield put(signOutSuccess());
      break;
    }
    case SET_AUTH_PERSISTENCE: {
      break;
    }
    default: {
      throw new Error("Unexpected Action Type.");
    }
  }
}

export default authSaga;
