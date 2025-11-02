import PropTypes from "prop-types";

export default function TaskEditForm({
	editTitle,
	editDescription,
	setEditTitle,
	setEditDescription,
	onSave,
	onCancel,
}) {
	return (
		<>
			<h4 className="edit-title">Edit your task</h4>
			<div className="edit-mode">
				<div>
					<h4>Edit Title</h4>
					<input
						autoFocus
						type="text"
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
						placeholder="Edit Title"
					/>
				</div>
				<div>
					<h4>Edit Description</h4>
					<input
						type="text"
						value={editDescription}
						onChange={(e) => setEditDescription(e.target.value)}
						placeholder="Edit Description"
					/>
				</div>
				<button onClick={onSave} className="save-edit-mode">
					Save
				</button>
				<button onClick={onCancel} className="cancel-edit-mode">
					Cancel
				</button>
			</div>
		</>
	);
}

TaskEditForm.propTypes = {
	editTitle: PropTypes.string.isRequired,
	editDescription: PropTypes.string.isRequired,
	setEditTitle: PropTypes.func.isRequired,
	setEditDescription: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};
