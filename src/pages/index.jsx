import Head from "next/head"
import Image from "next/image"

// import "primereact/resources/themes/md-dark-indigo/theme.css"
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import "primereact/resources/primereact.min.css"
import "primeicons/primeicons.css"
import "primeflex/primeflex.css"

import { Navbar } from "../components/Navbar"

export default function Home() {
	return (
		<>
			<Head>
				<title>Minha biblioteca</title>
				<meta name="description" content="Generated by create next app" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
			</Head>
			<Navbar />
			<div className="flex justify-content-center mt-5">
				<Image
					src="/biblioteca.jpg"
					alt="Imagem de uma biblioteca"
					width={800}
					height={600}
				/>
			</div>
		</>
	)
}