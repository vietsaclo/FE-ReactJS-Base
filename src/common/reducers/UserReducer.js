import { ActionType } from "../utils/actions-type";

const UserReducerInitialState = {}

const UserReducer = (state = UserReducerInitialState, action) => {
  switch (action.type) {
    case ActionType.USER_LOGIN:
      return state
    case ActionType.USER_LOGOUT:
      return state
    default:
      return state
  }
}

export default UserReducer;