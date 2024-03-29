import { Button, createTheme, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

import classes from './PostButton.module.css';

export default function PostButton({ children, Date, Category, CategoryColour, To }) {
	const theme = createTheme({
		palette: {
			mode: "dark",
			primary: {
				main: "#d6d6d6",
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
						padding: "1.5rem 2rem",
						borderRadius: "0.75rem",
						border: "1px solid rgba(255, 255, 255, 0.1)",
						marginBottom: "1rem",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Link to={To} aria-label={`Go to the following post: ${children}`} style={{ textDecoration: 'none' }}>
				<Button aria-label={`Go to the following post: ${children}`}>
					<div className={classes.postButtonContainerOuter}>
						<span className={classes.postButtonTitle}>{children}</span>
						<div className={classes.postButtonBottomContentContainer}>
							<span className={classes.postButtonDate}>{Date}</span>
							<span className={classes.postButtonCategory} style={{ color: CategoryColour }}>{Category}</span>
						</div>
					</div>
				</Button>
			</Link>
		</ThemeProvider>
	)
}