import React from 'react';
import withStyles from "react-jss";
import {connect} from "react-redux";
import CatalogueItem from "../commons/CatalogueItem";

const styles = {
    root: {
        height: "100%",
        padding: "2rem 1.5rem 1.5rem",
        display: "flex",
        flexDirection: "column",
    },
    heading: {
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "var(--shadow-light)",
    },
    list: {
        height: "100% !important",
        overflow: "scroll",
        display: "flex",
        flexWrap: 'wrap',
        justifyContent: "space-between",
    },
    listItem: {}
};

const ItemsList = ({classes, itemsListIDs}) => {
    return (
        <section className={classes.root}>
            <h2 className={classes.heading}>Catalogue Items</h2>
            <ul className={classes.list}>
                {itemsListIDs.map(ID => (
                    <li
                        className={classes.listItem}
                        key={`item-${ID}`}>
                        <CatalogueItem ID={ID}/>
                    </li>
                ))}
            </ul>
        </section>
    );
};

const mapStateToProps = ({itemsList = {}}) => ({
    itemsListIDs: Object.keys(itemsList),
});

export default connect(mapStateToProps)(withStyles(styles)(ItemsList));
