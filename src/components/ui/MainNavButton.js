import React from 'react';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import Icon from '../../assets/250h/icon.png';

import classes from './MainNavButton.module.css';

export default function NavMenu({ OnClick, CompactMode }) {
	const theme = createTheme({
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
						width: "100%",
						textAlign: "left",
						justifyContent: "flex-start",
						padding: "1rem 1.5rem",
						borderRadius: "1rem",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Button onClick={OnClick} aria-label="Home">
				<div>
					<table>
						<tbody>
							<tr>
								{
									!CompactMode &&
									<th className={classes.leftIcon}>
										<img src={Icon} alt="Seb Doe Icon" className={classes.icon} />
									</th>
								}
								<th className={classes.rightDescription}>
									<span className={classes.siteName}>Seb Doe</span>
									<span className={classes.siteSubtitle}>Programming Blog</span>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
			</Button>
		</ThemeProvider>
	)
}