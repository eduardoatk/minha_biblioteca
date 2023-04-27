import { read, exclude, create, edit } from "./httpService"

export async function apiGetLivros() {
	const livros = await read("/livros")
	return livros
}

export async function apiGetLivro(livroId) {
	const livro = await read(`/livros/${livroId}`)
	return livro
}

export async function apiDeleteLivro(livroId) {
	await exclude(`/livros/${livroId}`)
}

export async function apiCreateLivro(
	titulo,
	subtitulo,
	autor,
	ano,
	observacoes,
	usuarioId
) {
	const newLivro = create("/livros", {
		titulo,
		subtitulo,
		autor,
		ano,
		observacoes,
		usuarioId,
	})

	return newLivro
}

export async function apiUpdateLivro(
	livroId,
	titulo,
	subtitulo,
	autor,
	ano,
	observacoes,
	usuarioId
) {
	const updatedLivro = edit(`/livros/${livroId}`, {
		livroId,
		titulo,
		subtitulo,
		autor,
		ano,
		observacoes,
		usuarioId,
	})

	return updatedLivro
}
