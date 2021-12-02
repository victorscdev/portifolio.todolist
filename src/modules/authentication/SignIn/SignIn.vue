<template>
	<section id="pageSignIn">
		<v-container>
			<v-row>
				<v-col offset-md="3" md="6" cols="12">
					<div class="card-login">
						<div class="card-login-body">
							<h1>Logar</h1>
							<hr>
							<v-text-field
								v-model="fb.auth.email"
								type="email"
								label="Email"
								placeholder="email@email.com"
								>
							</v-text-field>

							<v-text-field
								v-model="fb.auth.password"
								type="password"
								label="Senha"
								>
							</v-text-field>
							<v-btn
								@click.prevent="validate"
								color="primary"
								elevation="4"
								block
							>
							Entrar
							</v-btn>
						</div>
						<div class="card-login-footer">
							<small>Não é cadastrado ?</small>
							<router-link to="/signup" class="v-btn">Click aqui!</router-link>
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

export default {
	name: 'SignIn',
	data: () => ({
		fb: {
			auth: {
				fireAuth: firebase.auth(),
				email: '',
				password: '',
			}
		},
		validations: {
			errors: [],
		},
	}),
	methods: {
		signIn() {
			this.fb.auth.fireAuth
				.signInWithEmailAndPassword(this.fb.auth.email, this.fb.auth.password)
				.then(() => {
					this.$router.replace('/todolist');
				})
				.catch((error) => {
					alert(error)
				})
		},
		validate() {
			if(this.fb.auth.email) {
					if(/.+@.+\..+/.test(this.fb.auth.email) !== true) {
					this.validations.errors.push(
						`<strong>Coloque um email valido</strong>`
					)
				}
			}
			if(!this.fb.auth.email) {
				this.validations.errors.push(
					`<strong>Campo "Email", não pode estar vazio</strong>`
				)
			}

			if(this.fb.auth.password) {
				if(/.{6,}/.test(this.fb.auth.password) !== true) {
					this.validations.errors.push(
						`<strong>Sua senha precisa de no minimo 6 caracteres</strong>`
					)
				}
			}
			if(!this.fb.auth.password) {
				this.validations.errors.push(
					`<strong>Campo "Senha", não pode estar vazio</strong>`
				)
			}

			if(this.validations.errors.length <= 0) {
				this.signIn()
			}
		},
		resetValidations() {
				this.validations.errors = [];
		},
	}
}
</script>

<style scoped lang="scss">
#pageSignIn {
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
		.card-login {
			background: #f4f4f4;
			border: 1px solid #121623;
			border-radius: 24px 0;
			padding: 24px 0 0;
			overflow: hidden;
			.card-login-body {
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
			.card-login-footer {
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
