import { all } from "redux-saga/effects";
import { watchLogout, watchLogInSuccess } from "./authSaga";

export default function* rootSaga() {
  yield all([watchLogout(), watchLogInSuccess()]);
}
