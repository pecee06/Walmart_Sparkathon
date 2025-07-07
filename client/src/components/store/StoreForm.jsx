import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Modal from "../ui/Modal";

const StoreForm = ({
	isOpen,
	onClose,
	onSubmit,
	store = null,
	title = "Add New Store"
}) => {
	const [formData, setFormData] = useState({
		name: "",
		location: "",
		description: "",
		counters: 1,
		status: "active"
	});

	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (store) {
			setFormData({
				name: store.name || "",
				location: store.location || "",
				description: store.description || "",
				counters: store.counters || 1,
				status: store.status || "active"
			});
		} else {
			setFormData({
				name: "",
				location: "",
				description: "",
				counters: 1,
				status: "active"
			});
		}
		setErrors({});
	}, [store, isOpen]);

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Store name is required";
		}

		if (!formData.location.trim()) {
			newErrors.location = "Location is required";
		}

		if (formData.counters < 1) {
			newErrors.counters = "At least 1 counter is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			onSubmit(formData);
			onClose();
		}
	};

	const handleChange = (field, value) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}));

		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({
				...prev,
				[field]: ""
			}));
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={title}
			size="lg"
		>
			<form
				onSubmit={handleSubmit}
				className="space-y-6"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Input
						label="Store Name"
						value={formData.name}
						onChange={(e) => handleChange("name", e.target.value)}
						placeholder="Enter store name"
						error={errors.name}
						required
					/>

					<Input
						label="Location"
						value={formData.location}
						onChange={(e) => handleChange("location", e.target.value)}
						placeholder="Enter store location"
						error={errors.location}
						required
					/>

					<div className="md:col-span-2">
						<Input
							label="Description"
							value={formData.description}
							onChange={(e) => handleChange("description", e.target.value)}
							placeholder="Enter store description (optional)"
							error={errors.description}
						/>
					</div>

					<Input
						label="Number of Counters"
						type="number"
						value={formData.counters}
						onChange={(e) =>
							handleChange("counters", parseInt(e.target.value) || 1)
						}
						min="1"
						error={errors.counters}
						required
					/>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Status
						</label>
						<select
							value={formData.status}
							onChange={(e) => handleChange("status", e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
						>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
							<option value="maintenance">Maintenance</option>
						</select>
					</div>
				</div>

				<div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
					<Button
						type="button"
						variant="secondary"
						onClick={onClose}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="primary"
					>
						{store ? "Update Store" : "Add Store"}
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default StoreForm;
