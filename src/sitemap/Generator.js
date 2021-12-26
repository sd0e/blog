require('babel-register')({
	presets: ['react', 'es2015'],
});

const database = require('firebase/database');
const getDatabase = database.getDatabase;
const ref = database.ref;
const onValue = database.onValue;

const app = require('firebase/app');

app.initializeApp({
    apiKey: "AIzaSyB0tknfEz5h0SjdptYPazyq1mSc_aeHFKs",
    authDomain: "sebdoe-blog.firebaseapp.com",
    databaseURL: "https://sebdoe-blog-default-rtdb.firebaseio.com",
    projectId: "sebdoe-blog",
    storageBucket: "sebdoe-blog.appspot.com",
    messagingSenderId: "47751545127",
    appId: "1:47751545127:web:034f3d2f96dafe356e2902",
    measurementId: "G-MKRJMWR514"
});

const Fetch = path => {
	return new Promise(resolve => {
		if (path !== '' && path !== '/') {
			const db = getDatabase();
			onValue(ref(db, path), snapshot => {
				resolve(snapshot.val())
			});
		} else {
			resolve('You do not have sufficient permissions to access this information');
		}
	});
}

const Router = require('./Sitemap').default;
const Sitemap = require('react-router-sitemap').default;

const generate = async () => {
	let postIds = [];
	let categoryIds = [];

	const posts = await(Fetch('/blog/posts'));

	const postKeys = Object.keys(posts);

	postKeys.forEach(postKey => {
		postIds.push({ id: postKey });
	});

	const categories = await(Fetch('/blog/categories'));

	const categoryKeys = Object.keys(categories);

	categoryKeys.forEach(categoryKey => {
		categoryIds.push({ id: categoryKey });
	});

	const paramsConfig = {
		'/article/:id': postIds,
		'/category/:id': categoryIds,
	}

	return (
		new Sitemap(Router)
			.applyParams(paramsConfig)
			.build('https://sebdoe.com')
			.save('./public/sitemap.xml')
	);
}

generate().then(() => process.exit());