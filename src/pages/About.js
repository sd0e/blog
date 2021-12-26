import React, { useEffect } from 'react';
import AddToAnalytics from '../scripts/AddToAnalytics';

export default function About() {
	useEffect(() => {
		AddToAnalytics('About', '/');
	}, []);

	return (
		<div>
			About
		</div>
	)
}