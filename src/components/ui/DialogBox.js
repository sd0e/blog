import React from 'react';
import { IconButton, createTheme, ThemeProvider } from '@mui/material';
import { Close, Info, Warning, Error } from '@mui/icons-material';

import classes from './DialogBox.module.css';

export default function DialogBox({ text, severity, OnClose }) {
    let severityName;
    let Icon;
    if (severity === 3) {
        severityName = 'bad';
        Icon = Error;
    } else if (severity === 2) {
        severityName = 'warning';
        Icon = Warning;
    } else if (severity === 1) {
        severityName = 'good';
        Icon = Info;
    } else {
        severityName = 'normal';
        Icon = Info;
    }

    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    window.setTimeout(OnClose, 5000);

	return (
		<div className={[classes.dialogBox, classes[severityName]].join(' ')}>
            <div className={classes.dialogTextContainer}>
                <ThemeProvider theme={theme}>
                    <Icon className={classes.dialogBoxIcon} />
                    <span className={classes.dialogBoxText}>{text}</span>
                    <IconButton onClick={OnClose} className={classes.dialogBoxClose}>
                        <Close className={classes.closeIcon} />    
                    </IconButton>
                </ThemeProvider>
            </div>
            <div className={classes.dialogProgressBar}></div>
        </div>
	)
}