import React from 'react';
import classes from './MiniDescription.module.css';

export default function MiniDescription({ children }) {
  	return <span className={classes.miniDescription}>{children}</span>;
}