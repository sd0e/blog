import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LinearProgress, ThemeProvider, createTheme } from '@mui/material';

import AddToAnalytics from '../scripts/AddToAnalytics';
import PageHead from '../PageHead';
import GeneratePageTitle from '../scripts/GeneratePageTitle';
import PostButton from '../components/ui/PostButton';
import StringFromDate from '../scripts/StringFromDate';
import Fetch from '../scripts/Fetch';
import FetchLast from '../scripts/FetchLast';
import InfoCard from '../components/ui/InfoCard';

export default function Home() {
	let navigate = useNavigate();
	
	const [categoryArticles, setCategoryArticles] = useState('Loading');
	const [earliestPageNum, setEarliestPageNum] = useState('Progress');

	useEffect(() => {
		AddToAnalytics('Home', '/');

		FetchLast(`/blog/recent/page`).then(pageInfo => {
			setEarliestPageNum(Number(Object.keys(pageInfo)[0]));
			setCategoryArticles(pageInfo[Object.keys(pageInfo)].reverse());
			const el = document.getElementById('end');
			var rect = el.getBoundingClientRect();
			var elemTop = rect.top;
			var elemBottom = rect.bottom;
			const bottom = (elemTop >= 0) && (elemBottom <= window.innerHeight);
			if (bottom) window['bottomReached']();
		});
	}, []);

	window['bottomReached'] = () => {
		if (earliestPageNum !== 'Progress' && earliestPageNum > 1) {
			setEarliestPageNum('Progress');
			Fetch(`/blog/recent/page/${earliestPageNum - 1}`).then(articles => {
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
		},
	});

	return (
		<div>
			<PageHead Title={GeneratePageTitle('Home')} />
			{
				categoryArticles === 'Loading' ?
					<InfoCard Loading>Loading</InfoCard>
				:
					categoryArticles.map(categoryArticle => {
						// [0] is the article title, [1] is its UTC publish time in ms, [2] is the category name, [3] is the category colour
						const categoryArticleArray = categoryArticle.split('|||');
						const timeString = StringFromDate(categoryArticleArray[1]);
						return <PostButton Date={timeString} key={categoryArticleArray[0]} Category={categoryArticleArray[2]} CategoryColour={`#${categoryArticleArray[3]}`} To={`/article/${categoryArticleArray[0].toLowerCase().split(' ').join('-')}`}>{categoryArticleArray[0]}</PostButton>
					})
			}
			<div id="end">{ earliestPageNum === 'Progress' && categoryArticles !== 'Loading' &&
				<ThemeProvider theme={theme}>
					<LinearProgress />
				</ThemeProvider>
			}</div>
		</div>
	);
}