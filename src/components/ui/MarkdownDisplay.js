import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function MarkdownDisplay({ StoryContent }) {
	const campaignRegex = /\[out\|[a-z0-9-_ ]+\|[^\]]*\]/gi;
	const matchesRegex = campaignRegex.test(StoryContent);

	if (matchesRegex) {
		const campaignMatches = StoryContent.match(campaignRegex);
		campaignMatches.forEach(campaignMatch => {
			const splitContent = campaignMatch.split('[out|')[1].split(']')[0].split('|');
			const id = splitContent[0];
			const displayText = splitContent[1];
			StoryContent = StoryContent.replace(campaignMatch, `[${displayText}](/out/${id})`);
		});
	}

	return (
		<ReactMarkdown
			children={StoryContent}
			remarkPlugins={[ remarkGfm ]}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						<SyntaxHighlighter
							children={String(children).replace(/\n$/, '')}
							style={atomDark}
							language={match[1]}
							PreTag="div"
							{ ...props }
						/>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					)
				}
			}}
		/>
	)
}