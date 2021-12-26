import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import AddToAnalytics from '../scripts/AddToAnalytics';
import PageHead from '../PageHead';
import GeneratePageTitle from '../scripts/GeneratePageTitle';
import BrowseTopHeading from '../components/ui/BrowseTopHeading';
import PostListContainer from '../components/layout/PostListContainer';
import PostButton from '../components/ui/PostButton';
import StringFromDate from '../scripts/StringFromDate';
import Fetch from '../scripts/Fetch';
import FetchLast from '../scripts/FetchLast';
import InfoCard from '../components/ui/InfoCard';

export default function Home() {
	let history = useHistory();
	
	const [categoryArticles, setCategoryArticles] = useState('Loading');

	useEffect(() => {
		AddToAnalytics('Home', '/');

		FetchLast(`/blog/recent/page`).then(pageInfo => {
			setCategoryArticles(pageInfo[Object.keys(pageInfo)].reverse());
		});
	}, []);

	return (
		<div>
			<PageHead Title={GeneratePageTitle('Home')} />
			<BrowseTopHeading>Recent Posts</BrowseTopHeading>
			<PostListContainer>
				{
					categoryArticles === 'Loading' ?
						<InfoCard Loading>Loading</InfoCard>
					:
						categoryArticles.map(categoryArticle => {
							// [0] is the article title, [1] is its UTC publish time in ms, [2] is the category name, [3] is the category colour
							const categoryArticleArray = categoryArticle.split('|||');
							const timeString = StringFromDate(categoryArticleArray[1]);
							return <PostButton Date={timeString} key={categoryArticleArray[0]} Category={categoryArticleArray[2]} CategoryColour={`#${categoryArticleArray[3]}`} Click={() => {
								history.push(`/article/${categoryArticleArray[0].toLowerCase().split(' ').join('-')}`);
							}}>{categoryArticleArray[0]}</PostButton>
						})
				}
			</PostListContainer>
		</div>
	);
}