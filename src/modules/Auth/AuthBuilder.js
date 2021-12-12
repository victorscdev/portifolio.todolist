class AuthBuilder {
	validateSignIn(email, password) {
		let errors = []
		if(this.email) {
			if(/.+@.+\..+/.test(email) !== true) {
				errors.push(
					`<strong>Coloque um email valido</strong>`
				)
			}
			if(!email) {
				errors.push(
					`<strong>Campo "Email", não pode estar vazio</strong>`
				)
			}
		}
		if(password) {
			if(/.{6,}/.test(password) !== true) {
				errors.push(
					`<strong>Sua senha precisa de no minimo 6 caracteres</strong>`
				)
			}
			if(!password) {
				errors.push(
					`<strong>Campo "Senha", não pode estar vazio</strong>`
				)
			}
		}
		// if(errors.length <= 0) {
		// 	signIn()
		// }
		return errors
	}
}

export default new AuthBuilder()
