import { combineReducers } from "redux";
import userReducer from './UserReducer';
import saleOrAuctionReducer from './SaleOrAuctionReducer';
import CurrentListtingIDReducer from "./CurrentListtingIDReducer";
import FavoriteNftReducer from './FavoriteNftReducer';

export default combineReducers({
  user: userReducer,
  saleOrAuction: saleOrAuctionReducer,
  currentInventoryID: CurrentListtingIDReducer,
  listFavoriteNft: FavoriteNftReducer,
});