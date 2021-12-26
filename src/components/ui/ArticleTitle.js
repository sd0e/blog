import React from 'react';

import classes from './ArticleTitle.module.css';

export default function ArticleTitle({ children }) {
	return (
		<span className={classes.articleTitle}>{children}</span>
	)
}