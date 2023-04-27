import { useRef, useState } from "react"

import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import { Toast } from "primereact/toast"
import { Dialog } from "primereact/dialog"

import { apiCreateLivro } from "../services/apiServiceLivro"

export function FormBooks() {
	const [titulo, setTitulo] = useState("")
	const [subtitulo, setSubtitulo] = useState("")
	const [autor, setAutor] = useState("")
	const [ano, setAno] = useState("")
	const [observacoes, setObservacoes] = useState("")
	const [dialogAtivo, setDialogAtivo] = useState(false)

	const usuarioId = 1

	const toast = useRef(null)

	const mensagemDeSucesso = () => {
		toast.current.show({
			severity: "success",
			summary: "Sucesso",
			detail: "Operação realizada com sucesso!",
			life: 3000,
		})
	}

	const mensagemErroPreenchimento = () => {
		toast.current.show({
			severity: "error",
			summary: "Erro",
			detail: "Título, autor e ano são obrigatórios!",
			life: 3000,
		})
	}

	function clearState() {
		setTitulo("")
		setSubtitulo("")
		setAutor("")
		setAno("")
		setObservacoes("")
	}

	function showDialog() {
		setDialogAtivo(true)
	}

	function hideDialog() {
		setDialogAtivo(false)
	}

	async function handleSaveButton() {
		if (!titulo || !autor || !ano) {
			mensagemErroPreenchimento()
			hideDialog()
			return
		}

		await apiCreateLivro(
			titulo,
			subtitulo,
			autor,
			ano,
			observacoes,
			usuarioId
		)
		clearState()
		hideDialog()
		mensagemDeSucesso()
	}

	return (
		<>
			<div className="card flex justify-content-center">
				<div className="flex flex-column gap-2 pt-5 pb-2">
					<label htmlFor="titulo">Título</label>
					<InputText
						id="titulo"
						aria-describedby="username-help"
						value={titulo}
						onChange={e => setTitulo(e.target.value)}
					/>
				</div>
			</div>
			<div className="card flex justify-content-center">
				<div className="flex flex-column gap-2 py-2">
					<label htmlFor="subtitulo">Subtítulo</label>
					<InputText
						id="subtitulo"
						aria-describedby="username-help"
						value={subtitulo}
						onChange={e => setSubtitulo(e.target.value)}
					/>
				</div>
			</div>
			<div className="card flex justify-content-center">
				<div className="flex flex-column gap-2 py-2">
					<label htmlFor="autor">Autor</label>
					<InputText
						id="autor"
						aria-describedby="username-help"
						value={autor}
						onChange={e => setAutor(e.target.value)}
					/>
				</div>
			</div>
			<div className="card flex justify-content-center">
				<div className="flex flex-column gap-2 py-2">
					<label htmlFor="ano">Ano</label>
					<InputText
						id="ano"
						aria-describedby="username-help"
						value={ano}
						onChange={e => setAno(e.target.value)}
					/>
				</div>
			</div>
			<div className="card flex justify-content-center">
				<div className="flex flex-column gap-2 py-2">
					<label htmlFor="observacoes">Observações</label>
					<InputTextarea
						id="observacoes"
						rows={5}
						cols={22}
						value={observacoes}
						onChange={e => setObservacoes(e.target.value)}
					/>{" "}
				</div>
			</div>
			<div className="flex justify-content-center pt-4">
				<Toast ref={toast} />
				<Button label="Salvar" onClick={showDialog} />
			</div>
			<div className="card flex flex-column flex-wrap justify-content-center">
				<Dialog
					header="Confirme os dados"
					visible={dialogAtivo}
					style={{ width: "40vw", height: "60vh" }}
					modal
					onHide={hideDialog}
				>
					<div className="ml-5 flex flex-column">
						<p>
							<strong>Título:</strong> {titulo}
						</p>
						<p>
							<strong>Subtítulo:</strong> {subtitulo}
						</p>
						<p>
							<strong>Autor:</strong> {autor}
						</p>
						<p>
							<strong>Ano:</strong> {ano}
						</p>
						<p>
							<strong>Observações:</strong> {observacoes}
						</p>
					</div>
					<div className="flex justify-content-center align-items-baseline mt-5">
						<Button onClick={handleSaveButton}>Confirmar</Button>
					</div>
				</Dialog>
			</div>
		</>
	)
}
