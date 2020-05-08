import React from 'react';
import withStyles from "react-jss";
import ItemsList from "../components/catalogue/ItemsList";
import Cart from "../components/catalogue/Cart";

const styles = {
    root: {
        display: 'flex',
        height: "100%",
        minHeight: `calc(100vh - 65px)`,
        maxHeight: `calc(100vh - 65px)`,
    },
    itemsList: {
        flex: 3,
        marginRight: "2rem",
        boxShadow: "var(--shadow-light)",
        height: "100%",
    },
    cart: {
        flex: 1,
        boxShadow: "var(--shadow-light)",
    },
};

const Catalogue = ({classes}) => {
    return (
        <section className={classes.root}>
            <section className={classes.itemsList}>
                <ItemsList/>
            </section>
            <section className={classes.cart}>
                <Cart/>
            </section>
        </section>
    );
};

export default withStyles(styles)(Catalogue);
