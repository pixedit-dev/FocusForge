import { RxLapTimer } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";
import { VscSaveAs } from "react-icons/vsc";
import { useState } from "react";

export default function CountdownTimer({
	task,
	isOpen,
	setIsOpen,
	setCountdown,
	resetCountdown,
}) {
	const [hour, setHour] = useState("");
	const [min, setMin] = useState("");
	const getRemainingTime = (targetTime) => {
		const now = Date.now();
		const diff = targetTime - now;

		if (diff <= 0) return "Time's up!";
		const minutes = Math.floor(diff / 60000);
		const seconds = Math.floor((diff % 60000) / 1000);
		return `${minutes}m ${seconds}s`;
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
								onChange={(e) => setHour(e.target.value)}
							/>
						</div>
						<div>
							<label>Min:</label>
							<input
								type="text"
								value={min}
								onChange={(e) => setMin(e.target.value)}
							/>
						</div>
					</div>
				)}

				<div className="timer-btns">
					<button
						className="save-timer"
						onClick={() => {
							setCountdown(task.id, Number(hour), Number(min));
							setHour("");
							setMin("");
						}}>
						<VscSaveAs style={{ marginTop: "2px" }} /> Save
					</button>

					<button
						className="reset-timer"
						onClick={() => resetCountdown(task.id)}>
						No Time Limits
					</button>
				</div>
			</div>
		</div>
	);
}
