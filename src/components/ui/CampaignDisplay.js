import React from 'react';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';

import classes from './CampaignDisplay.module.css';

export default function CampaignDisplay({ CampaignID, SiteName, Description, Type, Mobile, OnChoice }) {
	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#8e8c99',
			},
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						width: "100%",
						borderRadius: "1.5rem",
						padding: "2rem 2.5rem",
						transition: "0.1s ease-in-out",
						cursor: "pointer",
						justifyContent: "space-between",
						marginBottom: "0.5rem",
						textTransform: "none",
						fontFamily: "Inter, sans-serif",
						border: "1px solid rgba(255, 255, 255, 0.1)",
						whiteSpace: "pre-line",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Link to={`/out/${CampaignID}`} onClick={() => Mobile && OnChoice()} aria-label="Go to referral campaign" style={{ textDecoration: 'none' }}>
				<Button aria-label="Go to referral campaign">
					<div className={classes.campaignContentOuter}>
						<span className={classes.campaignType}>{ Type === 'referral' ? 'Referral' : 'Affiliate Link' }</span>
						<br />
						<span className={classes.campaignSiteName}>{SiteName}</span>
						<br />
						<span className={classes.campaignDescription}>{Description}</span>
					</div>
				</Button>
			</Link>
		</ThemeProvider>
	)
}