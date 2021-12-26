import { getDatabase, ref, query, orderByKey, limitToLast, onValue } from "firebase/database";

const FetchLast = path => {
	return new Promise(resolve => {
		if (path !== '' && path !== '/') {
			const db = getDatabase();
			const lastElementRef = query(ref(db, path), orderByKey(), limitToLast(1));
			onValue(lastElementRef, snapshot => resolve(snapshot.val()));
		} else {
			resolve('You do not have sufficient permissions to access this information');
		}
	});
}

export default FetchLast;