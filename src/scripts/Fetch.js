import { getDatabase, ref, onValue } from "firebase/database";

const Fetch = path => {
	return new Promise(resolve => {
		if (path !== '' && path !== '/') {
			const db = getDatabase();
			onValue(ref(db, path), snapshot => resolve(snapshot.val()));
		} else {
			resolve('You do not have sufficient permissions to access this information');
		}
	});
}

export default Fetch;