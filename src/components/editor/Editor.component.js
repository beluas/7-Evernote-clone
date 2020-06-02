import React, { Component } from "react";
import ReactQuill from "react-quill";
import debounce from "../../helper";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./editor.styles";

class Editor extends Component {
	state = {
		text: "",
		title: "",
		id: "",
	};

	componentDidMount() {
		this.setState({
			text: this.props.selectedNote.body,
			title: this.props.selectedNote.title,
			id: this.props.selectedNote.id,
		});
	}

	componentDidUpdate() {
		if (this.props.selectedNote.id !== this.state.id) {
			this.setState({
				text: this.props.selectedNote.body,
				title: this.props.selectedNote.title,
				id: this.props.selectedNote.id,
			});
		}
	}

	updateBody = async (value) => {
		await this.setState({ text: value });
		this.update();
	};

	// Update only when the user stop typing for 1.5 seconds
	update = debounce(() => {
		this.props.noteUpdate(this.state.id, {
			title: this.state.title,
			body: this.state.text,
		});
	}, 1500);

	updateTitle = async (text) => {
		await this.setState({ title: text });
		this.update();
	};

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.editorContainer}>
				<BorderColorIcon className={classes.editIcon}></BorderColorIcon>
				<input
					className={classes.titleInput}
					placeholder="Note title..."
					value={this.state.title ? this.state.title : ""}
					type="text"
					onChange={(e) => this.updateTitle(e.target.value)}
				/>
				<ReactQuill
					onChange={this.updateBody}
					value={this.state.text}
				></ReactQuill>
			</div>
		);
	}
}

export default withStyles(styles)(Editor);
