import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HighlightOff } from '@mui/icons-material';

import AddToAnalytics from '../scripts/AddToAnalytics';
import PageHead from '../PageHead';
import GeneratePageTitle from '../scripts/GeneratePageTitle';
import Fetch from '../scripts/Fetch';
import InfoCard from '../components/ui/InfoCard';
import MarkdownDisplay from '../components/ui/MarkdownDisplay';
import ArticleTitle from '../components/ui/ArticleTitle';
import ArticleInfoPane from '../components/ui/ArticleInfoPane';
import SearchArticles from '../scripts/SearchArticles';

export default function Article() {
	let history = useHistory();
	
	const words = history.location.pathname.split('/').pop().split('-');

	var completedWord = '';

	for (let wordIdx = 0; wordIdx < words.length; wordIdx++) {
		const word = words[wordIdx];
		completedWord += word[0].toUpperCase() + word.substr(1).toLowerCase() + ' ';
	}

	completedWord.slice(0, -1);

	const [articleTitle, setArticleTitle] = useState(completedWord);
	const [articleContent, setArticleContent] = useState('Loading');
	
	useEffect(() => {
		AddToAnalytics(`Article | ${words.join('-')}`, history.location.pathname);

		Fetch(`/blog/posts/${words.join('-')}`).then(articleResult => {
			if (articleResult !== undefined && articleResult !== null) {
				setArticleContent(articleResult);
				setArticleTitle(articleResult['name']);
			} else {
				setArticleContent('Not Found');
				setArticleTitle('Article Not Found');
			}
		});
	}, []);

	return (
		<div>
			{
				articleContent === 'Loading' ?
					<InfoCard Loading>
						<PageHead Title={GeneratePageTitle(articleTitle)} />
						Loading
					</InfoCard>
				:
					articleContent === 'Not Found' ?
						<InfoCard Icon={HighlightOff}>
							<PageHead Title={GeneratePageTitle(articleTitle)} />
							{articleTitle}
						</InfoCard>
					:
						<div>
							<PageHead
								Title={GeneratePageTitle(articleTitle)}
							/>
							<ArticleTitle>{articleTitle}</ArticleTitle>
							<ArticleInfoPane Date={articleContent['date']} Category={articleContent['category']} ArticleName={articleTitle} />
							<MarkdownDisplay StoryContent={articleContent['content']} />
						</div>
			}
		</div>
	)
}