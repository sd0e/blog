import React, { useState } from 'react';
import { ThemeProvider, createTheme, IconButton, Button, Menu, MenuItem, ListItemIcon, Paper } from '@mui/material';
import { Reddit, Share, Twitter } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import classes from './ArticleInfoPane.module.css';
import StringFromDate from '../../scripts/StringFromDate';

export default function ArticleInfoPane({ Date, Category, ArticleName }) {
	const [anchorElement, setAnchorElement] = useState(null);

	let history = useHistory();

	const isOpen = Boolean(anchorElement);

	const dateString = StringFromDate(Date);

	const categoryHexColour = Category.substr(-6);
	const categoryName = Category.replace(categoryHexColour, '');

	const openPopup = url => {
		window.open(url, '', 'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=400,width=800');
	}

	const shareArticle = platform => {
		if (platform === 'twitter') window.open(`https://www.twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${ArticleName}`);
		else if (platform === 'reddit') window.open(`http://www.reddit.com/submit?url=${encodeURIComponent(window.location.href)}&title=${ArticleName}`);
		setAnchorElement(null);
	}

	const theme = createTheme({
		palette: {
			mode: 'dark',
			primary: {
				main: '#8e8c99',
			},
		},
		components: {
			MuiButton: {
				textTransform: "none",
				fontFamily: `"Inter", sans-serif`,
				fontWeight: 600,
				textAlign: "left",
				justifyContent: "flex-start",
				padding: "1rem 1.5rem",
				borderRadius: "1rem",
			}
		},
	});

	return (
		<div className={classes.articleInfoPaneOuter}>
			<ThemeProvider theme={theme}>
				<span className={classes.articleInfoDate}>{dateString}</span>
				<Button style={{ display: 'inline-block', marginRight: '3rem' }} onClick={() => history.push(`/category/${categoryName.toLowerCase()}`)}>
					<span className={classes.articleInfoCategory} style={{ color: `#${categoryHexColour}` }}>{categoryName}</span>
				</Button>
				<IconButton id="share-button" size="small" color="primary" aria-controls="share-menu" aria-haspopup="true" aria-expanded={ isOpen ? 'true' : undefined } onClick={e => setAnchorElement(e.currentTarget)}>
					<Share fontSize="12px" />
				</IconButton>
					<Menu id="share-menu" anchorEl={anchorElement} open={isOpen} onClose={() => setAnchorElement(null)} MenuListProps={{ 'aria-labelledby': 'share-button' }}>
						<Paper sx={{ width: 200, maxWidth: '100%', backgroundColor: 'rgba(0, 0, 0, 0)' }} elevation={0}>
							<MenuItem onClick={() => shareArticle('twitter')}>
								<ListItemIcon>
									<Twitter className={classes.shareMenuIcon} fontSize="16px" />
								</ListItemIcon>
								<span className={classes.shareMenuItemText}>Twitter</span>
							</MenuItem>
							<MenuItem onClick={() => shareArticle('reddit')}>
								<ListItemIcon>
									<Reddit className={classes.shareMenuIcon} fontSize="16px" />
								</ListItemIcon>
								<span className={classes.shareMenuItemText}>Reddit</span>
							</MenuItem>
						</Paper>
					</Menu>
			</ThemeProvider>
		</div>
	)
}