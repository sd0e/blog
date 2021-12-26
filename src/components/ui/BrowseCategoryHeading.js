import React from 'react';

import classes from './BrowseCategoryHeading.module.css';

export default function BrowseCategoryHeading({ colour, children }) {
	return (
		<span className={classes.browseCategoryHeading} style={{ color: `#${colour}` }}>{children}</span>
	)
}