import {ACTIONS} from "./cartItemsList.constants";
import {CART_ITEMS_LIST} from "../InitialState";
import {
    checkAndAddAppDataToLS,
    getAppDataFromLS,
    handleAddItem,
    handleRemoveItem
} from "./cartItemsList.helpers";
import {LOCAL_STORAGE_KEYS} from "../../utils/constants/storageKeys";

function cartListItemsReducer(state = CART_ITEMS_LIST, action) {
    const {type, payload} = action;
    let cartItemsList = Object.assign({}, state);
    switch (type) {
        case ACTIONS.ADD_ITEM:
            {
                const { ID, count } = payload;
                cartItemsList = handleAddItem(cartItemsList, ID, count);
            }
            break;
        case ACTIONS.REMOVE_ITEM:
            {
                const { ID, count } = payload;
                cartItemsList = handleRemoveItem(cartItemsList, ID, count);
            }
            break;
        case ACTIONS.CLEAR_CART:
            cartItemsList = {};
            break;
        default:
            checkAndAddAppDataToLS();
            const appData = getAppDataFromLS();
            cartItemsList = appData.cartListItems;
            break;
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART_LIST_ITEMS, JSON.stringify(cartItemsList));
    return cartItemsList;
}

export default cartListItemsReducer;
