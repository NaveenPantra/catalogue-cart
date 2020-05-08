import {ITEMS_LIST} from "../InitialState";
import {checkAndAddAppDataToLS, getAppDataFromLS} from "../CartItemsList/cartItemsList.helpers";
import {LOCAL_STORAGE_KEYS} from "../../utils/constants/storageKeys";

function itemsListReducer(state = ITEMS_LIST, action) {
    const {type} = action;
    let itemsList = Object.assign({}, state);
    switch (type) {
        default:
            checkAndAddAppDataToLS();
            const appData = getAppDataFromLS();
            itemsList = appData.itemsList;
            break;
    }
    localStorage.setItem(LOCAL_STORAGE_KEYS.ITEMS_LIST, JSON.stringify(itemsList));
    return itemsList;
}

export default itemsListReducer;
