import React, { Component } from "react";
import List from "@material-ui/core/List";
import { withStyles } from "@material-ui/core/styles";
import { Divider, Button } from "@material-ui/core";
import SidebarItem from "../sidebar-item/SidebarItem.component";
import styles from "./sidebar.styles";

class Sidebar extends Component {
	state = {
		addingNote: false,
		title: null,
	};

	newNoteBtnClick = () => {
		this.setState({ title: null, addingNote: !this.state.addingNote });
	};

	updateTitle = (text) => {
		this.setState({ title: text });
	};

	newNote = () => {
		this.props.newNote(this.state.title);
		this.setState({ title: null, addingNote: false });
	};

	selectNote = (note, index) => {
		this.props.selectNote(note, index);
	};
	deleteNote = (note) => {
		this.props.deleteNote(note);
	};

	render() {
		const { notes, classes, selectedNoteIndex } = this.props;
		if (notes) {
			return (
				<div className={classes.sidebarContainer}>
					<Button
						onClick={this.newNoteBtnClick}
						className={classes.newNoteBtn}
					>
						{this.state.addingNote ? "Cancel" : "Add Note"}
					</Button>
					{this.state.addingNote ? (
						<div>
							<input
								type="text"
								className={classes.newNoteInput}
								placeholder="Enter note title"
								onKeyUp={(e) =>
									this.updateTitle(e.target.value)
								}
							/>
							<Button
								onClick={this.newNote}
								className={classes.newNoteSubmitBtn}
							>
								Submit Note
							</Button>
						</div>
					) : null}

					<List>
						{notes.map((note, i) => {
							return (
								<div key={i}>
									<SidebarItem
										note={note}
										index={i}
										selectedNoteIndex={selectedNoteIndex}
										selectNote={this.selectNote}
										deleteNote={this.deleteNote}
									/>
									<Divider></Divider>
								</div>
							);
						})}
					</List>
				</div>
			);
		} else {
			return <div>Add a Note...</div>;
		}
	}
}

export default withStyles(styles)(Sidebar);
