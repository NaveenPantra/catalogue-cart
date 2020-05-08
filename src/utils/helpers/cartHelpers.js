function getTotalQuantityInCart(cartItemsList = {}) {
    let count = 0;
    Object.keys(cartItemsList).forEach(item => {
        count += cartItemsList[item].itemQty;
    });
    return count;
}

function getTotalCartPrice(cartItemsList, itemsList) {
    let totalPrice = 0;
    Object.keys(cartItemsList).forEach(item => {
        totalPrice += itemsList[item].itemPrice * cartItemsList[item].itemQty;
    });
    return totalPrice;
}

export {getTotalQuantityInCart, getTotalCartPrice};
