import React, {useContext} from 'react';
import withStyles from "react-jss";
import {connect} from "react-redux";
import {clearCart} from "../../redux/CartItemsList/cartItemsList.actions";
import CartItem from "../commons/CartItem";
import {getTotalCartPrice, getTotalQuantityInCart} from "../../utils/helpers/cartHelpers";
import {CurrencyContext} from "../../App";

const styles = {
    root: {
        height: "100%",
        overflow: "scroll",
        padding: "2rem .5rem 0",
        display: "flex",
        flexDirection: "column",
    },
    heading: {
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "var(--box-shadow)",
    },
    list: {
        height: "100%",
        overflow: "scroll",
    },
    listItem: {
        "&:last-child": {
            marginBottom: "4rem",
        }
    },
    totalPrice: {
        padding: "1rem",
        fontSize: "1.4rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    options: {
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "var(--shadow-light)",
    },
    optionsInactive: {
        "&, &  *": {
            opacity: .3,
            cursor: 'not-allowed',
        },
    },
    totalAmountCheckout: {
        padding: ".3rem .7rem",
        marginLeft: "2rem",
        color: "var(--color-text)",
        transform: "skewX(13deg)",
        background: "var(--color-grey-light-1)",
        "& span": {
            fontWeight: 600,
            display: 'block',
            transform: "skewX(-13deg)",
        }
    },
    btn: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center',
        flex: 7,
        marginRight: "1.5rem",
        padding: "1rem 1.5rem",
        textAlign: "center",
        background: "var(--color-text)",
        color: "var(--color-grey-light-1)",
        borderRadius: 3,
    },
    flush: {
        flex: 1,
        fontSize: "2.3rem",
        cursor: "pointer",
        boxShadow: "none",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        "&:hover": {
            boxShadow: "var(--shadow-dark)",
        },
    },
};

const Cart = ({classes, cartListItems, totalQuantity, totalPrice, clearCart}) => {
    const currency = useContext(CurrencyContext);
    return (
        <section className={classes.root}>
            <h2 className={classes.heading}>Cart Items</h2>
            <ul className={classes.list}>
                {
                    cartListItems.map(ID => (
                        <li
                            key={`cart-${ID}`}
                            className={classes.listItem}>
                            <CartItem ID={ID}/>
                        </li>
                    ))
                }
                <li
                    className={classes.listItem}
                    style={{
                        display: totalQuantity > 0 ? "block" : "none",
                    }}>
                    <h4 className={classes.totalPrice}>
                        <span>Total</span>
                        <span>{currency}&nbsp;{Number(totalPrice).toLocaleString("en-IN")}</span>
                    </h4>
                </li>
            </ul>
            <div
                className={`${classes.options} ${totalQuantity <= 0 ? classes.optionsInactive : ""}`}>
                <button
                    onClick={clearCart}
                    className={`${classes.btn} ${totalQuantity <= 0 ? classes.optionsInactive : ""}`}>
                    <span>Pay!</span>
                    {
                        totalQuantity > 0 ?
                            <span className={classes.totalAmountCheckout}>
                                <span>
                                    {currency} {Number(totalPrice).toLocaleString("en-IN")}
                                </span>
                            </span>
                            :
                            null
                    }

                </button>
                {/*<div*/}
                {/*    onClick={clearCart}*/}
                {/*    className={`${classes.flush} ${totalQuantity <= 0 ? classes.optionsInactive : ""}`}>*/}
                {/*    <ion-icon name="trash" />*/}
                {/*</div>*/}
            </div>
        </section>
    );
};

const mapStateToProps = ({itemsList, cartListItems}) => ({
    cartListItems: Object.keys(cartListItems),
    totalQuantity: getTotalQuantityInCart(cartListItems),
    totalPrice: getTotalCartPrice(cartListItems, itemsList),
});

const mapDispatchToProps = (dispatch) => ({
    clearCart: () => dispatch(clearCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart));
