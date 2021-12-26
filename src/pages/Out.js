import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AddToAnalytics from '../scripts/AddToAnalytics';

import PageHead from '../PageHead';
import GeneratePageTitle from '../scripts/GeneratePageTitle';

export default function Out() {
	let history = useHistory();
	
	const campaignID = history.location.pathname.split('/').pop();
	
	useEffect(() => {
		AddToAnalytics(`Campaign | ${campaignID}`, history.location.pathname);
	}, []);

	return (
		<div>
			<PageHead Title={GeneratePageTitle('Leaving Site')} />
			Out
		</div>
	)
}