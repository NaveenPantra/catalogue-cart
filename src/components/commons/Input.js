import React from 'react';
import withStyles from "react-jss";

const styles = {
    root: {
        outline: "none",
    }
};

const Input = ({classes, className, type, value, onChange, name}) => {
    return (
        <input
            className={`${classes.root} ${className}`}
            type={type}
            name={name}
            value={value}
            onChange={onChange}/>
    );
};

export default withStyles(styles)(Input);
