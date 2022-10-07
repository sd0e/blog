import React from 'react';

import classes from './ArticleTitle.module.css';

export default function ArticleTitle({ children }) {
	return (
		<h1 className={classes.articleTitle}>{children}</h1>
	)
}