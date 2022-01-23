import React from 'react';
import ReactDOM from 'react-dom';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import './index.css';
import App from './App';

const firebaseConfig = {
    apiKey: "AIzaSyB0tknfEz5h0SjdptYPazyq1mSc_aeHFKs",
    authDomain: "sebdoe-blog.firebaseapp.com",
    databaseURL: "https://sebdoe-blog-default-rtdb.firebaseio.com",
    projectId: "sebdoe-blog",
    storageBucket: "sebdoe-blog.appspot.com",
    messagingSenderId: "47751545127",
    appId: "1:47751545127:web:034f3d2f96dafe356e2902",
    measurementId: "G-MKRJMWR514"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);