const getIsAuthorized = state => state.auth.isAuthorized;

const getLoginError = state => state.auth.loginError;

const getRegistationError = state => state.auth.registationError;

export { getIsAuthorized, getLoginError, getRegistationError };
