const AddToAnalytics = (title, path) => {
	window.gtag('config', 'G-HGSNKWLS5N', {'page_title': title, 'page_location': window.location.href, 'page_path': path});
}

export default AddToAnalytics;