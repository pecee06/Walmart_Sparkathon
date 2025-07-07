import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

const QueueStatus = ({
	store,
	queuePosition = null,
	estimatedWaitTime = null,
	onJoinQueue,
	onLeaveQueue,
	isInQueue = false
}) => {
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [timeElapsed, setTimeElapsed] = useState(0);
	const [isTimerRunning, setIsTimerRunning] = useState(false);

	useEffect(() => {
		let interval;
		if (isInQueue && isTimerRunning) {
			interval = setInterval(() => {
				setTimeElapsed((prev) => prev + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [isInQueue, isTimerRunning]);

	const formatTime = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const handleJoinQueue = () => {
		setShowConfirmModal(true);
	};

	const handleConfirmJoin = () => {
		onJoinQueue();
		setShowConfirmModal(false);
		setIsTimerRunning(true);
		setTimeElapsed(0);
	};

	const handleLeaveQueue = () => {
		onLeaveQueue();
		setIsTimerRunning(false);
		setTimeElapsed(0);
	};

	const getQueueStatusColor = () => {
		if (!isInQueue) return "bg-gray-100 text-gray-800";
		if (queuePosition <= 3) return "bg-green-100 text-green-800";
		if (queuePosition <= 8) return "bg-yellow-100 text-yellow-800";
		return "bg-red-100 text-red-800";
	};

	return (
		<div className="max-w-2xl mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">{store?.name}</h1>
				<p className="text-lg text-gray-600">Queue Management System</p>
			</div>

			<div className="space-y-6">
				{/* Store Info */}
				<Card
					title="Store Information"
					subtitle={store?.location}
				>
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<span className="text-gray-600">Available Counters:</span>
							<p className="font-medium text-gray-900">
								{store?.counters || 0}
							</p>
						</div>
						<div>
							<span className="text-gray-600">Store Status:</span>
							<p className="font-medium text-gray-900 capitalize">
								{store?.status || "Unknown"}
							</p>
						</div>
					</div>
				</Card>

				{/* Queue Status */}
				<Card title="Queue Status">
					{!isInQueue ? (
						<div className="text-center space-y-4">
							<div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
								<span className="text-2xl">⏰</span>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									Not in Queue
								</h3>
								<p className="text-gray-600 mb-4">
									Click the button below to join the queue when you're ready to
									checkout
								</p>
								<Button
									variant="primary"
									size="lg"
									onClick={handleJoinQueue}
								>
									Join Queue
								</Button>
							</div>
						</div>
					) : (
						<div className="space-y-6">
							{/* Position and Timer */}
							<div className="text-center">
								<div
									className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${getQueueStatusColor()}`}
								>
									<span className="mr-2">🎯</span>
									Position #{queuePosition}
								</div>
							</div>

							{/* Timer */}
							<div className="text-center">
								<div className="bg-gray-50 rounded-lg p-4">
									<p className="text-sm text-gray-600 mb-1">Time in Queue</p>
									<p className="text-3xl font-bold text-gray-900">
										{formatTime(timeElapsed)}
									</p>
								</div>
							</div>

							{/* Estimated Wait Time */}
							{estimatedWaitTime && (
								<div className="text-center">
									<div className="bg-blue-50 rounded-lg p-4">
										<p className="text-sm text-blue-600 mb-1">
											Estimated Wait Time
										</p>
										<p className="text-xl font-semibold text-blue-900">
											{estimatedWaitTime} minutes
										</p>
									</div>
								</div>
							)}

							{/* Progress Bar */}
							<div className="space-y-2">
								<div className="flex justify-between text-sm text-gray-600">
									<span>Queue Progress</span>
									<span>
										{queuePosition} of ~{Math.max(queuePosition + 5, 10)}
									</span>
								</div>
								<div className="w-full bg-gray-200 rounded-full h-2">
									<div
										className="bg-primary-500 h-2 rounded-full transition-all duration-300"
										style={{
											width: `${Math.min(
												(queuePosition / Math.max(queuePosition + 5, 10)) * 100,
												100
											)}%`
										}}
									/>
								</div>
							</div>

							{/* Action Button */}
							<div className="text-center">
								<Button
									variant="danger"
									size="lg"
									onClick={handleLeaveQueue}
								>
									Leave Queue
								</Button>
							</div>
						</div>
					)}
				</Card>

				{/* Instructions */}
				<Card
					title="How it Works"
					subtitle="Queue system instructions"
				>
					<div className="space-y-3 text-sm text-gray-600">
						<div className="flex items-start space-x-3">
							<span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
								1
							</span>
							<p>Click "Join Queue" when you're almost done shopping</p>
						</div>
						<div className="flex items-start space-x-3">
							<span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
								2
							</span>
							<p>Wait for your turn - you'll be notified when it's your time</p>
						</div>
						<div className="flex items-start space-x-3">
							<span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
								3
							</span>
							<p>Go to the assigned counter when called</p>
						</div>
						<div className="flex items-start space-x-3">
							<span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
								4
							</span>
							<p>Complete your purchase with the cashier</p>
						</div>
					</div>
				</Card>
			</div>

			{/* Confirmation Modal */}
			<Modal
				isOpen={showConfirmModal}
				onClose={() => setShowConfirmModal(false)}
				title="Join Queue"
				size="sm"
			>
				<div className="space-y-4">
					<p className="text-gray-600">
						Are you sure you want to join the queue? This will start a timer and
						you'll be notified when it's your turn.
					</p>
					<div className="flex justify-end space-x-3">
						<Button
							variant="secondary"
							onClick={() => setShowConfirmModal(false)}
						>
							Cancel
						</Button>
						<Button
							variant="primary"
							onClick={handleConfirmJoin}
						>
							Join Queue
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default QueueStatus;
