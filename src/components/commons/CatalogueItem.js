import React, {useContext} from 'react';
import withStyles from "react-jss";
import {connect} from "react-redux";
import Input from "./Input";
import {addCartListItem, removeCartListItem} from "../../redux/CartItemsList/cartItemsList.actions";
import {CurrencyContext} from "../../App";

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        boxShadow: "var(--shadow-light)",
        // border: "thin solid var(--color-text)",
        borderRadius: 3,
        transition: "all .1s linear",
        margin: "1rem",
        width: "30rem",
        "&:hover": {
            boxShadow: "var(--shadow-dark)",
        },
    },
    header: {
        display: "flex",
        justifyContent: "flex-start",
    },
    figure: {
        position: "relative",
        marginRight: "1.5rem",
    },
    image: {
        width: "5rem",
        height: "5rem",
        objectFit: "cover",
        borderRadius: "50%",
    },
    figcaption: {
        position: "absolute",
        display: "block",
        width: "1.3rem",
        height: "1.3rem",
        border: "1px solid var(--color-text)",
        background: "var(--color-grey-light-1)",
        bottom: 0,
        right: 0,
        borderRadius: 2,

        "& i": {
            content: '""',
            width: ".8rem",
            height: ".8rem",
            display: "block",
            position: "absolute",
            top: "50%",
            left: "50%",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
        },
    },
    details: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderBottom: "var(--line)",
    },
    itemName: {
        fontSize: "1.4rem",
    },
    itemPrice: {
        fontSize: "1.2rem"
    },
    footer: {
        marginTop: "1rem",
        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
    },
    counter: {
        display: "flex",
    },
    cnt: {
        fontSize: "2.3rem",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: ".6rem",
        boxShadow: "none",
        cursor: "pointer",
        "&:hover": {
            boxShadow: "var(--shadow-light)",
        },
    },
    input: {
        width: "5rem",
        height: "2.5rem",
        alignSelf: "center",
        fontSize: "2rem",
        textAlign: "center",
        color: "var(--color-text)",
    },
    cartIndicator: {
        fontSize: "2.3rem",
        opacity: 1,
    },
    cartIndicatorNotInCart: {
        opacity: .2,
    },
};

const CatalogueItem = ({classes, ID, item, itemCartQuantity, addCartListItem, removeCartListItem}) => {
    const currency = useContext(CurrencyContext);
    function handleAddItem(count = 1) {
        addCartListItem({ID, count: itemCartQuantity + count});
    }
    function handleRemoveItem(count = 1) {
        removeCartListItem({ID, count});
    }
    function onChange(event) {
        const count = parseInt(event.target.value) || 0;
        if (!isNaN(count)) {
            if (count > 0) {
                addCartListItem({ID, count});
            } else if (count === 0) {
                handleRemoveItem(itemCartQuantity);
            }
        }
    }
    return (
        <section className={classes.root}>
            <div className={classes.header}>
                <figure
                    className={classes.figure}>
                    <img
                        className={classes.image}
                        src={item.itemImageURL}
                        alt={item.itemName}/>
                    <figcaption className={classes.figcaption} >
                        <i
                            style={{
                                background: item.veg ? "var(--color-green)" : "var(--color-red)",
                            }}/>
                    </figcaption>
                </figure>
                <div className={classes.details}>
                    <h2 className={classes.itemName}>{item.itemName}</h2>
                    <h6 className={classes.itemPrice}>{currency}&nbsp;{item.itemPrice}</h6>
                </div>
            </div>
            <div className={classes.footer}>
                <div className={classes.counter}>
                    <div
                        onClick={() => {handleAddItem()}}
                        className={classes.cnt}>
                        <ion-icon name="add-circle-outline" />
                    </div>
                    <Input
                        className={classes.input}
                        type={"number"}
                        onChange={onChange}
                        value={itemCartQuantity > 0 ? itemCartQuantity : ""}/>
                    <div
                        onClick={() => {handleRemoveItem()}}
                        style={{
                            cursor: itemCartQuantity > 0 ? "pointer" : "not-allowed",
                            opacity: itemCartQuantity > 0 ? 1 : .8,
                        }}
                        className={classes.cnt}>
                        <ion-icon name="remove-circle-outline"/>
                    </div>
                </div>
                <div className={`${classes.cartIndicator} ${itemCartQuantity <= 0 ? classes.cartIndicatorNotInCart : ""}`}>
                    <ion-icon name="cart" />
                </div>
            </div>
        </section>
    );
};

const mapStateToProps = ({itemsList, cartListItems}, {ID}) => {
    return {
        item: itemsList[ID],
        itemCartQuantity: cartListItems[ID]?.itemQty || 0,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addCartListItem: payload => dispatch(addCartListItem(payload)),
        removeCartListItem: payload => dispatch(removeCartListItem(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CatalogueItem));
