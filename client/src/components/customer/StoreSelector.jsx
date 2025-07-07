import React, { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

const StoreSelector = ({ stores = [], onStoreSelect }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStore, setSelectedStore] = useState(null);

	const filteredStores = stores.filter(
		(store) =>
			store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			store.location.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleStoreSelect = (store) => {
		setSelectedStore(store);
	};

	const handleConfirm = () => {
		if (selectedStore) {
			onStoreSelect(selectedStore);
		}
	};

	return (
		<div className="max-w-4xl mx-auto">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Welcome to Walmart
				</h1>
				<p className="text-lg text-gray-600">
					Please select the store you're currently visiting
				</p>
			</div>

			<Card
				title="Select Your Store"
				subtitle="Choose the store location where you're shopping"
			>
				<div className="space-y-6">
					{/* Search */}
					<Input
						label="Search Stores"
						placeholder="Search by store name or location..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					{/* Store List */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
						{filteredStores.length === 0 ? (
							<div className="col-span-full text-center py-8 text-gray-500">
								<p>No stores found matching your search</p>
							</div>
						) : (
							filteredStores.map((store) => (
								<div
									key={store.id}
									className={`p-4 border rounded-lg cursor-pointer transition-colors ${
										selectedStore?.id === store.id
											? "border-primary-500 bg-primary-50"
											: "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
									}`}
									onClick={() => handleStoreSelect(store)}
								>
									<div className="flex items-start space-x-3">
										<div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
											<span className="text-primary-600 text-lg">🏪</span>
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="font-semibold text-gray-900 truncate">
												{store.name}
											</h3>
											<p className="text-sm text-gray-600">{store.location}</p>
											<div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
												<span>Counters: {store.counters}</span>
												<span>Status: {store.status}</span>
											</div>
										</div>
										{selectedStore?.id === store.id && (
											<div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
												<svg
													className="w-3 h-3 text-white"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fillRule="evenodd"
														d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
														clipRule="evenodd"
													/>
												</svg>
											</div>
										)}
									</div>
								</div>
							))
						)}
					</div>

					{/* Selected Store Info */}
					{selectedStore && (
						<div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
							<h3 className="font-semibold text-primary-900 mb-2">
								Selected Store
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
								<div>
									<span className="text-primary-700 font-medium">Name:</span>
									<p className="text-primary-900">{selectedStore.name}</p>
								</div>
								<div>
									<span className="text-primary-700 font-medium">
										Location:
									</span>
									<p className="text-primary-900">{selectedStore.location}</p>
								</div>
								<div>
									<span className="text-primary-700 font-medium">
										Available Counters:
									</span>
									<p className="text-primary-900">{selectedStore.counters}</p>
								</div>
							</div>
						</div>
					)}

					{/* Action Button */}
					<div className="text-center">
						<Button
							variant="primary"
							size="lg"
							onClick={handleConfirm}
							disabled={!selectedStore}
							className="px-8"
						>
							Continue to Queue
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default StoreSelector;
