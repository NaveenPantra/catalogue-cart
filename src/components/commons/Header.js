import React from 'react';
import withStyles from "react-jss";
import {connect} from "react-redux";
import {getTotalQuantityInCart} from "../../utils/helpers/cartHelpers";

const styles = {
    root: {
        padding: "1.5rem",
        boxShadow: "var(--shadow-light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: "12rem",
        height: "auto",
        objectFit: "contain",
    },
    figcaption: {},
    heading: {
        fontSize: "2.5rem",
        fontWeight: 600,
        position: "relative",
        "&::after": {
            content: 'attr(data-items)',
            position: "absolute",
            right: 0,
            top: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "2rem",
            height: "2rem",
            fontSize: "1rem",
            borderRadius: "50%",
            background: "var(--color-text)",
            color: "var(--color-grey-light-1)",
            transform: "translate(50%, -50%)",
        }
    },
};

const Header = ({classes, totalQty}) => {
    return (
        <header
            className={classes.root}
            id={"header"}>
            <figure>
                <img
                    src="https://ik.imagekit.io/dunzo/web-assets/images/logo-4d2d81aefcf296bc100d9edc114c2ea5.png?tr=w-244,h-56,cm-pad_resize"
                    alt="Dunzo"
                    className={classes.image}/>
            </figure>
            <h6
                data-items={totalQty}
                className={classes.heading}>
                <ion-icon name="cart-outline"/>
            </h6>
        </header>
    );
};

const mapStateToProps = ({cartListItems = {}}) => {
    return {
        totalQty: getTotalQuantityInCart(cartListItems),
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Header));
