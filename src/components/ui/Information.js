import React from 'react';

import classes from './Information.module.css';

export default function Information({ Title, children, Article }) {
  	return (
		<div className={Article ? classes.informationOuterArticle : classes.informationOuter}>
			<div className={classes.iconHolderHolder}>
				<div className={classes.iconHolder}>
					<div className={classes.icon} />
					<div className={classes.iconInfoHolder}>
						<span className={classes.iconInfo}>i</span>
					</div>
				</div>
			</div>
			<div className={classes.infoTextHolder}>
				{ Title && <span className={Article ? classes.informationTitleArticle : classes.informationTitle}>{Title}</span> }
				<span className={Article ? classes.informationContentArticle : classes.informationContent}>{children}</span>
			</div>
		</div>	
	);
}