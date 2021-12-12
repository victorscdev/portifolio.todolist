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
										v-model="user.name"
										>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="text"
										label="Idade"
										placeholder="Sua idade"
										v-model="user.age"
										>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-select
										:items="sexSelect"
										label="Sexo"
										v-model="user.sex"
									></v-select>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="email"
										label="Email"
										placeholder="email@email.com"
										v-model="user.email"
										>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="password"
										label="Senha"
										v-model="user.password"
										>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6" md="4">
									<v-text-field
										type="password"
										label="Confirmar Senha"
										placeholder="Coloque a mesma senha que está acima"
										v-model="user.passwordConfirm"
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
import AuthRepository from '../AuthRepository'
import UserRepository from '../../User/UserRepository'

export default {
	name: "SignUp",
	data: () => ({
		user: {
			email: '',
			password: '',
			passwordConfirm: '',
			name: '',
			age: '',
			sex: '',
			uid: '',
		},
		sexSelect: ['M', 'F'],
		validations: {
			errors: [],
		},
	}),
	methods: {
		signUp() {
			AuthRepository.signUp(
				this.user.email,
				this.user.password
			)
			.then(() => {
				this.createUserDB()
				return this.$router.replace('/todolist')
			})
			.catch((err) => {
				if(err.code == 'auth/email-already-in-use') {
					this.validations.errors.push(
						`<strong>Email já cadastrado</strong>`
					)
				}
			})
		},
		createUserDB() {
			UserRepository.create({
				name: this.user.name,
				age: this.user.age,
				sex: this.user.sex,
				role: 'Default',
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		},
		validate() {
			if(!this.user.name) {
				this.validations.errors.push(
					`<strong>Campo "Nome", não pode estar vazio</strong>`
				)
			}
			if(this.user.name) {
				if(this.user.name.length <= 2) {
					this.validations.errors.push(
						`<strong>Campo "Nome", obrigário ter no minimo 3 letras</strong>`
					)
				}
			}

			if(!this.user.age) {
				this.validations.errors.push(
					`<strong>Campo "Idade", não pode estar vazio</strong>`
				)
			}
			if(this.user.age) {
				if(this.user.age.length >= 4) {
					this.validations.errors.push(
						`<strong>Campo "Idade", não pode ter mais que 3 caracteres</strong>`
					)
				}
			}

			if(!this.user.sex) {
				this.validations.errors.push(
					`<strong>Campo "Sexo", não pode estar vazio</strong>`
				)
			}

			if(this.user.email) {
				if(/.+@.+\..+/.test(this.user.email) !== true) {
					this.validations.errors.push(
						`<strong>Coloque um email valido</strong>`
					)
				}
			}
			if(!this.user.email) {
				this.validations.errors.push(
					`<strong>Campo "Email", não pode estar vazio</strong>`
				)
			}

			if(!this.user.password) {
				this.validations.errors.push(
					`<strong>Campo "Senha", não pode estar vazio</strong>`
				)
			}
			if(this.user.password) {
				if(/.{6,}/.test(this.user.password) !== true) {
					this.validations.errors.push(
						`<strong>Sua senha precisa de no minimo 6 caracteres</strong>`
					)
				}
				if(!this.user.passwordConfirm) {
						this.validations.errors.push(
								`<strong>Campo de comparação de senha obrigatorio</strong>`
						)
				}
				if(this.user.passwordConfirm !== this.user.password) {
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

	@media (max-width: 959.98px) {
		height: 100%;
	}
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
