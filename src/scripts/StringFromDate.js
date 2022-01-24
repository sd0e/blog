const StringFromDate = (date, SEO) => {
	const articlePublishTimeDate = new Date(Number(date + '000'));

	if (SEO) {
		return `${articlePublishTimeDate.getFullYear()}-${articlePublishTimeDate.getMonth() + 1}-${articlePublishTimeDate.getDate()}`
	} else {
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		return `${articlePublishTimeDate.getDate()} ${months[articlePublishTimeDate.getMonth()]} ${articlePublishTimeDate.getFullYear()}`;
	}
}

export default StringFromDate;