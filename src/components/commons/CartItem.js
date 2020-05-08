import React, {useContext} from 'react';
import withStyles from "react-jss";
import {connect} from "react-redux";
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
        flex: 1,
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
    image: {
        width: "5rem",
        height: "5rem",
        objectFit: "cover",
        borderRadius: "50%",
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
        fontSize: "1.3rem",
        fontWeight: 600,
    },
    itemTotalPrice: {
        padding: ".5rem",
        background: "var(--color-text)",
        transform: "skewX(13deg)",
        color: "var(--color-grey-light-1)",
        "& span": {
            fontWeight: 600,
            display: 'block',
            transform: "skewX(-13deg)",
        }
    },
};

const CartItem = ({classes, item, itemCartQuantity, ID}) => {
    const currency = useContext(CurrencyContext);
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
                    <span>{currency}{item.itemPrice}</span>
                    &nbsp;
                    <span>✗</span>
                    &nbsp;
                    <span>{itemCartQuantity}</span>
                </div>
                <div className={`${classes.itemTotalPrice}`}>
                    <span>
                        {currency}&nbsp;{Number(itemCartQuantity * item.itemPrice).toLocaleString("en-IN")}
                    </span>
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
}

export default connect(mapStateToProps)(withStyles(styles)(CartItem));
