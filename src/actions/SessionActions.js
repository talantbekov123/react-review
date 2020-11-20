import { checkCredentials } from '../helpers/session'

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
/*
  Для dispatch в thunk лучше создать отдельный actionCreators.
  
  const loginSuccess = (userName) => ({
    type: LOG_IN_SUCCESS,
    payload: userName
  });

  const loginError = (errMessage) => ({
    type: LOG_IN_FAILURE,
    payload: errMessage
  });

  dispatch(loginSuccess(params.userName))
  dispatch(loginError('Имя пользователя или пароль некорректны'))
*/
export function logIn(params, next) {
  return dispatch => {
    if (checkCredentials(params)) {
        dispatch({
          type: LOG_IN,
          payload: {
            name: params.userName,
          },
        });
      next()
    } else {
      dispatch({
        type: LOG_IN_FAILURE,
        payload: {
          errorMessage: 'Имя пользователя или пароль некорректны',
        },
        error: true,
      })
    }
  }
}
