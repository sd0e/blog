import React from 'react';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useHistory } from 'react-router-dom';

import classes from './MainNavButton.module.css';

export default function NavMenu({ OnClick, CompactMode }) {
	let history = useHistory();

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
			<Button onClick={OnClick}>
				<div>
					<table>
						<tbody>
							<tr>
								{
									!CompactMode &&
									<th className={classes.leftIcon}>
										<div alt="Sebastian Doe Icon" className={classes.icon}></div>
									</th>
								}
								<th className={classes.rightDescription}>
									<span className={classes.siteName}>Sebastian Doe</span>
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