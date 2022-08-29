import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddToAnalytics from '../scripts/AddToAnalytics';
import { Button, ThemeProvider, createTheme, Stack } from '@mui/material';
import { HighlightOff } from '@mui/icons-material';

import PageHead from '../PageHead';
import GeneratePageTitle from '../scripts/GeneratePageTitle';
import Fetch from '../scripts/Fetch';
import InfoCard from '../components/ui/InfoCard';
import ArticleTitle from '../components/ui/ArticleTitle';
import MiniDescription from '../components/ui/MiniDescription';
import Information from '../components/ui/Information';

export default function Out() {
	const location = useLocation();
	const campaignID = location.pathname.split('/out/')[1];

	let navigate = useNavigate();

	const [campaign, setCampaign] = useState('Loading');
	
	useEffect(() => {
		AddToAnalytics(`Campaign | ${campaignID}`, location.pathname);

		Fetch(`/campaigns/campaign/${campaignID}`).then(fetchedCampaign => {
			setCampaign(fetchedCampaign)
		});
	}, []);

	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						background: 'rgb(35,17,72)',
						background: '-moz-linear-gradient(90deg, rgba(35,17,72,1) 0%, rgba(26,17,129,1) 40%, rgba(14,21,251,1) 100%)',
						background: '-webkit-linear-gradient(90deg, rgba(35,17,72,1) 0%, rgba(26,17,129,1) 40%, rgba(14,21,251,1) 100%)',
						background: 'linear-gradient(90deg, rgba(35,17,72,1) 0%, rgba(26,17,129,1) 40%, rgba(14,21,251,1) 100%)',
						filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#231148",endColorstr="#0e15fb",GradientType=1)',
						justifyContent: 'left',
						textTransform: 'none',
						fontFamily: `'Inter', sans-serif`,
						fontWeight: 600,
						color: '#DDD7D7',
						fontSize: '1rem',
						padding: '0.5rem 1.5rem',
						width: '15rem',
						borderRadius: '0.5rem',
					},
				},
			},
		},
	});

	const returnTheme = createTheme({
		palette: {
			mode: 'dark',
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						background: 'rgba(81, 75, 75, 0.1)',
						justifyContent: 'left',
						textTransform: 'none',
						fontFamily: `'Inter', sans-serif`,
						fontWeight: 400,
						color: '#BFBFBF',
						fontSize: '1rem',
						padding: '0.5rem 1.5rem',
						width: '15rem',
						borderRadius: '0.5rem',
					},
				},
			},
		},
	});

	return (
		<div>
			<PageHead Title={GeneratePageTitle('Leaving Site')} />
			{ campaign === 'Loading' ? <InfoCard Loading>Loading</InfoCard> :
				campaign === null ? <InfoCard Icon={HighlightOff}>Campaign Not Found</InfoCard> :
				<div>
					<ArticleTitle>{campaign.name}</ArticleTitle>
					<MiniDescription>{campaign.description}</MiniDescription>
					<Information Title={campaign.type === 'ref' ? 'This is a referral link' : 'This is an affiliate link'}>
						I may get a commission to help fund this blog if you use this link
					</Information>

					<Stack spacing={2} direction={{ xs: "column", sm: "row"}}>
						<ThemeProvider theme={theme}>
							<Button onClick={() => {
								AddToAnalytics(`Site Leave: ${campaignID}`, window.location.href);
								window.open(campaign.url);
								navigate(-1);
							}}>Go</Button>
						</ThemeProvider>
						<ThemeProvider theme={returnTheme}>
							<Button onClick={() => navigate(-1)}>Return</Button>
						</ThemeProvider>
					</Stack>
				</div>
			}
		</div>
	)
}