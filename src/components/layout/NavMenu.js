import React, { useState } from 'react';
import { Button, createTheme, IconButton, ThemeProvider } from '@mui/material';
import { Add, Close, Info, OpenInNew, Search } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import classes from './NavMenu.module.css';
import MainNavButton from '../ui/MainNavButton';
import CampaignDisplay from '../ui/CampaignDisplay';

export default function NavMenu({ Mobile, OnChoice, CompactMode }) {
	const [searchInputVal, setSearchInputVal] = useState('');
	
	let history = useHistory();

	const darkTheme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#cccccc",
			}
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontFamily: `"Inter", sans-serif`,
						fontWeight: 600,
						justifyContent: "space-between",
						padding: "0.9rem 1.5rem",
						width: "100%",
						borderRadius: "0.5rem",
						background: "rgba(51, 51, 51, 0.1)",
						color: "#999999",
						marginTop: "1rem",
					},
				},
			},
		},
	});

	const searchButtonTheme = createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none",
						fontFamily: `"Inter", sans-serif`,
						fontWeight: 600,
						padding: "0.9rem 0.8rem",
						width: "100%",
						borderRadius: "0.5rem",
						background: "rgba(102, 51, 51, 0.2)",
						color: "#cccccc",
					},
				},
			},
		},
	});

	const goToLink = (path, openInNew = false) => {
		if (openInNew) window.open(path);
		else history.push(path);
		Mobile && OnChoice();
	}

	return (
		<div className={classes.flexDiv}>
			<div>
				{
					Mobile &&
					<div className={classes.mobileMenuCloseContainer}>
						<IconButton size="small" onClick={OnChoice}>
							<Close fontSize="small" />
						</IconButton>
					</div>
				}
				<MainNavButton OnClick={() => goToLink('/')} CompactMode={CompactMode} />
				<ThemeProvider theme={darkTheme}>
					<div className={classes.navMenuInner}>
						<table className={classes.searchTableOuter}>
							<tbody>
								<tr className={classes.removeSearchTableBorder}>
									<th>
										<input type="text" onChange={e => setSearchInputVal(e.target.value)} className={classes.searchInput} placeholder="Search" />
									</th>
									<th>
										<ThemeProvider theme={searchButtonTheme}>
											<Button aria-label="search" onClick={() => goToLink(`/article/${searchInputVal.split(' ').join('-').toLowerCase()}`)}>
												<Search fontSize="small" />
											</Button>
										</ThemeProvider>
									</th>
								</tr>
							</tbody>
						</table>
						<Button>
							Categories
							<Add fontSize="small" />
						</Button>
						<Button onClick={() => goToLink('/about')}>
							<span style={{ color: "#9ea4b0" }}>About This Blog</span>
							<Info fontSize="small" style={{ color: "#9ea4b0" }} />
						</Button>
						<Button onClick={() => goToLink('https://git.sebdoe.com/', true)}>
							<span style={{ color: "#74ba74" }}>Personal Website</span>
							<OpenInNew fontSize="small" style={{ color: "#74ba74" }} />
						</Button>
					</div>
				</ThemeProvider>
			</div>
			<CampaignDisplay CampaignID="amazon" SiteName="Amazon" Description="Get 50% off all Amazon purchases by clicking here" Type="referral" Mobile={Mobile} OnChoice={OnChoice} />
		</div>
	)
}