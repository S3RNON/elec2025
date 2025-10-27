import type { Metadata } from "next";
import { Lexend_Deca } from "next/font/google";
import "./globals.css";

const lexendDeca = Lexend_Deca({
	variable: "--font-lexend-deca",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Wonen in Nederland",
	description: "Een inkijk naar hoe wonen in Nederland echt in elkaar zit.",
	icons: {
		icon: "/favicon.svg",
		shortcut: "/favicon.svg",
	},
	viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="icon" href="/favicon.svg" />
			</head>
			<body className={`${lexendDeca.variable} antialiased bg-gray-5`}>
				{children}
			</body>
		</html>
	);
}
