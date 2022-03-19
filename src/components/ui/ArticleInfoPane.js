import React, { useState } from 'react';
import { ThemeProvider, createTheme, IconButton, Button, Menu, MenuItem, ListItemIcon, Paper } from '@mui/material';
import { Reddit, Share, Twitter, Comment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import classes from './ArticleInfoPane.module.css';
import StringFromDate from '../../scripts/StringFromDate';

export default function ArticleInfoPane({ Date, Category, ArticleName, Comments }) {
	const [anchorElement, setAnchorElement] = useState(null);

	let navigate = useNavigate();

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
				<Button style={{ display: 'inline-block', marginRight: '3rem' }} onClick={() => navigate(`/category/${categoryName.toLowerCase()}`)} aria-label={`Go to ${categoryName}`}>
					<span className={classes.articleInfoCategory} style={{ color: `#${categoryHexColour}` }}>{categoryName}</span>
				</Button>
				<IconButton id="share-button" size="small" color="primary" aria-controls="share-menu" aria-haspopup="true" aria-expanded={ isOpen ? 'true' : undefined } onClick={e => setAnchorElement(e.currentTarget)} aria-label="Share">
					<Share fontSize="12px" />
				</IconButton>
					<Menu id="share-menu" anchorEl={anchorElement} open={isOpen} onClose={() => setAnchorElement(null)} MenuListProps={{ 'aria-labelledby': 'share-button', 'aria-controls': false }}>
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
				{ Comments && <Button size="small" color="primary" onClick={() => window.open(`https://twitter.com/sebdoe_blog/status/${Comments}`)} aria-label="Open Comments" style={{ marginLeft: "2rem" }}>
					<Comment fontSize="small" style={{ marginRight: "1rem" }} />
					Discuss on Twitter
				</Button> }
			</ThemeProvider>
		</div>
	)
}