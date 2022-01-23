import React from 'react';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import classes from './CampaignDisplay.module.css';

export default function CampaignDisplay({ CampaignID, SiteName, Description, Type, Mobile, OnChoice }) {
	let navigate = useNavigate();

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
						border: "none",
						transition: "0.1s ease-in-out",
						cursor: "pointer",
						justifyContent: "space-between",
						marginBottom: "0.5rem",
						textTransform: "none",
						fontFamily: "Inter, sans-serif",
						backgroundColor: "rgba(51, 51, 51, 0.15)",
						whiteSpace: "pre-line",
					},
				},
			},
		},
	});

	const goToLink = path => {
		navigate(path);
		Mobile && OnChoice();
	}

	return (
		<ThemeProvider theme={theme}>
			<Button onClick={() => goToLink(`/out/${CampaignID}`)} aria-label="Go to referral campaign">
				<div className={classes.campaignContentOuter}>
					<span className={classes.campaignType}>{ Type === 'referral' ? 'Referral' : 'Affiliate Link' }</span>
					<br />
					<span className={classes.campaignSiteName}>{SiteName}</span>
					<br />
					<span className={classes.campaignDescription}>{Description}</span>
				</div>
			</Button>
		</ThemeProvider>
	)
}