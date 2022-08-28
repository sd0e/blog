import React from 'react';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import classes from './MainNavButton.module.css';

export default function NavMenu({ OnClick, CompactMode }) {
	let navigate = useNavigate();

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
										<div alt="Seb Doe Icon" className={classes.icon}></div>
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