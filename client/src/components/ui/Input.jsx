import React from "react";

const Input = ({
	label,
	type = "text",
	placeholder,
	value,
	onChange,
	error,
	disabled = false,
	required = false,
	className = "",
	...props
}) => {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm font-medium text-gray-700 mb-1">
					{label}
					{required && <span className="text-red-500 ml-1">*</span>}
				</label>
			)}
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				disabled={disabled}
				className={`
          w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0
          ${
						error
							? "border-red-300 focus:ring-red-500 focus:border-red-500"
							: "border-gray-300 focus:ring-primary-500 focus:border-primary-500"
					}
          ${disabled ? "bg-gray-50 cursor-not-allowed" : "bg-white"}
          ${className}
        `}
				{...props}
			/>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
		</div>
	);
};

export default Input;
