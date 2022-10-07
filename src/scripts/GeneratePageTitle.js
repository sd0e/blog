const GeneratePageTitle = pageName => {
	return pageName !== 'Home' ? `${pageName} | Seb Doe` : 'Seb Doe';
}

export default GeneratePageTitle;