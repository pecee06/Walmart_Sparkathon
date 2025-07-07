import React from "react";
import StatsCard from "../components/dashboard/StatsCard";
import ChartCard from "../components/dashboard/ChartCard";
import Card from "../components/ui/Card";

const Dashboard = ({ userRole }) => {
	// Mock data - in real app this would come from API
	const getDashboardData = () => {
		switch (userRole) {
			case "SUPER_ADMIN":
				return {
					stats: [
						{
							title: "Total Stores",
							value: "24",
							change: "+2",
							icon: "🏪",
							color: "primary"
						},
						{
							title: "Total Revenue",
							value: "$2.4M",
							change: "+12%",
							icon: "💰",
							color: "success"
						},
						{
							title: "Active Cashiers",
							value: "156",
							change: "+8",
							icon: "💼",
							color: "info"
						},
						{
							title: "Customers Today",
							value: "1,234",
							change: "+15%",
							icon: "👥",
							color: "warning"
						}
					],
					recentActivity: [
						{
							type: "store_added",
							message: "New store added: Walmart Downtown",
							time: "2 hours ago"
						},
						{
							type: "revenue_high",
							message: "Store #15 exceeded daily target",
							time: "4 hours ago"
						},
						{
							type: "cashier_assigned",
							message: "Cashier assigned to Store #8",
							time: "6 hours ago"
						}
					]
				};

			case "STORE_ADMIN":
				return {
					stats: [
						{
							title: "Today's Sales",
							value: "$45,678",
							change: "+8%",
							icon: "💰",
							color: "success"
						},
						{
							title: "Items in Stock",
							value: "1,234",
							change: "-12",
							icon: "📦",
							color: "warning"
						},
						{
							title: "Active Cashiers",
							value: "8",
							change: "0",
							icon: "💼",
							color: "info"
						},
						{
							title: "Customers Served",
							value: "156",
							change: "+23",
							icon: "👥",
							color: "primary"
						}
					],
					recentActivity: [
						{
							type: "sale_completed",
							message: "Large sale completed: $234.56",
							time: "15 min ago"
						},
						{
							type: "inventory_low",
							message: "Milk stock running low",
							time: "1 hour ago"
						},
						{
							type: "cashier_login",
							message: "Cashier #3 started shift",
							time: "2 hours ago"
						}
					]
				};

			case "CASHIER":
				return {
					stats: [
						{
							title: "Today's Sales",
							value: "$1,234",
							change: "+15%",
							icon: "💰",
							color: "success"
						},
						{
							title: "Customers Served",
							value: "23",
							change: "+3",
							icon: "👥",
							color: "primary"
						},
						{
							title: "Average Transaction",
							value: "$53.65",
							change: "+$2.40",
							icon: "📊",
							color: "info"
						},
						{
							title: "Queue Length",
							value: "5",
							change: "-2",
							icon: "⏰",
							color: "warning"
						}
					],
					recentActivity: [
						{
							type: "sale_completed",
							message: "Sale completed: $67.89",
							time: "5 min ago"
						},
						{
							type: "customer_served",
							message: "Customer #45 served",
							time: "12 min ago"
						},
						{
							type: "queue_update",
							message: "Queue position updated",
							time: "20 min ago"
						}
					]
				};

			default:
				return {
					stats: [],
					recentActivity: []
				};
		}
	};

	const data = getDashboardData();

	return (
		<div className="space-y-6">
			{/* Welcome Header */}
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-2">
					Welcome back, {userRole.replace("_", " ")}!
				</h1>
				<p className="text-gray-600">
					Here's what's happening with your{" "}
					{userRole === "SUPER_ADMIN"
						? "stores"
						: userRole === "STORE_ADMIN"
						? "store"
						: "counter"}{" "}
					today.
				</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{data.stats.map((stat, index) => (
					<StatsCard
						key={index}
						title={stat.title}
						value={stat.value}
						change={stat.change}
						icon={stat.icon}
						color={stat.color}
					/>
				))}
			</div>

			{/* Charts and Analytics */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<ChartCard
					title="Sales Overview"
					subtitle="Last 7 days"
					actions={
						<button className="text-sm text-primary-600 hover:text-primary-700">
							View Details
						</button>
					}
				>
					<div className="h-full flex items-center justify-center text-gray-500">
						<div className="text-center">
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
							<p>Sales chart will be displayed here</p>
						</div>
					</div>
				</ChartCard>

				<ChartCard
					title="Customer Traffic"
					subtitle="Today's activity"
					actions={
						<button className="text-sm text-primary-600 hover:text-primary-700">
							View Details
						</button>
					}
				>
					<div className="h-full flex items-center justify-center text-gray-500">
						<div className="text-center">
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
									d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
								/>
							</svg>
							<p>Customer traffic chart will be displayed here</p>
						</div>
					</div>
				</ChartCard>
			</div>

			{/* Recent Activity */}
			<Card
				title="Recent Activity"
				subtitle="Latest updates"
			>
				<div className="space-y-4">
					{data.recentActivity.length === 0 ? (
						<p className="text-gray-500 text-center py-4">No recent activity</p>
					) : (
						data.recentActivity.map((activity, index) => (
							<div
								key={index}
								className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
							>
								<div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
									<span className="text-primary-600 text-sm">
										{activity.type === "store_added" && "🏪"}
										{activity.type === "revenue_high" && "💰"}
										{activity.type === "cashier_assigned" && "💼"}
										{activity.type === "sale_completed" && "✅"}
										{activity.type === "inventory_low" && "⚠️"}
										{activity.type === "cashier_login" && "👤"}
										{activity.type === "customer_served" && "👥"}
										{activity.type === "queue_update" && "⏰"}
									</span>
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-sm text-gray-900">{activity.message}</p>
									<p className="text-xs text-gray-500">{activity.time}</p>
								</div>
							</div>
						))
					)}
				</div>
			</Card>

			{/* Quick Actions */}
			<Card
				title="Quick Actions"
				subtitle="Common tasks"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{userRole === "SUPER_ADMIN" && (
						<>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">🏪</span>
									<div>
										<p className="font-medium text-gray-900">Add New Store</p>
										<p className="text-sm text-gray-600">
											Create a new store location
										</p>
									</div>
								</div>
							</button>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">📊</span>
									<div>
										<p className="font-medium text-gray-900">Generate Report</p>
										<p className="text-sm text-gray-600">
											AI-powered sales analysis
										</p>
									</div>
								</div>
							</button>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">👥</span>
									<div>
										<p className="font-medium text-gray-900">Manage Admins</p>
										<p className="text-sm text-gray-600">
											Assign store administrators
										</p>
									</div>
								</div>
							</button>
						</>
					)}

					{userRole === "STORE_ADMIN" && (
						<>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">📦</span>
									<div>
										<p className="font-medium text-gray-900">Check Inventory</p>
										<p className="text-sm text-gray-600">View stock levels</p>
									</div>
								</div>
							</button>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">🤖</span>
									<div>
										<p className="font-medium text-gray-900">ML Predictions</p>
										<p className="text-sm text-gray-600">
											Forecast requirements
										</p>
									</div>
								</div>
							</button>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">💼</span>
									<div>
										<p className="font-medium text-gray-900">Manage Cashiers</p>
										<p className="text-sm text-gray-600">
											Assign counter staff
										</p>
									</div>
								</div>
							</button>
						</>
					)}

					{userRole === "CASHIER" && (
						<>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">🖥️</span>
									<div>
										<p className="font-medium text-gray-900">Counter Status</p>
										<p className="text-sm text-gray-600">
											Mark vacant/occupied
										</p>
									</div>
								</div>
							</button>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">🛒</span>
									<div>
										<p className="font-medium text-gray-900">Customer Cart</p>
										<p className="text-sm text-gray-600">Add items to cart</p>
									</div>
								</div>
							</button>
							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
								<div className="flex items-center space-x-3">
									<span className="text-2xl">🧾</span>
									<div>
										<p className="font-medium text-gray-900">Generate Bill</p>
										<p className="text-sm text-gray-600">
											Complete transaction
										</p>
									</div>
								</div>
							</button>
						</>
					)}
				</div>
			</Card>
		</div>
	);
};

export default Dashboard;
