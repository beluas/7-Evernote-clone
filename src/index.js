import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAFfrTIDWjrZTmcJpg0iNEciwS3Kn0P6Yw",
	authDomain: "evernote-clone-ddad6.firebaseapp.com",
	databaseURL: "https://evernote-clone-ddad6.firebaseio.com",
	projectId: "evernote-clone-ddad6",
	storageBucket: "evernote-clone-ddad6.appspot.com",
	messagingSenderId: "729593959433",
	appId: "1:729593959433:web:53b4d6b23fda2cd0ca14d8",
	measurementId: "G-20BHYY5VGX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
