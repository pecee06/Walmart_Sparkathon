import React, { useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import StoreSelector from "./components/customer/StoreSelector";
import QueueStatus from "./components/customer/QueueStatus";
import CounterStatus from "./components/cashier/CounterStatus";
import CustomerCart from "./components/cashier/CustomerCart";
import StoreCard from "./components/store/StoreCard";
import StoreForm from "./components/store/StoreForm";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";

function App() {
	const [userRole, setUserRole] = useState("CUSTOMER"); // Default to customer for demo
	const [currentPath, setCurrentPath] = useState("/dashboard");
	const [selectedStore, setSelectedStore] = useState(null);
	const [isInQueue, setIsInQueue] = useState(false);
	const [queuePosition, setQueuePosition] = useState(null);
	const [showStoreForm, setShowStoreForm] = useState(false);
	const [stores, setStores] = useState([
		{
			id: 1,
			name: "Walmart Downtown",
			location: "123 Main St, Downtown",
			counters: 8,
			cashiers: 6,
			status: "active",
			revenue: 45678,
			description: "Main downtown location with full grocery and electronics"
		},
		{
			id: 2,
			name: "Walmart Westside",
			location: "456 West Ave, Westside",
			counters: 6,
			cashiers: 4,
			status: "active",
			revenue: 32456,
			description: "Convenient westside location"
		},
		{
			id: 3,
			name: "Walmart East Mall",
			location: "789 East Blvd, Eastside",
			counters: 10,
			cashiers: 8,
			status: "active",
			revenue: 67890,
			description: "Large mall location with extended hours"
		}
	]);

	const [notifications] = useState([
		{
			id: 1,
			message: "New store added: Walmart Downtown",
			timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
			read: false
		},
		{
			id: 2,
			message: "Store #15 exceeded daily target",
			timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
			read: true
		}
	]);

	const handleNavigate = (path) => {
		setCurrentPath(path);
	};

	const handleLogout = () => {
		setUserRole("CUSTOMER");
		setCurrentPath("/dashboard");
		setSelectedStore(null);
		setIsInQueue(false);
		setQueuePosition(null);
	};

	const handleStoreSelect = (store) => {
		setSelectedStore(store);
		setCurrentPath("/queue");
	};

	const handleJoinQueue = () => {
		setIsInQueue(true);
		setQueuePosition(Math.floor(Math.random() * 10) + 1); // Random position for demo
	};

	const handleLeaveQueue = () => {
		setIsInQueue(false);
		setQueuePosition(null);
	};

	const handleAddStore = (storeData) => {
		const newStore = {
			id: stores.length + 1,
			...storeData,
			cashiers: 0,
			revenue: 0
		};
		setStores([...stores, newStore]);
	};

	const handleEditStore = (store) => {
		// In real app, this would open edit form
		console.log("Edit store:", store);
	};

	const handleDeleteStore = (storeId) => {
		setStores(stores.filter((store) => store.id !== storeId));
	};

	const handleViewStoreDetails = (store) => {
		// In real app, this would navigate to store details page
		console.log("View store details:", store);
	};

	const renderContent = () => {
		switch (currentPath) {
			case "/dashboard":
				return <Dashboard userRole={userRole} />;

			case "/store-select":
				return (
					<StoreSelector
						stores={stores}
						onStoreSelect={handleStoreSelect}
					/>
				);

			case "/queue":
				return (
					<QueueStatus
						store={selectedStore}
						queuePosition={queuePosition}
						estimatedWaitTime={
							queuePosition ? Math.floor(queuePosition * 2.5) : null
						}
						onJoinQueue={handleJoinQueue}
						onLeaveQueue={handleLeaveQueue}
						isInQueue={isInQueue}
					/>
				);

			case "/stores":
				return (
					<div className="space-y-6">
						<div className="flex justify-between items-center">
							<h1 className="text-2xl font-bold text-gray-900">
								Manage Stores
							</h1>
							<Button
								variant="primary"
								onClick={() => setShowStoreForm(true)}
							>
								Add New Store
							</Button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{stores.map((store) => (
								<StoreCard
									key={store.id}
									store={store}
									onEdit={handleEditStore}
									onDelete={handleDeleteStore}
									onViewDetails={handleViewStoreDetails}
								/>
							))}
						</div>
					</div>
				);

			case "/counter":
				return (
					<div className="space-y-6">
						<h1 className="text-2xl font-bold text-gray-900">
							Counter Management
						</h1>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[1, 2, 3].map((counterNumber) => (
								<CounterStatus
									key={counterNumber}
									counterNumber={counterNumber}
									currentStatus="vacant"
									onStatusChange={(counter, status) => {
										console.log(
											`Counter ${counter} status changed to ${status}`
										);
									}}
								/>
							))}
						</div>
					</div>
				);

			case "/cart":
				return (
					<div className="space-y-6">
						<h1 className="text-2xl font-bold text-gray-900">Customer Cart</h1>
						<CustomerCart
							customerId="CUST-001"
							items={[]}
							onAddItem={(item) => console.log("Add item:", item)}
							onRemoveItem={(itemId) => console.log("Remove item:", itemId)}
							onUpdateQuantity={(itemId, quantity) =>
								console.log("Update quantity:", itemId, quantity)
							}
							onGenerateBill={(items, total) =>
								console.log("Generate bill:", items, total)
							}
						/>
					</div>
				);

			default:
				return <Dashboard userRole={userRole} />;
		}
	};

	// Role selector for demo purposes
	const RoleSelector = () => (
		<Card
			title="Select Your Role"
			subtitle="Choose your user type for demo"
		>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{["SUPER_ADMIN", "STORE_ADMIN", "CASHIER", "CUSTOMER"].map((role) => (
					<button
						key={role}
						onClick={() => {
							setUserRole(role);
							setCurrentPath("/dashboard");
							if (role === "CUSTOMER") {
								setCurrentPath("/store-select");
							}
						}}
						className={`p-4 border rounded-lg text-center transition-colors ${
							userRole === role
								? "border-primary-500 bg-primary-50 text-primary-700"
								: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
						}`}
					>
						<div className="text-2xl mb-2">
							{role === "SUPER_ADMIN" && "👑"}
							{role === "STORE_ADMIN" && "🏪"}
							{role === "CASHIER" && "💼"}
							{role === "CUSTOMER" && "👤"}
						</div>
						<p className="font-medium">{role.replace("_", " ")}</p>
					</button>
				))}
			</div>
		</Card>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{userRole === "CUSTOMER" && currentPath === "/store-select" ? (
				<div className="p-6">
					<RoleSelector />
					<div className="mt-6">{renderContent()}</div>
				</div>
			) : (
				<Layout
					userRole={userRole}
					currentPath={currentPath}
					onNavigate={handleNavigate}
					notifications={notifications}
					onLogout={handleLogout}
				>
					<RoleSelector />
					{renderContent()}
				</Layout>
			)}

			<StoreForm
				isOpen={showStoreForm}
				onClose={() => setShowStoreForm(false)}
				onSubmit={handleAddStore}
			/>
		</div>
	);
}

export default App;
