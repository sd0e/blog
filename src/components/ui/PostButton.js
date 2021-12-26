import { Button, createTheme, ThemeProvider } from '@mui/material';
import React from 'react';

import classes from './PostButton.module.css';

export default function PostButton({ children, Date, Category, CategoryColour, Click }) {
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
						background: "#191717",
						marginBottom: "1rem",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Button onClick={Click}>
				<div className={classes.postButtonContainerOuter}>
					<span className={classes.postButtonTitle}>{children}</span>
					<div className={classes.postButtonBottomContentContainer}>
						<span className={classes.postButtonDate}>{Date}</span>
						<span className={classes.postButtonCategory} style={{ color: CategoryColour }}>{Category}</span>
					</div>
				</div>
			</Button>
		</ThemeProvider>
	)
}