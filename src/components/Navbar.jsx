import { useSession, signIn, signOut } from "next-auth/react"
import { Dialog } from "primereact/dialog"

import { useRouter } from "next/router"
import { Menubar } from "primereact/menubar"
import { Button } from "primereact/button"
import { useState } from "react"

export function Navbar() {
	const { data: session, status } = useSession({ required: true })
	const router = useRouter()
	const [visible, setVisible] = useState(false)

	const items = [
		{
			label: "Home",
			icon: "pi pi-fw pi-home",
		},
		{
			label: "Cadastrar livros",
			icon: "pi pi-fw pi-check-circle",
		},
		{
			label: "Listar livros",
			icon: "pi pi-fw pi-list",
		},
		{
			label: "User",
			icon: "pi pi-fw pi-user",
		},
	]

	function onMenuClick(props) {
		switch (props.target.innerText) {
			case "Home":
				router.push("/")
				break
			case "Cadastrar livros":
				router.push("/addBooks")
				break
			case "Listar livros":
				router.push("/listBooks")
				break
			case "Configurações":
				router.push("/config")
				break
			case "User":
				setVisible(true)
				break
		}
	}

	return (
		<>
			<h1 className="px-3">Minha Biblioteca</h1>
			<div className="card">
				<Menubar
					className="justify-content-end"
					model={items}
					onClick={onMenuClick}
				/>
			</div>
			<div className="card flex justify-content-center">
				<Dialog
					header="Você deseja sair?"
					visible={visible}
					style={{ width: "20vw" }}
					onHide={() => setVisible(false)}
				>
					{status === "authenticated" ? (
						<div className="flex justify-content-center">
							<Button onClick={() => signOut()}>Sair</Button>
						</div>
					) : (
						<div className="flex justify-content-center">
							<Button onClick={() => signIn("google")}>Entrar</Button>
						</div>
					)}
				</Dialog>
			</div>
		</>
	)
}
