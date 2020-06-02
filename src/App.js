import React from "react";
import "./App.scss";
import Sidebar from "./components/sidebar/Sidebar.component";
import Editor from "./components/editor/Editor.component";

import firebase from "firebase";

class App extends React.Component {
	state = {
		selectedNoteIndex: null,
		selectedNote: null,
		notes: null,
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

	deleteNote = async (note) => {
		const noteIndex = this.state.notes.indexOf(note);
		await this.setState({
			notes: this.state.notes.filter((_note) => _note !== note),
		});
		if (this.state.selectedNoteIndex === noteIndex) {
			this.setState({ selectedNoteIndex: null, selectNote: null });
		} else {
			this.state.notes.length > 1
				? this.selectNote(
						this.state.notes[this.state.selectedNoteIndex - 1],
						this.state.selectedNoteIndex - 1
				  )
				: this.setState({ selectedNoteIndex: null, selectNote: null });
		}

		firebase.firestore().collection("notes").doc(note.id).delete();
	};

	selectNote = (note, index) => {
		this.setState({ selectedNoteIndex: index, selectedNote: note });
	};

	newNote = async (title) => {
		const note = {
			title,
			body: "",
		};

		const newFromDB = await firebase.firestore().collection("notes").add({
			title: note.title,
			body: note.body,
			timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
		});

		const newID = newFromDB.id;
		await this.setState({ notes: [...this.state.notes, note] });
		const newNoteIndex = this.state.notes.indexOf(
			this.state.notes.filter((note) => note.id === newID)[0]
		);

		this.setState({
			selectedNote: this.state.notes[newNoteIndex],
			selectedNoteIndex: newNoteIndex,
		});
	};

	noteUpdate = (id, noteObj) => {
		firebase.firestore().collection("notes").doc(id).update({
			title: noteObj.title,
			body: noteObj.body,
			timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
	};

	render() {
		return (
			<div className="app-container">
				<Sidebar
					notes={this.state.notes}
					selectedNoteIndex={this.state.selectedNoteIndex}
					deleteNote={this.deleteNote}
					selectNote={this.selectNote}
					newNote={this.newNote}
				></Sidebar>

				{this.state.selectedNote ? (
					<Editor
						selectedNote={this.state.selectedNote}
						selectedNoteIndex={this.state.selectedNoteIndex}
						notes={this.state.notes}
						noteUpdate={this.noteUpdate}
					></Editor>
				) : null}
			</div>
		);
	}
}

export default App;
