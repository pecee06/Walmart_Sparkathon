import React from "react";

const Table = ({
	columns,
	data,
	onRowClick,
	className = "",
	emptyMessage = "No data available"
}) => {
	return (
		<div className={`overflow-x-auto ${className}`}>
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
									column.className || ""
								}`}
							>
								{column.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.length === 0 ? (
						<tr>
							<td
								colSpan={columns.length}
								className="px-6 py-4 text-center text-gray-500"
							>
								{emptyMessage}
							</td>
						</tr>
					) : (
						data.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								onClick={() => onRowClick && onRowClick(row)}
								className={onRowClick ? "cursor-pointer hover:bg-gray-50" : ""}
							>
								{columns.map((column, colIndex) => (
									<td
										key={colIndex}
										className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${
											column.className || ""
										}`}
									>
										{column.render
											? column.render(row[column.key], row)
											: row[column.key]}
									</td>
								))}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
