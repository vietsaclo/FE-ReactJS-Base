import { ActionType } from "../utils/actions-type";

const initialState = {
  currentInventoryID: null,
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionType.SET_CURRENT_INVENTORY_ID: {
      return Object.assign({}, state, {
        currentInventoryID: action.currentInventoryID,
      });
    }

    default:
      return state;
  }
}

export default reducer;