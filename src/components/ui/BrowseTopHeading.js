import React from 'react';

import classes from './BrowseTopHeading.module.css';

export default function BrowseTopHeading({ children }) {
	return (
		<span className={classes.browseTopHeading}>{children}</span>
	)
}