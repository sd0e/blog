import React from 'react'
import { Helmet } from 'react-helmet';

export default function PageHead({ Title }) {
	const genericTitle = 'Sebastian Doe';
	const description = 'A blog for all things computer programming.';

	return (
		<Helmet>
			<link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png" />
			<link rel="manifest" href="/assets/icons/site.webmanifest" />
			<link rel="shortcut icon" href="/assets/icons/favicon.ico" />
			<meta name="msapplication-TileColor" content="#141313" />
			<meta name="msapplication-config" content="/assets/icons/browserconfig.xml" />
			<meta name="theme-color" content="#141313" />
        	<meta name="title" content={genericTitle} />
        	<meta name="description" content={description} />
			<meta property="og:title" content={Title} />
			<meta property="og:description" content={description} />
			<meta name="twitter:title" content={Title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content="@sebastiandoe5" />
			<meta property="og:site_name" content={genericTitle} />
			<title>{Title}</title>
		</Helmet>
	)
}