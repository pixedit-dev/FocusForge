import { RxLapTimer } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";
import { VscSaveAs } from "react-icons/vsc";
import { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { TaskContext } from "../../context/TaskContext";

export default function CountdownTimer({ task }) {
	const [isOpen, setIsOpen] = useState(false);
	const [hour, setHour] = useState("");
	const [min, setMin] = useState("");
	const { setCountdown, resetCountdown } = useContext(TaskContext);
	const [, forceUpdate] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => forceUpdate((n) => n + 1), 1000);
		return () => clearInterval(interval);
	}, []);

	const getRemainingTime = (targetTime) => {
		const now = Date.now();
		const diff = targetTime - now;

		if (diff <= 0) return "Time's up!";
		const minutes = Math.floor(diff / 60000);
		const seconds = Math.floor((diff % 60000) / 1000);
		return `${minutes}m ${seconds}s`;
	};

	const handleSave = () => {
		if (!hour && !min) return;
		setCountdown(task.id, Number(hour), Number(min));
		setHour("");
		setMin("");
	};

	const handleReset = () => {
		resetCountdown(task.id);
	};

	return (
		<div className="time-management-section">
			<button
				className="timer-section-icons"
				onClick={() => setIsOpen(!isOpen)}>
				<RxLapTimer />
				<FaAngleDown
					className={`timer-section-oppener ${isOpen ? "rotated" : ""}`}
				/>
			</button>

			<div
				className={`time-management-control ${
					isOpen ? "dropdown-open" : "dropdown-closed"
				}`}>
				{task.time.active && task.time.targetTime ? (
					<p className="countdown-display">
						Countdown: {getRemainingTime(task.time.targetTime)}
					</p>
				) : (
					<div className="time-management-inps">
						<div>
							<label>Hour:</label>
							<input
								type="text"
								value={hour}
								maxLength="2"
								onChange={(e) => setHour(e.target.value.replace(/\D/, ""))}
							/>
						</div>
						<div>
							<label>Min:</label>
							<input
								type="text"
								value={min}
								maxLength="2"
								onChange={(e) => setMin(e.target.value.replace(/\D/, ""))}
							/>
						</div>
					</div>
				)}

				<div className="timer-btns">
					{!task.time.active && (
						<button className="save-timer" onClick={handleSave}>
							<VscSaveAs style={{ marginTop: "2px" }} /> Save
						</button>
					)}

					{(task.time.active || task.time.hour > 0 || task.time.min > 0) && (
						<button className="reset-timer" onClick={handleReset}>
							Reset
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

CountdownTimer.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.number.isRequired,
		time: PropTypes.shape({
			hour: PropTypes.number,
			min: PropTypes.number,
			active: PropTypes.bool,
			targetTime: PropTypes.number,
		}),
	}).isRequired,
};
