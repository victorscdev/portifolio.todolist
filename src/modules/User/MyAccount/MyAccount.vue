<template>
    <section id="MyAccount">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1>Minha Conta</h1>
                </v-col>
                <v-col cols="12">
                    <v-card
                        class="v-card"
                        elevation="6"
                        shaped
                    >
                        <h4>Edite seus dados!</h4>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    label="Seu Nome"
                                    placeholder="Digite seu nome"
                                    v-model="fb.db.updateUser.name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    label="Idade"
                                    placeholder="Sua idade"
                                    v-model="fb.db.updateUser.age"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select
                                    label="Sexo"
                                    v-model="fb.db.updateUser.sex"
                                    :items="sexSelect"
                                ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    type="email"
                                    label="Email"
                                    placeholder="exemplo@exemplo.com"
                                    v-model="fb.auth.user.email"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12" v-if="refectorPassword">
                    <v-card
                        class="v-card"
                        elevation="6"
                        shaped
                    >
                        <h4>Redefina a sua senha!</h4>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    type="password"
                                    label="Senha"
                                    placeholder="Digite sua senha"
                                    v-model="fb.auth.user.password"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                    type="password"
                                    label="Confirmar Senha"
                                    placeholder="Confirme sua senha"
                                    v-model="fb.auth.user.passwordConfirn"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
                <v-col cols="12">
									<div class="box-btn">
                    <v-btn elevation="5" class="btn-confirmar" @click.prevent="validateForm">Confirmar Edição</v-btn>
                    <v-btn elevation="5" color="red" class="btn-limpar" @click.prevent="clearForm">Limpar formulario</v-btn>
                    <v-btn elevation="5" color="primary" class="btn-redefinir" @click.prevent="refactorPassword" v-if="!refectorPassword">Redefinir senha</v-btn>
									</div>
                </v-col>
            </v-row>
        </v-container>

        <div class="modal-validation" v-if="validations.errors.length || validations.informations.length">
            <div class="overlay">
                <div class="modal-card">
                    <div class="modal-header">
                        <template v-if="validations.errors.length">
                            <h2>Algo deu errado!</h2>
                        </template>
                        <template v-if="validations.informations.length">
                            <h2>TodoList informa!</h2>
                        </template>
                        <v-btn elevation="5" icon @click.prevent="resetValidations">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                    <div class="modal-body">
                        <template v-if="validations.errors.length">
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
                        </template>
                        <template v-if="validations.informations.length">
                            <h4>Tem certeza que deseja atualizar os seguntes itens:</h4>
                            <ul>
                                <li
                                    class="information"
                                    v-for="(information, index) in validations.informations"
                                    :key="`information-${index}`"
                                    v-html="information"
                                >
                                </li>
                            </ul>
                            <div class="box-btn">
                                <v-btn class="btn-no" color="red" @click.prevent="resetValidations">Não</v-btn>
                                <v-btn class="btn-yes" @click.prevent="updateUser">Sim</v-btn>
                            </div>
                        </template>
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
    name: 'MyAccount',
    data: () => ({
        fb: {
            db: {
                userCollection: db.collection('Users'),
                updateUser: {
                    name: '',
                    age: '',
                    sex: '',
                }
            },
            auth: {
                currentUser: firebase.auth().currentUser,
                user: {
                    uid: firebase.auth().currentUser.uid,
                    email: firebase.auth().currentUser.email,
                    password: '',
                    passwordConfirn: '',
                }
            }
        },
        sexSelect: ["M", "F"],
        refectorPassword: false,
        validations: {
            errors: [],
            informations: [],
        },
    }),
    methods: {
        validateForm() {
            if(this.fb.db.updateUser.name) {
                if(this.fb.db.updateUser.name.length <= 2) {
                    this.validations.errors.push(
                        `<strong>Campo "Nome", obrigário ter no minimo 3 letras</strong>`
                    )
                } else {
                    this.validations.informations.push(
                        `<strong>Nome</strong>`
                    )
                }
            }
            if(this.fb.db.updateUser.age) {
                if(this.fb.db.updateUser.age.length >= 4) {
                    this.validations.errors.push(
                        `<strong>Campo "Idade", não pode ter mais que 3 caracteres</strong>`
                    )
                } else {
                    this.validations.informations.push(
                        `<strong>idade</strong>`
                    )
                }
            }
            if(this.fb.db.updateUser.sex) {
                this.validations.informations.push(
                    `<strong>Sexo</strong>`
                )
            }
            if(this.fb.auth.user.email) {
                if(/.+@.+\..+/.test(this.fb.auth.user.email) !== true) {
                    this.validations.errors.push(
                        `<strong>Coloque um email valido</strong>`
                    )
                } else {
                    this.validations.informations.push(
                        `<strong>Email</strong>`
                    )
                }
            }
            if(this.fb.auth.user.password) {
                if(/.{6,}/.test(this.fb.auth.user.password) !== true) {
                    this.validations.errors.push(
                        `<strong>Sua senha precisa de no minimo 6 caracteres</strong>`
                    )
                }
                if(!this.fb.auth.user.passwordConfirn) {
                    this.validations.errors.push(
                        `<strong>Campo de comparação de senha obrigatorio</strong>`
                    )
                }
                if(this.fb.auth.user.passwordConfirn !== this.fb.auth.user.password) {
                    this.validations.errors.push(
                        `<strong>Os campos de "Senha" e "Confirmar Senha" não estão iguais!</strong>`
                    )
                }
                else {
                    this.validations.informations.push(
                        `<strong>Senha</strong>`
                    )
                }
            }
        },
        getUserDatabase() {
            this.fb.db.userCollection
                .doc(this.fb.auth.user.uid)
                .get()
                .then((querySnapshot) => {
                    this.fb.db.updateUser.name = querySnapshot.data().name
                    this.fb.db.updateUser.age = querySnapshot.data().age
                    this.fb.db.updateUser.sex = querySnapshot.data().sex
                })
        },
        updateUserDatabase() {
            this.fb.db.userCollection
                .doc(this.fb.auth.user.uid)
                .update({
                    updatedAt: new Date(),
                    name: this.fb.db.updateUser.name,
                    age: this.fb.db.updateUser.age,
                    sex: this.fb.db.updateUser.sex,
                })
        },
        updateUserEmal() {
            this.fb.auth.currentUser
                .updateEmail(this.fb.auth.user.email)
        },
        updateUserPassword() {
            this.fb.auth.currentUser
                .updatePassword(this.fb.auth.user.password)
        },
        updateUser() {
            this.updateUserDatabase()
            if(this.fb.auth.user.email) {
                this.updateUserEmal()
            }
            if(this.fb.auth.user.password) {
                this.updateUserPassword()
            }
            setTimeout(() => {
                window.location.reload(true)
            }, 1000);
        },
        clearForm() {
            this.fb.db.updateUser.name = ''
            this.fb.db.updateUser.age = ''
            this.fb.db.updateUser.sex = ''
            this.fb.auth.user.email = ''
            this.fb.auth.user.password = ''
            this.fb.auth.user.passwordConfirn = ''
        },
        refactorPassword() {
            this.refectorPassword = true
        },
        resetValidations() {
            this.validations.errors = []
            this.validations.informations = []
        }
    },
    mounted() {
        this.getUserDatabase()
    }
}
</script>

<style lang="scss" scoped>
    #MyAccount {
        h1 {
            color: #121623;
        }

        .v-card {
            padding: 24px;
        }

				.box-btn {
					.btn-confirmar {
							background-color: #1aa5ba;
							color: #f4f4f4;
							margin-right: 8px;

							@media (max-width: 629.98px) {
								width: 100%;
								margin-bottom: 8px;
								margin-right: 0;
							}
					}
					.btn-limpar {
							margin-right: 8px;

							@media (max-width: 629.98px) {
								width: 100%;
								margin-bottom: 8px;
								margin-right: 0;
							}
					}
					.btn-redefinir {
							@media (max-width: 629.98px) {
								width: 100%;
							}
					}
				}

    }

</style>
