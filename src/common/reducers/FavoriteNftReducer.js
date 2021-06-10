import { ActionType } from "../utils/actions-type";

const initialState = {
  listFavoriteNft: [],
}

function reducer (state= initialState, action){
  switch (action.type) {
    case ActionType.FAVOTITE_NFT_CALL_API_SERVER:{
      return Object.assign({}, {
        listFavoriteNft: action.listFavoriteNft || state.listFavoriteNft,
      });
    }
    case ActionType.FAVOTITE_NFT_FORCE_UPDATE:{
      return Object.assign({}, {
        listFavoriteNft: action.listFavoriteNft || state.listFavoriteNft,
      });
    }
  
    default:
      return state;
  }
}

export default reducer;