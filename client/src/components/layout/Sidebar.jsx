import React from "react";

const Sidebar = ({ userRole, currentPath, onNavigate }) => {
	const menuItems = {
		SUPER_ADMIN: [
			{ path: "/dashboard", label: "Dashboard", icon: "📊" },
			{ path: "/stores", label: "Manage Stores", icon: "🏪" },
			{ path: "/store-admins", label: "Store Admins", icon: "👥" },
			{ path: "/reports", label: "AI Reports", icon: "📈" },
			{ path: "/analytics", label: "Analytics", icon: "📊" }
		],
		STORE_ADMIN: [
			{ path: "/dashboard", label: "Dashboard", icon: "📊" },
			{ path: "/inventory", label: "Inventory", icon: "📦" },
			{ path: "/cashiers", label: "Manage Cashiers", icon: "💼" },
			{ path: "/sales", label: "Sales Records", icon: "💰" },
			{ path: "/predictions", label: "ML Predictions", icon: "🤖" }
		],
		CASHIER: [
			{ path: "/dashboard", label: "Dashboard", icon: "📊" },
			{ path: "/counter", label: "Counter Status", icon: "🖥️" },
			{ path: "/cart", label: "Customer Cart", icon: "🛒" },
			{ path: "/billing", label: "Billing", icon: "🧾" }
		],
		CUSTOMER: [
			{ path: "/store-select", label: "Select Store", icon: "🏪" },
			{ path: "/queue", label: "Queue Status", icon: "⏰" }
		]
	};

	const items = menuItems[userRole] || [];

	return (
		<div className="w-64 bg-white shadow-lg h-full">
			<div className="p-6">
				<div className="flex items-center space-x-3">
					<div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
						<span className="text-white font-bold text-sm">W</span>
					</div>
					<h1 className="text-xl font-bold text-gray-900">Walmart</h1>
				</div>
			</div>

			<nav className="mt-6">
				<div className="px-3">
					{items.map((item) => (
						<button
							key={item.path}
							onClick={() => onNavigate(item.path)}
							className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
								currentPath === item.path
									? "bg-primary-50 text-primary-700 border-r-2 border-primary-500"
									: "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
							}`}
						>
							<span className="text-lg">{item.icon}</span>
							<span>{item.label}</span>
						</button>
					))}
				</div>
			</nav>

			<div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
				<div className="flex items-center space-x-3">
					<div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
						<span className="text-gray-600 text-sm font-medium">
							{userRole.charAt(0)}
						</span>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-900">
							{userRole.replace("_", " ")}
						</p>
						<p className="text-xs text-gray-500">User</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
