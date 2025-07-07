import React, { useState } from "react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Input from "../ui/Input";

const CustomerCart = ({
	customerId,
	items = [],
	onAddItem,
	onRemoveItem,
	onUpdateQuantity,
	onGenerateBill
}) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);
	const [quantity, setQuantity] = useState(1);

	// Mock inventory items - in real app this would come from API
	const inventoryItems = [
		{ id: 1, name: "Milk", price: 3.99, category: "Dairy" },
		{ id: 2, name: "Bread", price: 2.49, category: "Bakery" },
		{ id: 3, name: "Eggs", price: 4.99, category: "Dairy" },
		{ id: 4, name: "Bananas", price: 1.99, category: "Produce" },
		{ id: 5, name: "Chicken Breast", price: 8.99, category: "Meat" },
		{ id: 6, name: "Rice", price: 5.99, category: "Pantry" },
		{ id: 7, name: "Tomatoes", price: 2.99, category: "Produce" },
		{ id: 8, name: "Cheese", price: 6.99, category: "Dairy" }
	];

	const filteredItems = inventoryItems.filter(
		(item) =>
			item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.category.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const total = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const handleAddItem = () => {
		if (selectedItem && quantity > 0) {
			onAddItem({
				...selectedItem,
				quantity: quantity
			});
			setSelectedItem(null);
			setQuantity(1);
		}
	};

	const handleRemoveItem = (itemId) => {
		onRemoveItem(itemId);
	};

	const handleUpdateQuantity = (itemId, newQuantity) => {
		if (newQuantity > 0) {
			onUpdateQuantity(itemId, newQuantity);
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
			{/* Inventory Search and Add Items */}
			<Card
				title="Add Items"
				subtitle="Search and add items to cart"
			>
				<div className="space-y-4">
					<Input
						label="Search Items"
						placeholder="Search by name or category..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>

					<div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
						{filteredItems.map((item) => (
							<div
								key={item.id}
								className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
									selectedItem?.id === item.id
										? "bg-primary-50 border-primary-200"
										: ""
								}`}
								onClick={() => setSelectedItem(item)}
							>
								<div className="flex justify-between items-center">
									<div>
										<p className="font-medium text-gray-900">{item.name}</p>
										<p className="text-sm text-gray-600">{item.category}</p>
									</div>
									<p className="font-medium text-gray-900">${item.price}</p>
								</div>
							</div>
						))}
					</div>

					{selectedItem && (
						<div className="bg-gray-50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-3">
								<div>
									<p className="font-medium text-gray-900">
										{selectedItem.name}
									</p>
									<p className="text-sm text-gray-600">
										{selectedItem.category}
									</p>
								</div>
								<p className="font-medium text-gray-900">
									${selectedItem.price}
								</p>
							</div>

							<div className="flex items-center space-x-3">
								<Input
									label="Quantity"
									type="number"
									value={quantity}
									onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
									min="1"
									className="w-24"
								/>
								<Button
									variant="primary"
									onClick={handleAddItem}
									className="mt-6"
								>
									Add to Cart
								</Button>
							</div>
						</div>
					)}
				</div>
			</Card>

			{/* Customer Cart */}
			<Card
				title="Customer Cart"
				subtitle={`Customer ID: ${customerId}`}
			>
				<div className="space-y-4">
					{items.length === 0 ? (
						<div className="text-center py-8 text-gray-500">
							<p>No items in cart</p>
						</div>
					) : (
						<>
							<div className="max-h-64 overflow-y-auto space-y-2">
								{items.map((item) => (
									<div
										key={item.id}
										className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
									>
										<div className="flex-1">
											<p className="font-medium text-gray-900">{item.name}</p>
											<p className="text-sm text-gray-600">
												${item.price} each
											</p>
										</div>

										<div className="flex items-center space-x-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													handleUpdateQuantity(item.id, item.quantity - 1)
												}
												disabled={item.quantity <= 1}
											>
												-
											</Button>
											<span className="w-8 text-center font-medium">
												{item.quantity}
											</span>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													handleUpdateQuantity(item.id, item.quantity + 1)
												}
											>
												+
											</Button>
											<Button
												variant="danger"
												size="sm"
												onClick={() => handleRemoveItem(item.id)}
											>
												Remove
											</Button>
										</div>
									</div>
								))}
							</div>

							<div className="border-t border-gray-200 pt-4">
								<div className="flex justify-between items-center mb-4">
									<span className="text-lg font-semibold text-gray-900">
										Total:
									</span>
									<span className="text-lg font-semibold text-gray-900">
										${total.toFixed(2)}
									</span>
								</div>

								<Button
									variant="primary"
									size="lg"
									onClick={() => onGenerateBill(items, total)}
									disabled={items.length === 0}
									className="w-full"
								>
									Generate Bill
								</Button>
							</div>
						</>
					)}
				</div>
			</Card>
		</div>
	);
};

export default CustomerCart;
