import React, { useState } from 'react';
import { IconButton, createTheme, ThemeProvider, SwipeableDrawer, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import classes from './Layout.module.css';
import NavMenu from './NavMenu';

export default function Layout({ children }) {
	let history = useHistory();

	const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
	const [compactMode, setCompactMode] = useState(window.innerWidth <= 405);
	const [navBarOpen, setNavBarOpen] = useState(false);

	const checkIsMobile = () => {
		const windowWidth = window.innerWidth;
		const desktopMinWidth = 870;
		const compactModeMaxWidth = 405;

		if (windowWidth >= desktopMinWidth && isMobile) setIsMobile(false);
		else if (windowWidth < desktopMinWidth && !isMobile) setIsMobile(true);

		if (windowWidth <= compactModeMaxWidth && !compactMode) setCompactMode(true);
		else if (windowWidth > compactModeMaxWidth && compactMode) setCompactMode(false);
	}

	window.addEventListener('resize', checkIsMobile, true);

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
						display: "inline-block",
						marginLeft: "1.25rem",
						fontSize: "1.15rem",
						fontFamily: `"Inter", sans-serif`,
						fontWeight: 500,
						textTransform: "none"
					},
				},
			},
		},
	});

	if (!isMobile) {
		return (
			<main className={classes.allContainer}>
				<table className={classes.tableContainer}>
					<tbody>
						<tr>
							<th className={classes.mainContent}>
								{children}
							</th>
							<th className={classes.rightColumn}>
								<NavMenu />
							</th>
						</tr>
					</tbody>
				</table>
			</main>
		)
	} else {
		return (
			<ThemeProvider theme={theme}>
				<SwipeableDrawer
					anchor="left"
					open={navBarOpen}
					onClose={() => setNavBarOpen(false)}
					onOpen={() => setNavBarOpen(true)}
				>
					<div className={classes.mobileNavMenuHolder}>
						<NavMenu Mobile OnChoice={() => setNavBarOpen(false)} CompactMode={compactMode} />
					</div>
				</SwipeableDrawer>
				<header className={classes.mobileHeader}>
					<div className={classes.mobileHeaderLeft}>
						<IconButton size="medium" onClick={() => setNavBarOpen(true)}>
							<Menu fontSize="medium" style={{ color: '#cccccc' }} />
						</IconButton>
						<Button onClick={() => history.push('/')}>Sebastian Doe</Button>
					</div>
				</header>
				<div className={classes.mobileContent}>
					{children}
				</div>
			</ThemeProvider>
		)
	}
}