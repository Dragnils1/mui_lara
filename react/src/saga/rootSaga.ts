import { all } from 'redux-saga/effects'
import { helloSaga } from "./hello";

export default function* rootSaga() {
    yield all([
        helloSaga(),
    ])
}