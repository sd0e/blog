import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HighlightOff } from '@mui/icons-material';
import { LinearProgress, ThemeProvider, createTheme, IconButton } from '@mui/material';
import { RssFeedOutlined } from '@mui/icons-material';

import AddToAnalytics from '../scripts/AddToAnalytics';
import PageHead from '../PageHead';
import GeneratePageTitle from '../scripts/GeneratePageTitle';
import Fetch from '../scripts/Fetch';
import FetchLast from '../scripts/FetchLast';
import BrowseTopHeading from '../components/ui/BrowseTopHeading';
import BrowseCategoryHeading from '../components/ui/BrowseCategoryHeading';
import PostListContainer from '../components/layout/PostListContainer';
import PostButton from '../components/ui/PostButton';
import StringFromDate from '../scripts/StringFromDate';
import InfoCard from '../components/ui/InfoCard';

export default function Out() {
	let location = useLocation();
	
	const categoryID = location.pathname.split('/').pop().toLowerCase();

	const [categoryInfo, setCategoryInfo] = useState('Loading');
	const [categoryArticles, setCategoryArticles] = useState('Loading');
	const [earliestPageNum, setEarliestPageNum] = useState('Progress');
	
	useEffect(() => {
		const localCategoryID = location.pathname.split('/').pop().toLowerCase();

		AddToAnalytics(`Category | ${localCategoryID}`, location.pathname);

		Fetch(`/blog/categories/${localCategoryID}/info`).then(categoryDisplayInfo => {
			if (categoryDisplayInfo !== null && categoryDisplayInfo !== undefined) {
				setCategoryInfo(categoryDisplayInfo);
			} else {
				setCategoryInfo('Does Not Exist');
			}
		});

		FetchLast(`/blog/categories/${localCategoryID}/articles/page`).then(pageInfo => {
			if (pageInfo !== undefined && pageInfo !== null) {
				setCategoryArticles(pageInfo[Object.keys(pageInfo)].reverse());
				setEarliestPageNum(Number(Object.keys(pageInfo)[0]));
				const el = document.getElementById('end');
				var rect = el.getBoundingClientRect();
				var elemTop = rect.top;
				var elemBottom = rect.bottom;
				const bottom = (elemTop >= 0) && (elemBottom <= window.innerHeight);
				if (bottom) window['bottomReached']();
			} else {
				setCategoryArticles('None');
			}
		});
	}, [location.pathname]);

	window['bottomReached'] = () => {
		if (earliestPageNum !== 'Progress' && earliestPageNum > 1) {
			setEarliestPageNum('Progress');
			Fetch(`/blog/categories/${categoryID}/articles/page/${earliestPageNum - 1}`).then(articles => {
				const existingArticles = categoryArticles;
				const newArticles = [...existingArticles, ...articles.reverse()];
				setCategoryArticles(newArticles);
				setEarliestPageNum(earliestPageNum - 1);
			})
		}
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

	if (categoryInfo === 'Loading') {
		return (
			<div>
				<PageHead Title={GeneratePageTitle('Loading Category')} />
				<InfoCard Loading>Loading</InfoCard>
			</div>
		);
	} else if (categoryInfo === 'Does Not Exist') {
		return (
			<div>
				<PageHead Title={GeneratePageTitle('Loading Category')} />
				<InfoCard Icon={HighlightOff}>Category Does Not Exist</InfoCard>
			</div>
		);
	} else {
		return (
			<ThemeProvider theme={theme}>
				<PageHead Title={GeneratePageTitle(categoryInfo['name'])} Description={`Blog posts tagged with ${categoryInfo['name']}`} />
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div>
						<BrowseTopHeading>Posts Tagged With</BrowseTopHeading>
						<BrowseCategoryHeading colour={categoryInfo['color']}>{categoryInfo['name']}</BrowseCategoryHeading>
					</div>
					<a href={`https://rss.sebdoe.com/category/${categoryInfo['name'].toLowerCase()}/rss.xml`} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
						<IconButton size="small" color="primary">
							<RssFeedOutlined fontSize="small" />
						</IconButton>
					</a>
				</div>
				<PostListContainer>
					{
						categoryArticles === 'Loading' ?
							<InfoCard Loading>Loading</InfoCard>
						:
							categoryArticles === 'None' ?
								<InfoCard Icon={HighlightOff}>No Articles Found</InfoCard>
							:
								categoryArticles.map(categoryArticle => {
									if (categoryArticle !== undefined) {
										// [0] is the article title, [1] is its UTC publish time in ms
										const categoryArticleArray = categoryArticle.split('|||');
										const timeString = StringFromDate(categoryArticleArray[1]);
										return <PostButton Date={timeString} key={categoryArticleArray[0]} Category={categoryInfo['name']} CategoryColour={`#${categoryInfo['color']}`} To={`/article/${categoryArticleArray[0].toLowerCase().split(' ').join('-')}`}>{categoryArticleArray[0]}</PostButton>
									} else {
										return null;
									}
								})
					}
					<div id="end">{ earliestPageNum === 'Progress' && categoryArticles !== 'Loading' &&
							<LinearProgress />
					}</div>
				</PostListContainer>
			</ThemeProvider>
		);
	}
}