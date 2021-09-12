import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from './actions/getCurrentUser.action';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from './actions/login.action';
import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from './actions/register.action';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErors: null,
  isLoading: false,
};

const authReducer = createReducer(
  initialState,
  on(
    registerAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErors: null,
    })
  ),
  on(
    registerSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    registerFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErors: action.errors,
    })
  ),
  on(
    loginAction,
    (state): AuthStateInterface => ({
      ...state,
      isSubmitting: true,
      validationErors: null,
    })
  ),
  on(
    loginSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    loginFailureAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErors: action.errors,
    })
  ),
  on(
    getCurrentUserAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCurrentUserSuccessAction,
    (state, action): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    })
  ),
  on(
    getCurrentUserFailureAction,
    (state): AuthStateInterface => ({
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    })
  )
);

export function reducer(state: AuthStateInterface, action: Action) {
  return authReducer(state, action);
}
