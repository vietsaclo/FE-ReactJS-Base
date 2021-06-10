import { ActionType } from "../utils/actions-type";

const initialState = {
  isSale: true,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.SWITCH_SALE_AUCTION: {
      return Object.assign({}, state, {
        isSale: action.isSale,
      });
    }

    default:
      return state;
  }
}

export default reducer;