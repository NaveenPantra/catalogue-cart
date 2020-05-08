import {combineReducers} from "redux";
import cartListItemsReducer from "./CartItemsList/cartItemsList.reducer";
import itemsListReducer from "./ItemsList/itemsList.reducer";

export default combineReducers({
    itemsList: itemsListReducer,
    cartListItems:cartListItemsReducer,
});
