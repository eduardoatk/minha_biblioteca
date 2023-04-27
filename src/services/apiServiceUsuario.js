import { read, exclude, create, edit } from "./httpService"

export async function apiGetUsuarios() {
	const usuarios = await read("/usuarios")
	return usuarios
}

export async function apiGetUsuario(usuarioId) {
	const usuario = await read(`/usuarios/${usuarioId}`)
	return usuario
}

export async function apiDeleteUsuario(usuarioId) {
	await exclude(`/usuarios/${usuarioId}`)
}

export async function apiCreateAtivo(usuario, email, senha) {
	const newUsuario = create("/usuarios", {
		usuario,
		email,
		senha,
	})

	return newUsuario
}

export async function apiUpdateUsuario(usuarioId, usuario, email, senha) {
	const updatedUsuario = edit(`/usuarios/${usuarioId}`, {
		usuarioId,
		usuario,
		email,
		senha,
	})

	return updatedUsuario
}
