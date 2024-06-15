export default function Button({
	children,
	type = "button",
}: {
	children: string;
	type?: HTMLButtonElement["type"];
}) {
	return (
		<button
			type={type}
			className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
		>
			{children}
		</button>
	);
}
