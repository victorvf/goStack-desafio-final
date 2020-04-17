import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { signInSuccess, signInFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
    try {
        const { id } = payload;

        const response = yield call(api.get, `/deliveryman/${id}`);

        const deliveryman = response.data;

        yield put(signInSuccess(deliveryman));
    } catch (err) {
        Alert.alert('authentication fails, check your data');

        yield put(signInFailure());
    }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
