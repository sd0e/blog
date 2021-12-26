import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HighlightOff } from '@mui/icons-material';

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
	let history = useHistory();
	
	const categoryID = history.location.pathname.split('/').pop().toLowerCase();

	const [categoryInfo, setCategoryInfo] = useState('Loading');
	const [categoryArticles, setCategoryArticles] = useState('Loading');
	
	useEffect(() => {
		AddToAnalytics(`Category | ${categoryID}`, history.location.pathname);

		Fetch(`/blog/categories/${categoryID}/info`).then(categoryDisplayInfo => {
			if (categoryDisplayInfo !== null && categoryDisplayInfo !== undefined) {
				setCategoryInfo(categoryDisplayInfo);
			} else {
				setCategoryInfo('Does Not Exist');
			}
		});

		FetchLast(`/blog/categories/${categoryID}/articles/page`).then(pageInfo => {
			if (pageInfo !== undefined && pageInfo !== null) {
				setCategoryArticles(pageInfo[Object.keys(pageInfo)].reverse());
			} else {
				setCategoryArticles('None');
			}
		});
	}, []);

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
			<div>
				<PageHead Title={GeneratePageTitle(categoryInfo['name'])} />
				<BrowseTopHeading>Posts Tagged With</BrowseTopHeading>
				<BrowseCategoryHeading colour={categoryInfo['color']}>{categoryInfo['name']}</BrowseCategoryHeading>
				<PostListContainer>
					{
						categoryArticles === 'Loading' ?
							<InfoCard Loading>Loading</InfoCard>
						:
							categoryArticles === 'None' ?
								<InfoCard Icon={HighlightOff}>No Articles Found</InfoCard>
							:
								categoryArticles.map(categoryArticle => {
									// [0] is the article title, [1] is its UTC publish time in ms
									const categoryArticleArray = categoryArticle.split('|||');
									const timeString = StringFromDate(categoryArticleArray[1]);
									return <PostButton Date={timeString} key={categoryArticleArray[0]} Category={categoryInfo['name']} CategoryColour={`#${categoryInfo['color']}`} Click={() => {
										history.push(`/article/${categoryArticleArray[0].toLowerCase().split(' ').join('-')}`);
									}}>{categoryArticleArray[0]}</PostButton>
								})
					}
				</PostListContainer>
			</div>
		);
	}
}