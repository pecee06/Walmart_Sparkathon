import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({
	children,
	userRole,
	currentPath,
	onNavigate,
	notifications = [],
	onLogout
}) => {
	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<Sidebar
				userRole={userRole}
				currentPath={currentPath}
				onNavigate={onNavigate}
			/>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<Header
					userRole={userRole}
					notifications={notifications}
					onLogout={onLogout}
				/>

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
};

export default Layout;
