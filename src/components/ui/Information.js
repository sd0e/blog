import React from 'react';

import icon from '../../assets/SVG/icon.svg';
import classes from './Information.module.css';

export default function Information({ Title, children, Article }) {
  	return (
		<div className={Article ? classes.informationOuterArticle : classes.informationOuter}>
			<div className={classes.iconHolder}>
				<img src={icon} alt="Information" className={classes.icon}  />
				<div className={classes.iconInfoHolder}>
					<span className={classes.iconInfo}>i</span>
				</div>
			</div>
			<div className={classes.infoTextHolder}>
				{ Title && <span className={Article ? classes.informationTitleArticle : classes.informationTitle}>{Title}</span> }
				<span className={Article ? classes.informationContentArticle : classes.informationContent}>{children}</span>
			</div>
		</div>	
	);
}