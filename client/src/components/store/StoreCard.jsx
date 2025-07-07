import React from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";

const StoreCard = ({
	store,
	onEdit,
	onDelete,
	onViewDetails,
	showActions = true
}) => {
	const getStatusColor = (status) => {
		switch (status) {
			case "active":
				return "status-active";
			case "inactive":
				return "status-inactive";
			case "maintenance":
				return "status-pending";
			default:
				return "status-inactive";
		}
	};

	return (
		<Card className="hover:shadow-md transition-shadow duration-200">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<div className="flex items-center space-x-3 mb-3">
						<div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
							<span className="text-primary-600 text-xl">🏪</span>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-900">
								{store.name}
							</h3>
							<p className="text-sm text-gray-600">{store.location}</p>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<p className="text-xs text-gray-500 uppercase tracking-wide">
								Counters
							</p>
							<p className="text-sm font-medium text-gray-900">
								{store.counters}
							</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 uppercase tracking-wide">
								Cashiers
							</p>
							<p className="text-sm font-medium text-gray-900">
								{store.cashiers}
							</p>
						</div>
						<div>
							<p className="text-xs text-gray-500 uppercase tracking-wide">
								Status
							</p>
							<span className={`status-badge ${getStatusColor(store.status)}`}>
								{store.status}
							</span>
						</div>
						<div>
							<p className="text-xs text-gray-500 uppercase tracking-wide">
								Revenue
							</p>
							<p className="text-sm font-medium text-gray-900">
								${store.revenue?.toLocaleString() || "0"}
							</p>
						</div>
					</div>

					{store.description && (
						<p className="text-sm text-gray-600 mb-4">{store.description}</p>
					)}
				</div>
			</div>

			{showActions && (
				<div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
					<Button
						variant="outline"
						size="sm"
						onClick={() => onViewDetails(store)}
					>
						View Details
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => onEdit(store)}
					>
						Edit
					</Button>
					<Button
						variant="danger"
						size="sm"
						onClick={() => onDelete(store.id)}
					>
						Delete
					</Button>
				</div>
			)}
		</Card>
	);
};

export default StoreCard;
