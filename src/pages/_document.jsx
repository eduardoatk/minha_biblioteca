import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
					key="preconnect-fonts-googleapis"
				></link>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					key="preconnect-fonts-gstatic"
					crossOrigin="anonymous"
				></link>
				<link
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
					rel="stylesheet"
					key="fonts-poppins"
				></link>
				<link
					rel="stylesheet"
					href="https://unpkg.com/primeflex@^3/primeflex.css"
				></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
