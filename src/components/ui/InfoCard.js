import React from 'react';
import { CircularProgress } from '@mui/material';

import classes from './InfoCard.module.css';

export default function InfoCard({ children, Icon, Loading }) {
	return (
		<div className={classes.infoCardContainer}>
			{ Loading ? <CircularProgress size="12px" style={{ color: '#a1a0a8' }} /> : <Icon fontSize="small" style={{ color: '#a1a0a8' }} /> }
			<span className={classes.infoCardText}>{children}</span>
		</div>
	)
}