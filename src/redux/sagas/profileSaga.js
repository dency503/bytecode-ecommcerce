import { UPDATE_ADDRESS, UPDATE_PROFILE } from "@/constants/constants";
import { call, put } from "redux-saga/effects";

import { setLoading } from "../actions/miscActions";
import {
  updateProfileSuccess,
  updateAddressSuccess,
} from "../actions/profileActions";

import {
  modifyUser,
  modifyAddress,
  getUsername,
} from "../../services/authApiService";
import { toast } from "react-toastify";

function* profileSaga({ type, payload }) {
  switch (type) {
    case UPDATE_PROFILE: {
      try {
        yield put(setLoading(true));

        // Utiliza la función correcta para modificar el perfil
        yield call(modifyUser, payload.updates);

        // Usa la acción correcta para indicar que la actualización fue exitosa
        yield put(updateProfileSuccess(payload.updates));

        yield put(setLoading(false));
        toast.success("Éxito al actualizar el perfil");
      } catch (e) {
        console.error(e);
        yield put(setLoading(false));
        if (e.code === "auth/wrong-password") {
          console.error(
            "Contraseña incorrecta, fallo en la actualización del perfil :("
          );
        } else {
          toast.error(
            `:( Error al actualizar el perfil. ${e.message ? e.message : ""}`
          );
        }
      }
      break;
    }
    case UPDATE_ADDRESS: {
      try {
        yield put(setLoading(true));

        // Utiliza la función correcta para modificar la dirección
        yield call(modifyAddress, payload.updates);
        const user = yield call(getUsername);
        // Usa la acción correcta para indicar que la actualización fue exitosa
        yield put(updateAddressSuccess(user.direccion));

        yield put(setLoading(false));
       toast.success("Éxito al actualizar la dirección");
      } catch (e) {
        console.error(e);
        yield put(setLoading(false));
        if (e.code === "auth/wrong-password") {
          console.error(
            "Contraseña incorrecta, fallo en la actualización de la dirección :("
          );
        } else {
          toast.error(
            `:( Error al actualizar la dirección. ${e.message ? e.message : ""}`
          );
        }
      }
      break;
    }
    default: {
      throw new Error("Tipo de acción inesperado.");
    }
  }
}

export default profileSaga;
