import "src/styles/globals.css";

import NavBar from "@packages/components/NavBar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const currentYear = new Date().getFullYear();

	return (
		<html lang="en">
			<title>{`Eleições ${currentYear}`}</title>
			<link rel="icon" href="/favicon.ico" />

			<body>
				<NavBar />

				<div className="md:container md:mx-auto content-center h-full">
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
