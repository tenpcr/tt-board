/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeLatest, put, call } from "redux-saga/effects";
import Router from "next/router";
import { loginSuccess, logout, setAuth } from "../slices/authSlice";

function* loginSuccessSaga() {
  try {
    yield call([localStorage, "setItem"], "authentication", "true");
    yield put(setAuth(true));
  } catch (error: any) {
    console.log(error);
  }
}

function* logoutSaga() {
  try {
    yield call([localStorage, "removeItem"], "authentication");
    yield put(setAuth(false));
    yield call(Router.push, "/");
  } catch (error: any) {
    console.log(error);
  }
}

export function* watchLogout() {
  yield takeLatest(logout.type, logoutSaga);
}

export function* watchLogInSuccess() {
  yield takeLatest(loginSuccess.type, loginSuccessSaga);
}
