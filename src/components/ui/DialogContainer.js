import React from 'react';

import DialogBox from '../ui/DialogBox';

export default function DialogContainer({ alerts, removeDialogBox }) {
	Object.keys(alerts).forEach(alertKey => {
		if (new Date().getTime() - Number(alertKey) >= 5000) {
			delete alerts[alertKey];
		}
	});

	return (
		<div>
			{
				Object.keys(alerts).map(alertKey => {
					const alert = alerts[alertKey];
					return <DialogBox text={alert.message} severity={alert.severity} OnClose={() => removeDialogBox(alertKey)} key={alertKey} />;
				})
			}
		</div>
	)
}