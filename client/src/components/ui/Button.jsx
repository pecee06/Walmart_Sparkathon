import React from "react";

const Button = ({
	children,
	variant = "primary",
	size = "md",
	disabled = false,
	onClick,
	className = "",
	type = "button",
	...props
}) => {
	const baseClasses =
		"font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	const variants = {
		primary:
			"bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500",
		secondary:
			"bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
		danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
		success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500",
		outline:
			"border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-gray-500"
	};

	const sizes = {
		sm: "px-3 py-1.5 text-sm",
		md: "px-4 py-2 text-sm",
		lg: "px-6 py-3 text-base",
		xl: "px-8 py-4 text-lg"
	};

	const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

	return (
		<button
			type={type}
			className={classes}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
