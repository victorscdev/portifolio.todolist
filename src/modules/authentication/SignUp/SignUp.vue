<template>
	<section id="pageSignUp">
		<v-container>
			<v-row>
				<v-col offset-md="2" md="8" cols="12">
					<div class="card-register">
						<div class="card-register-body">
							<h1>Cadastrar</h1>
							<v-row>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="text"
										label="Nome"
										placeholder="Seu nome"
										v-model="fb.db.setUser.name"
										>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="text"
										label="Idade"
										placeholder="Sua idade"
										v-model="fb.db.setUser.age"
										>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-select
										:items="sexSelect"
										label="Sexo"
										v-model="fb.db.setUser.sex"
									></v-select>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="email"
										label="Email"
										placeholder="email@email.com"
										v-model="fb.auth.setAuth.email"
										>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="password"
										label="Senha"
										v-model="fb.auth.setAuth.password"
										>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="password"
										label="Confirmar Senha"
										placeholder="Coloque a mesma senha que está acima"
										v-model="fb.auth.setAuth.passwordConfirm"
										>
									</v-text-field>
								</v-col>
							</v-row>

							<v-btn
								color="primary"
								elevation="4"
								block
								@click="validate"
							>
							registrar
							</v-btn>
						</div>
						<div class="card-register-footer">
							<small>Ou retorne ao</small>
							<router-link to="/login" class="v-btn">login!</router-link>
						</div>
					</div>
				</v-col>
			</v-row>
		</v-container>
		<div class="modal-validation" v-if="validations.errors.length">
			<div class="overlay">
				<div class="modal-card">
						<div class="modal-header">
							<h2>Algo deu errado!</h2>
							<v-btn elevation="5" icon @click.prevent="resetValidations">
								<v-icon>mdi-close</v-icon>
							</v-btn>
						</div>
						<div class="modal-body">
							<h4>Resolva o(s) seguinte(s) erro(s) antes de continuar.</h4>
							<ul>
								<li
										class="erro"
										v-for="(error, index) in validations.errors"
										:key="`error-${index}`"
										v-html="error"
								>
								</li>
							</ul>
						</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import firebase from 'firebase/app'
import db from '../../../plugins/firebse'

export default {
	name: "SignUp",
	data: () => ({
		fb: {
			db: {
				userCollection: db.collection('Users'),
				setUser: {
						name: '',
						age: '',
						sex: '',
				}
			},
			auth: {
				fireAuth: firebase.auth(),
				setAuth: {
					email: '',
					password: '',
					passwordConfirm: '',
					uid: '',
				},
			}
		},
		sexSelect: ['M', 'F'],
		validations: {
			errors: [],
		},
	}),
	methods: {
		signUp() {
			this.fb.auth.fireAuth
				.createUserWithEmailAndPassword(
					this.fb.auth.setAuth.email,
					this.fb.auth.setAuth.password
				)
				.then((userCredential) => {
					JSON.stringify(userCredential)
					this.fb.auth.setAuth.uid = userCredential.user.uid
					this.setUserFromDatabase()
					return this.$router.replace('/todolist')
				})
				.catch((error) => {
					alert(error)
				})
		},
		setUserFromDatabase() {
			this.fb.db.userCollection
				.doc(this.fb.auth.setAuth.uid)
				.set({
					name: this.fb.db.setUser.name,
					age: this.fb.db.setUser.age,
					sex: this.fb.db.setUser.sex,
					role: 'Default',
					createdAt: new Date(),
					updatedAt: new Date(),
				})
		},
		validate() {
			if(!this.fb.db.setUser.name) {
				this.validations.errors.push(
					`<strong>Campo "Nome", não pode estar vazio</strong>`
				)
			}
			if(this.fb.db.setUser.name) {
				if(this.fb.db.setUser.name.length <= 2) {
					this.validations.errors.push(
						`<strong>Campo "Nome", obrigário ter no minimo 3 letras</strong>`
					)
				}
			}

			if(!this.fb.db.setUser.age) {
				this.validations.errors.push(
					`<strong>Campo "Idade", não pode estar vazio</strong>`
				)
			}
			if(this.fb.db.setUser.age) {
				if(this.fb.db.setUser.age.length >= 4) {
					this.validations.errors.push(
						`<strong>Campo "Idade", não pode ter mais que 3 caracteres</strong>`
					)
				}
			}

			if(!this.fb.db.setUser.sex) {
				this.validations.errors.push(
					`<strong>Campo "Sexo", não pode estar vazio</strong>`
				)
			}

			if(this.fb.auth.setAuth.email) {
				if(/.+@.+\..+/.test(this.fb.auth.setAuth.email) !== true) {
					this.validations.errors.push(
						`<strong>Coloque um email valido</strong>`
					)
				}
			}
			if(!this.fb.auth.setAuth.email) {
				this.validations.errors.push(
					`<strong>Campo "Email", não pode estar vazio</strong>`
				)
			}

			if(!this.fb.auth.setAuth.password) {
				this.validations.errors.push(
					`<strong>Campo "Senha", não pode estar vazio</strong>`
				)
			}
			if(this.fb.auth.setAuth.password) {
				if(/.{6,}/.test(this.fb.auth.setAuth.password) !== true) {
					this.validations.errors.push(
						`<strong>Sua senha precisa de no minimo 6 caracteres</strong>`
					)
				}
				if(!this.fb.auth.setAuth.passwordConfirm) {
						this.validations.errors.push(
								`<strong>Campo de comparação de senha obrigatorio</strong>`
						)
				}
				if(this.fb.auth.setAuth.passwordConfirm !== this.fb.auth.setAuth.password) {
					this.validations.errors.push(
						`<strong>Os campos de "Senha" e "Confirmar Senha" não estão iguais!</strong>`
					)
				}
			}

			if(this.validations.errors.length <= 0) {
				this.signUp()
			}
		},
		resetValidations() {
			this.validations.errors = []
		},
	},
}
</script>

<style scoped lang="scss">
	#pageSignUp {
	background: #121623;
	height: 100vh;
	width: 100%;
		.container {
			display: flex;
			height: 100%;
			.row {
					align-items: center;
			}
		}
		.card-register {
			background: #f4f4f4;
			border: 1px solid #121623;
			border-radius: 24px 0;
			padding: 24px 0 0;
			overflow: hidden;
			.card-register-body {
				padding: 0 24px 24px;
				h1 {
					color: #121623;
					text-align: center;
				}
				hr {
					border-color: #121623;
					margin-bottom: 40px;
				}
				.v-input {
					&.primary {
						&--text {
							color: #1aa5ba !important;
							caret-color: #1aa5ba !important;
						}
					}
				}
				.v-btn {
					&.primary {
						background-color: #1aa5ba !important;
						border-color: #1aa5ba !important;
						color: #f4f4f4;
					}
				}
			}
			.card-register-footer {
				background: #123954;
				border-radius: 0 0 24px 0;
				display: flex;
				align-items: center;
				padding: 24px;
				small {
					color: #f4f4f4;
				}
				.v-btn {
					color: #f4f4f4;
					font-size: 80%;
					margin-left: 8px;
					text-decoration: underline;
					&:hover {
						color: #207fd8;
					}
					&.primary {
						background-color: #1aa5ba !important;
						border-color: #1aa5ba !important;
					}
				}
			}
		}
	}
</style>
