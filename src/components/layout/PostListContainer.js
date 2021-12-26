import React from 'react';
import classes from './PostListContainer.module.css';

export default function PostListContainer({ children }) {
	return (
		<div className={classes.postListContainer}>{children}</div>
	)
}