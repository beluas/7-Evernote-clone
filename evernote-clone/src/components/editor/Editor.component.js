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

	updateBody = async (value) => {
		await this.setState({ text: value });
		this.update();
	};

	// Update only when the user stop typing for 1.5 seconds
	update = debounce(() => {
		console.log("updating db");
	}, 1500);

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.editorContainer}>
				<ReactQuill
					onChange={this.updateBody}
					value={this.state.text}
				></ReactQuill>
			</div>
		);
	}
}

export default withStyles(styles)(Editor);
