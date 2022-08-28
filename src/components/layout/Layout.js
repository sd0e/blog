import React, { useState, Suspense, lazy } from 'react';
import { IconButton, createTheme, ThemeProvider, SwipeableDrawer, Button } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import classes from './Layout.module.css';
import InfoCard from '../ui/InfoCard';
import DialogContainer from '../ui/DialogContainer';
import { ReactComponent as HeaderIcon } from '../../assets/SVG/square_icon.svg';
const NavMenu = lazy(() => import('./NavMenu'));

export default function Layout({ children }) {
	let navigate = useNavigate();

	const [isMobile, setIsMobile] = useState(window.innerWidth < 870);
	const [compactMode, setCompactMode] = useState(window.innerWidth <= 405);
	const [navBarOpen, setNavBarOpen] = useState(false);
	const [alerts, setAlerts] = useState(JSON.stringify({}));

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

	const handleScroll = e => {
		if (window.location.pathname === '/' || window.location.pathname.includes('/category/')) {
			const el = document.getElementById('end');
			var rect = el.getBoundingClientRect();
			var elemTop = rect.top;
			var elemBottom = rect.bottom;
			const bottom = (elemTop >= 0) && (elemBottom <= window.innerHeight);
			if (bottom) window['bottomReached']();
		}
	}

	window.alert = (message, severity = 0) => {
		let alertsTemp = JSON.parse(alerts);
		alertsTemp[new Date().getTime().toString()] = {
			message: message,
			severity: severity
		}
		setAlerts(JSON.stringify(alertsTemp));
	}

	const removeDialogBox = alertKey => {
		let alertsTemp = JSON.parse(alerts);
		delete alertsTemp[alertKey];
		setAlerts(JSON.stringify(alertsTemp));
	}

	if (isMobile) {
		return (
			<ThemeProvider theme={theme}>
				<SwipeableDrawer
					anchor="left"
					open={navBarOpen}
					onClose={() => setNavBarOpen(false)}
					onOpen={() => setNavBarOpen(true)}
				>
					<div className={classes.mobileNavMenuHolder}>
						<Suspense fallback={ <InfoCard Loading /> }>
							<NavMenu Mobile OnChoice={() => setNavBarOpen(false)} CompactMode={compactMode} />
						</Suspense>
					</div>
				</SwipeableDrawer>
				<header className={classes.mobileHeader}>
					<div className={classes.mobileHeaderLeft}>
						<IconButton size="medium" onClick={() => setNavBarOpen(true)} aria-label="open menu">
							<Menu fontSize="medium" style={{ color: '#cccccc' }} />
						</IconButton>
						<Button onClick={() => navigate('/')} aria-label="home">
						<HeaderIcon className={classes.mobileHeaderIcon} />Seb Doe</Button>
					</div>
				</header>
				<div className={classes.dialogBoxContainer}>
					<DialogContainer alerts={JSON.parse(alerts)} removeDialogBox={removeDialogBox} />
				</div>
				<div className={classes.mobileContentOuter} onScroll={handleScroll} onTouchMove={handleScroll}>
					<div className={classes.mobileContent}>
						{children}
					</div>
				</div>
			</ThemeProvider>
		)
	} else {
		return (
			<main className={classes.allContainer} onScroll={handleScroll}>
				<div className={classes.dialogBoxContainer}>
					<DialogContainer alerts={JSON.parse(alerts)} removeDialogBox={removeDialogBox} />
				</div>
				<table className={classes.tableContainer}>
					<tbody>
						<tr>
							<th className={classes.mainContent}>
								{children}
							</th>
							<th className={classes.rightColumn}>
								<Suspense fallback={ <InfoCard Loading /> }>
									<NavMenu />
								</Suspense>
							</th>
						</tr>
					</tbody>
				</table>
			</main>
		)
	}
}