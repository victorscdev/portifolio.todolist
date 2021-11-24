<template>
    <v-main id="pageSignUp">
        <v-container>
            <v-row>
                <v-col offset-md="2" md="8" cols="12">
                    <div v-if="validationErrors.length" class="notification is-danger is-light">
                        <button @click="resetError()" class="delete">Fechar</button>
                        <div class="content">
                            <h4>Please resolve the following error(s) before proceeding.</h4>
                            <ul style="margin-top:0.3em; margin-left: 1em">
                                <li
                                v-for="(error, index) in validationErrors"
                                :key="`error-${index}`"
                                v-html="error"
                                />
                            </ul>
                        </div>
                    </div>
                    <div class="card-register">
                        <div class="card-register-body">
                            <h1>Cadastrar</h1>
                            <hr>

                            <v-row>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        type="text" 
                                        label="Nome" 
                                        placeholder="Seu nome"
                                        v-model="firebase.database.setUser.name"
                                        >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        type="text" 
                                        label="Idade" 
                                        placeholder="Sua idade"
                                        v-model="firebase.database.setUser.age"
                                        >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-select
                                        :items="sexSelect"
                                        label="Sexo" 
                                        v-model="firebase.database.setUser.sex"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        type="email" 
                                        label="Email" 
                                        placeholder="email@email.com"
                                        v-model="firebase.database.setUser.email"
                                        >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        type="password" 
                                        label="Senha"
                                        v-model="firebase.database.setUser.password"
                                        >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field 
                                        type="password" 
                                        label="Confirmar Senha"
                                        placeholder="Coloque a mesma senha que está acima"
                                        v-model="firebase.database.setUser.passwordRepeat"
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
    </v-main>
</template>

<script>
import firebase from 'firebase/app'
import db from '../../../plugins/firebse'

export default {
    name: "SignUp",
    data: () => ({
        firebase: {
            database: {
                userCollection: db.collection('Users'),
                setUser: {
                    name: '',
                    age: '',
                    sex: '',
                    email: '',
                    password: '',
                    passwordRepeat: '',
                }
            },
            authentication: {
                fireAuth: firebase.auth(),
                userUID: '',
            }
        },
        validationErrors: [],
        sexSelect: ['M', 'F'],
    }),
    methods: {
        resetError() {
            this.validationErrors = [];
        },
        validate() {
            this.resetError();
            if (!this.firebase.database.setUser.email) {
                this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
            }
            if (/.+@.+/.test(this.firebase.database.setUser.email) != true) {
                this.validationErrors.push("<strong>E-mail</strong> must be valid.");
            }
            if (!this.firebase.database.setUser.password) {
                this.validationErrors.push("<strong>Password</strong> cannot be empty");
            }
            if (/.{6,}/.test(this.firebase.database.setUser.password) != true) {
                this.validationErrors.push(
                "<strong>Password</strong> must be at least 6 characters long"
                );
            }
            if ((this.firebase.database.setUser.password !== this.firebase.database.setUser.passwordRepeat)) {
                this.validationErrors.push("<strong>Passwords</strong> did not match");
            }
            if (this.validationErrors.length <= 0) {
                this.signUp();
            }
        },
        signUp: function() {
            this.firebase.authentication.fireAuth
                .createUserWithEmailAndPassword(
                    this.firebase.database.setUser.email, 
                    this.firebase.database.setUser.password
                )
                .then((userCredential) => {
                    JSON.stringify(userCredential)
                    this.firebase.authentication.userUID = userCredential.user.uid
                    this.setUserFromDatabase()
                    return this.$router.replace('/todolist')
                })
                .catch((error) => {
                    alert(error)
                })
        },
        setUserFromDatabase() {
            this.firebase.database.userCollection
                .doc(this.firebase.authentication.userUID)
                .set({
                    name: this.firebase.database.setUser.name,
                    age: this.firebase.database.setUser.age,
                    sex: this.firebase.database.setUser.sex,
                    email: this.firebase.database.setUser.email,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
        }
    },
    
}
</script>

<style scoped lang="scss">
    #pageSignUp {
        background: #45090c;
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
            background: #e3d9ed;
            border: 1px solid #7a090d;
            border-radius: 8px;
            padding: 24px 0 0;
            overflow: hidden;

            .card-register-body {
                padding: 0 24px 24px;

                h1 {
                    color: #7a090d;
                    text-align: center;
                }

                hr {
                    border-color: #7a090d;
                    margin-bottom: 40px;
                }

                .v-input {

                    &.primary {

                        &--text {
                            color: #207fd8 !important;
                            caret-color: #207fd8 !important;
                        }
                    }
                }

                .v-btn {

                    &.primary {
                        background-color: #207fd8 !important;
                        border-color: #207fd8 !important;
                    }
                }
            }

            .card-register-footer {
                background: #7a090d;
                border-radius: 0 0 8px 8px;
                display: flex;
                align-items: center;
                padding: 24px;

                small {
                    color: #e3d9ed;
                }

                .v-btn {
                    color: #e3d9ed;
                    font-size: 80%;
                    margin-left: 8px;
                    text-decoration: underline;

                    &:hover {
                        color: #207fd8;
                    }
                     &.primary {
                        background-color: #45090c !important;
                        border-color: #45090c !important;
                    }
                }
            }
        }
    }
</style>