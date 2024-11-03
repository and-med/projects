import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* initIngredientsSaga(action) {
    try {
        const response = {data: {salad: 2, bacon: 1, cheese: 1, meat: 1}};
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}