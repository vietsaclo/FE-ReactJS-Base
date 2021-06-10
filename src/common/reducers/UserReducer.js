import { ActionType } from '../utils/actions-type';

const initialState = {
  user: {
    isLogin: false,
    userName: 'anonymous',
    address: null,
    emailAddress: null,
    bio: null,
  },
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.USER_LOGIN: {
      return Object.assign({}, state, {
        user: {
          isLogin: true,
          userName: action.user.userName || state.user.userName,
          address: action.user.address,
        },
      });
    };

    case ActionType.USER_LOGOUT: {
      return Object.assign({}, state, {
        user: {
          isLogin: false,
          userName: state.user.userName,
          address: null,
        },
      });
    };

    case ActionType.USER_UPDATE: {
      return Object.assign({}, state, {
        user: {
          ...action.user,
          isLogin: true,
        },
      });
    };

    default:
      return state;
  }
}

export default reducer;