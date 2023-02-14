import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { IconButton, createTheme, ThemeProvider } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

import Information from './Information';
import classes from './MarkdownDisplay.module.css';
import { Link } from 'react-router-dom';

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

	const theme = createTheme({
		palette: {
			mode: 'dark',
		},
	});

	const copy = text => {
		navigator.clipboard.writeText(text).then(() => {
			alert('Text successfully copied', 1);
		}, err => {
			alert('Error copying text', 2);
		});
	}

	return (
		<ReactMarkdown
			children={StoryContent}
			remarkPlugins={[ remarkGfm, remarkMath ]}
			rehypePlugins={[ rehypeKatex ]}
			className={classes.markdownDisplay}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '');
					return !inline && match ? (
						<div style={{ position: 'relative' }}>
							<div style={{ position: 'absolute', width: '100%' }}>
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<ThemeProvider theme={theme}>
										<IconButton style={{ top: '0.5rem', right: '0.5rem' }} onClick={() => copy(children)}>
											<ContentCopy fontSize='small' style={{ fill: 'rgba(242, 242, 242, 0.6)' }} />
										</IconButton>
									</ThemeProvider>
								</div>
							</div>
							<SyntaxHighlighter
								children={String(children).replace(/\n$/, '')}
								style={atomDark}
								language={match[1]}
								PreTag="div"
								{ ...props }
							/>
						</div>
					) : (
						<code className={className} {...props}>
							{children}
						</code>
					)
				},
				p({ children, props }) {
					if (typeof children[0] === 'string') {
						if (children[0].includes('|||')) {
							children = children[0].split('|||');
							return <Information Title={children[0]} Article>{children[1]}</Information>
						} else return <p {...props}>{children}</p>;
					}
					else return <p {...props}>{children}</p>;
				},
				a({ children, props, href }) {
					if (href.charAt(0) === '/') {
						return <Link to={href} {...props}>{children}</Link>
					} else return <a href={href} {...props}>{children}</a>
				}
			}}
		/>
	)
}