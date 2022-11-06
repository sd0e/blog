import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HighlightOff } from '@mui/icons-material';

import AddToAnalytics from '../scripts/AddToAnalytics';
import PageHead from '../PageHead';
import GeneratePageTitle from '../scripts/GeneratePageTitle';
import Fetch from '../scripts/Fetch';
import InfoCard from '../components/ui/InfoCard';
import MarkdownDisplay from '../components/ui/MarkdownDisplay';
import ArticleTitle from '../components/ui/ArticleTitle';
import ArticleInfoPane from '../components/ui/ArticleInfoPane';

export default function Article() {
	let location = useLocation();

	const articleTitle = 'About';
	const [articleContent, setArticleContent] = useState('Loading');
	
	useEffect(() => {
		AddToAnalytics(`About`, location.pathname);

		Fetch(`/blog/posts/about`).then(articleResult => {
			if (articleResult !== undefined && articleResult !== null) {
				setArticleContent(articleResult);
			} else {
				setArticleContent('Not Found');
			}
		});

		console.log('called');
	}, [location.pathname]);

	return (
		<div>
			{
				articleContent === 'Loading' ?
					<InfoCard Loading>
						<PageHead Title={GeneratePageTitle(articleTitle)} Description="About this blog" />
						Loading
					</InfoCard>
				:
					articleContent === 'Not Found' ?
						<InfoCard Icon={HighlightOff}>
							<PageHead Title={GeneratePageTitle(articleTitle)} Description="About this blog" />
							{articleTitle}
						</InfoCard>
					:
						<div>
							<PageHead
								Title={GeneratePageTitle(articleTitle)}
								Description="About this blog"
							/>
							<ArticleTitle>{articleTitle}</ArticleTitle>
							<ArticleInfoPane Date={articleContent['date']} Category={articleContent['category']} ArticleName={articleTitle} />
							<MarkdownDisplay StoryContent={articleContent['content']} />
						</div>
			}
		</div>
	)
}