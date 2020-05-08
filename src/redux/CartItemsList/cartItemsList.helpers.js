import {LOCAL_STORAGE_KEYS} from "../../utils/constants/storageKeys";
import {ITEMS_LIST, CART_ITEMS_LIST} from './../InitialState';

const checkAndAddAppDataToLS = () => {
    try {
        let cartListItems = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_LIST_ITEMS);
        let itemsList = localStorage.getItem(LOCAL_STORAGE_KEYS.ITEMS_LIST);
        if (cartListItems && itemsList) {
            JSON.stringify(cartListItems);
            JSON.stringify(itemsList);
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEYS.ITEMS_LIST, JSON.stringify(ITEMS_LIST));
            localStorage.setItem(LOCAL_STORAGE_KEYS.CART_LIST_ITEMS, JSON.stringify(CART_ITEMS_LIST));
        }
    } catch (e) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.CART_LIST_ITEMS);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.ITEMS_LIST);
        checkAndAddAppDataToLS();
    }
};

const getAppDataFromLS = () => {
    try {
        let cartListItems = localStorage.getItem(LOCAL_STORAGE_KEYS.CART_LIST_ITEMS);
        let itemsList = localStorage.getItem(LOCAL_STORAGE_KEYS.ITEMS_LIST);
        if (cartListItems && itemsList) {
            cartListItems = JSON.parse(cartListItems);
            itemsList = JSON.parse(itemsList);
            return {
                cartListItems,
                itemsList,
            };
        }
        throw new Error("data not found");
    } catch (e) {
        checkAndAddAppDataToLS();
        return {
            [LOCAL_STORAGE_KEYS.CART_LIST_ITEMS]: CART_ITEMS_LIST,
            [LOCAL_STORAGE_KEYS.ITEMS_LIST]: ITEMS_LIST,
        }
    }
};

const handleAddItem = (cartItemsList, addingID, count) => {
    if (!cartItemsList[addingID]) {
        cartItemsList[addingID] = {};
    }
    cartItemsList[addingID].itemQty = count;
    return cartItemsList;
};

const handleRemoveItem = (cartItemsList, deletingID, count) => {
    if (cartItemsList[deletingID]) {
        if (cartItemsList[deletingID]) {
            cartItemsList[deletingID].itemQty -= count;
        }
        if (cartItemsList[deletingID].itemQty <= 0) {
            delete cartItemsList[deletingID];
        }
    }
    return cartItemsList;
};

export {checkAndAddAppDataToLS, getAppDataFromLS, handleAddItem, handleRemoveItem};
