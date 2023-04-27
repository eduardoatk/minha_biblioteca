import { Navbar } from "../components/Navbar"
import { apiGetLivros } from "../services/apiServiceLivro"

import { useState, useEffect, useRef } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { Toast } from "primereact/toast"

import { apiUpdateLivro, apiDeleteLivro } from "../services/apiServiceLivro"
import { InputText } from "primereact/inputtext"
import { InputTextarea } from "primereact/inputtextarea"

export default function ListarLivros() {
	const [livros, setLivros] = useState([])
	const [filters, setFilters] = useState(null)
	const [dialogDeletar, setDialogDeletar] = useState(false)
	const [dialogEditar, setDialogEditar] = useState(false)
	const [dadosEditar, setDadosEditar] = useState([])
	const [titulo, setTitulo] = useState("")
	const [subtitulo, setSubtitulo] = useState("")
	const [autor, setAutor] = useState("")
	const [ano, setAno] = useState("")
	const [observacoes, setObservacoes] = useState("")
	const [livroId, setLivroId] = useState(0)
	const [usuarioId, setUsuarioId] = useState(0)
	const [carrega, setCarrega] = useState(true)

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

	useEffect(() => {
		if (carrega === true) {
			async function getLivros() {
				try {
					const backendLivros = await apiGetLivros()
					setLivros(backendLivros)
				} catch (error) {
					console.error("Erro ao buscar livros:", error)
				}
			}
			getLivros()
			setCarrega(false)
		}
	}, [carrega])

	const actionBodyTemplate = rowData => {
		return (
			<>
				<Button
					icon="pi pi-pencil"
					rounded
					className="mr-2"
					onClick={() => editProduct(rowData)}
				/>
				<Button
					icon="pi pi-trash"
					rounded
					severity="danger"
					onClick={() => confirmDeleteProduct(rowData)}
				/>
			</>
		)
	}

	async function confirmDeleteProduct(rowData) {
		await apiDeleteLivro(rowData.livroId)
		setCarrega(true)
		mensagemDeSucesso()
	}

	async function editProduct(dados) {
		setDialogEditar(true)
		setLivroId(dados.livroId)
		setTitulo(dados.titulo)
		setSubtitulo(dados.subtitulo)
		setAutor(dados.autor)
		setAno(dados.ano)
		setObservacoes(dados.observacoes)
		setUsuarioId(dados.usuarioId)
	}

	async function handleSaveButton() {
		if (!titulo || !autor || !ano) {
			mensagemErroPreenchimento()
			hideDialog()
			return
		}

		await apiUpdateLivro(
			livroId,
			titulo,
			subtitulo,
			autor,
			ano,
			observacoes,
			usuarioId
		)

		clearState()
		hideDialog()
		setCarrega(true)
		mensagemDeSucesso()
	}

	function clearState() {
		setTitulo("")
		setSubtitulo("")
		setAutor("")
		setAno("")
		setObservacoes("")
	}

	function hideDialog() {
		setDialogEditar(false)
	}

	function hideDialogDeletar() {
		setDialogDeletar(false)
	}

	return (
		<>
			<Navbar />
			<div className="card mt-3">
				<DataTable
					value={livros}
					paginator
					rows={10}
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					rowsPerPageOptions={[5, 10, 25, 50]}
					stripedRows
					filters={filters}
					filterDisplay="menu"
					emptyMessage="Nenhum livro encontrado."
					currentPageReportTemplate="Mostrando {first} de {last} de {totalRecords} registros"
				>
					<Column
						field="titulo"
						header="Título"
						sortable
						filter
						filterPlaceholder="Search by name"
						style={{ minWidth: "14rem" }}
					/>
					<Column
						field="subtitulo"
						header="Subtítulo"
						sortable
						filterField="subtitulo"
						style={{ minWidth: "14rem" }}
						filter
						filterPlaceholder="Search by country"
					/>
					<Column
						header="Autor"
						field="autor"
						sortable
						filterField="autor"
						style={{ minWidth: "14rem" }}
						filter
					/>
					<Column
						field="ano"
						header="Ano"
						sortable
						filterField="date"
						style={{ minWidth: "12rem" }}
					/>
					<Column
						field="observacoes"
						header="Observações"
						sortable
						style={{ minWidth: "12rem" }}
						filter
					/>
					<Column
						body={actionBodyTemplate}
						exportable={false}
						style={{ minWidth: "12rem" }}
					></Column>
				</DataTable>
				<Toast ref={toast} />
				<Dialog
					value={dadosEditar}
					header="Confirme a edição dos dados"
					visible={dialogEditar}
					style={{ width: "40vw", height: "100vh" }}
					modal
					onHide={hideDialog}
				>
					<div className="ml-5 flex flex-column">
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
					</div>
					<div className="flex justify-content-center align-items-baseline mt-5">
						<Button onClick={handleSaveButton}>Confirmar</Button>
					</div>
				</Dialog>
				<Dialog
					header="Confirme a exclusão dos dados"
					visible={dialogDeletar}
					style={{ width: "40vw", height: "30vh" }}
					modal
					onHide={hideDialogDeletar}
				></Dialog>
			</div>
		</>
	)
}
