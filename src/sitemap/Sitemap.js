import React from 'react';

import { Route } from 'react-router';

export default (
	<Route>
		<Route path="/about" />
		<Route path="/article/:id" />
		<Route path="/category/:id" />
	</Route>
)