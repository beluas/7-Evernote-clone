import React from "react";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar.component";
import Editor from "./components/editor/Editor.component";

import firebase from "firebase";

class App extends React.Component {
	state = {
		selectedNoteIndex: null,
		selectedNote: null,
		notes: [],
	};

	componentDidMount = () => {
		// function inside onSnapshot will be automatically called when something inside notes is updated
		firebase
			.firestore()
			.collection("notes")
			.onSnapshot((serverUpdate) => {
				const notes = serverUpdate.docs.map((_doc) => {
					const data = _doc.data(); // grab the data from the doc
					data["id"] = _doc.id;
					return data;
				});
				console.log(notes);
				this.setState({ notes });
			});
	};

	render() {
		return (
			<div className="app-container">
				<Sidebar
					notes={this.state.notes}
					selectedNoteIndex={this.state.selectedNoteIndex}
				></Sidebar>
				<Editor></Editor>
			</div>
		);
	}
}

export default App;
