import React from "react";
import Card from "../ui/Card";

const ChartCard = ({ title, subtitle, children, className = "", actions }) => {
	return (
		<Card
			title={title}
			subtitle={subtitle}
			className={className}
		>
			{actions && <div className="flex justify-end mb-4">{actions}</div>}
			<div className="h-64 flex items-center justify-center">
				{children || (
					<div className="text-center text-gray-500">
						<svg
							className="w-16 h-16 mx-auto mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1}
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							/>
						</svg>
						<p>Chart data will be displayed here</p>
					</div>
				)}
			</div>
		</Card>
	);
};

export default ChartCard;
