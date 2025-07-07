import React, { useState } from "react";
import Button from "../ui/Button";

const Header = ({ userRole, notifications = [], onLogout }) => {
	const [showNotifications, setShowNotifications] = useState(false);

	const unreadCount = notifications.filter((n) => !n.read).length;

	return (
		<header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<h2 className="text-xl font-semibold text-gray-900">
						Walmart Store Management
					</h2>
					<span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
						{userRole.replace("_", " ")}
					</span>
				</div>

				<div className="flex items-center space-x-4">
					{/* Notifications */}
					<div className="relative">
						<button
							onClick={() => setShowNotifications(!showNotifications)}
							className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
						>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 17h5l-5 5v-5z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
								/>
							</svg>
							{unreadCount > 0 && (
								<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
									{unreadCount}
								</span>
							)}
						</button>

						{showNotifications && (
							<div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
								<div className="p-4 border-b border-gray-200">
									<h3 className="text-sm font-medium text-gray-900">
										Notifications
									</h3>
								</div>
								<div className="max-h-64 overflow-y-auto">
									{notifications.length === 0 ? (
										<div className="p-4 text-center text-gray-500">
											No notifications
										</div>
									) : (
										notifications.map((notification, index) => (
											<div
												key={index}
												className={`p-4 border-b border-gray-100 ${
													!notification.read ? "bg-blue-50" : ""
												}`}
											>
												<p className="text-sm text-gray-900">
													{notification.message}
												</p>
												<p className="text-xs text-gray-500 mt-1">
													{new Date(notification.timestamp).toLocaleString()}
												</p>
											</div>
										))
									)}
								</div>
							</div>
						)}
					</div>

					{/* User Menu */}
					<div className="flex items-center space-x-3">
						<div className="text-right">
							<p className="text-sm font-medium text-gray-900">
								{userRole.replace("_", " ")}
							</p>
							<p className="text-xs text-gray-500">Active</p>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={onLogout}
						>
							Logout
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
