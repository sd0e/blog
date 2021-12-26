const StringFromDate = date => {
	const articlePublishTimeDate = new Date(Number(date + '000'));
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	return `${articlePublishTimeDate.getDate()} ${months[articlePublishTimeDate.getMonth()]} ${articlePublishTimeDate.getFullYear()}`;
}

export default StringFromDate;