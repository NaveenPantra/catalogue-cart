import {ACTIONS} from "./cartItemsList.constants";

function addCartListItem(payload) {
    return {
        type: ACTIONS.ADD_ITEM,
        payload,
    };
}

function removeCartListItem(payload) {
    return {
        type: ACTIONS.REMOVE_ITEM,
        payload,
    };
}

function clearCart(payload) {
    return {
        type: ACTIONS.CLEAR_CART,
        payload,
    };
}

export { addCartListItem, removeCartListItem, clearCart };
