import React from "react";

const StatsCard = ({
	title,
	value,
	change,
	changeType = "positive",
	icon,
	color = "primary"
}) => {
	const colors = {
		primary: "bg-primary-500",
		success: "bg-green-500",
		warning: "bg-yellow-500",
		danger: "bg-red-500",
		info: "bg-blue-500"
	};

	const iconColors = {
		primary: "text-primary-500",
		success: "text-green-500",
		warning: "text-yellow-500",
		danger: "text-red-500",
		info: "text-blue-500"
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600">{title}</p>
					<p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
					{change && (
						<div className="flex items-center mt-2">
							<span
								className={`text-sm font-medium ${
									changeType === "positive" ? "text-green-600" : "text-red-600"
								}`}
							>
								{changeType === "positive" ? "+" : ""}
								{change}
							</span>
							<span className="text-sm text-gray-500 ml-1">
								from last month
							</span>
						</div>
					)}
				</div>
				<div
					className={`w-12 h-12 ${colors[color]} rounded-lg flex items-center justify-center`}
				>
					<span className="text-white text-xl">{icon}</span>
				</div>
			</div>
		</div>
	);
};

export default StatsCard;
