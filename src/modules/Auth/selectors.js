const getIsAuthorized = state => state.auth.isAuthorized;

const getLoginErrorReducer = state => state.auth.loginErrorReducer;

const getRegistationErrorReducer = state => state.auth.registationErrorReducer;

export { getIsAuthorized, getLoginErrorReducer, getRegistationErrorReducer };
