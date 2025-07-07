import React, { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const CounterStatus = ({
	counterNumber,
	currentStatus = "vacant",
	onStatusChange,
	currentCustomer = null
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const statusConfig = {
		vacant: {
			label: "Vacant",
			color: "bg-green-100 text-green-800",
			icon: "🟢",
			buttonText: "Mark as Occupied",
			buttonVariant: "success"
		},
		occupied: {
			label: "Occupied",
			color: "bg-red-100 text-red-800",
			icon: "🔴",
			buttonText: "Mark as Vacant",
			buttonVariant: "danger"
		},
		busy: {
			label: "Busy",
			color: "bg-yellow-100 text-yellow-800",
			icon: "🟡",
			buttonText: "Mark as Vacant",
			buttonVariant: "warning"
		}
	};

	const config = statusConfig[currentStatus];

	const handleStatusChange = async () => {
		setIsLoading(true);
		try {
			const newStatus = currentStatus === "vacant" ? "occupied" : "vacant";
			await onStatusChange(counterNumber, newStatus);
		} catch (error) {
			console.error("Error changing counter status:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card
			title={`Counter ${counterNumber}`}
			subtitle="Manage counter availability"
			className="max-w-md"
		>
			<div className="space-y-6">
				{/* Current Status */}
				<div className="text-center">
					<div
						className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${config.color}`}
					>
						<span className="mr-2">{config.icon}</span>
						{config.label}
					</div>
				</div>

				{/* Current Customer Info */}
				{currentCustomer && (
					<div className="bg-gray-50 rounded-lg p-4">
						<h4 className="text-sm font-medium text-gray-900 mb-2">
							Current Customer
						</h4>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-sm text-gray-600">Queue Position:</span>
								<span className="text-sm font-medium text-gray-900">
									#{currentCustomer.queuePosition}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-gray-600">Items in Cart:</span>
								<span className="text-sm font-medium text-gray-900">
									{currentCustomer.cartItems?.length || 0}
								</span>
							</div>
							<div className="flex justify-between">
								<span className="text-sm text-gray-600">Wait Time:</span>
								<span className="text-sm font-medium text-gray-900">
									{currentCustomer.waitTime || "0"} min
								</span>
							</div>
						</div>
					</div>
				)}

				{/* Action Button */}
				<div className="text-center">
					<Button
						variant={config.buttonVariant}
						size="lg"
						onClick={handleStatusChange}
						disabled={isLoading}
						className="w-full"
					>
						{isLoading ? "Updating..." : config.buttonText}
					</Button>
				</div>

				{/* Quick Actions */}
				<div className="border-t border-gray-200 pt-4">
					<h4 className="text-sm font-medium text-gray-900 mb-3">
						Quick Actions
					</h4>
					<div className="grid grid-cols-2 gap-2">
						<Button
							variant="outline"
							size="sm"
							onClick={() => onStatusChange(counterNumber, "busy")}
							disabled={isLoading}
						>
							Mark Busy
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => onStatusChange(counterNumber, "vacant")}
							disabled={isLoading}
						>
							Mark Vacant
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CounterStatus;
