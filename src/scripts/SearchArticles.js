import { getDatabase, ref, query, orderByChild, startAt, endAt, limitToLast, onValue } from "firebase/database";

const SearchArticles = searchQuery => {
	return new Promise(resolve => {
		const db = getDatabase();
		const lastElementRef = query(ref(db, '/blog/posts'), orderByChild('name'), startAt(searchQuery), endAt("b\uf8ff"), limitToLast(20));
		onValue(lastElementRef, snapshot => resolve(snapshot.val()));
	});
}

export default SearchArticles;