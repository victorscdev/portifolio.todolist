<template>
    <v-main id="pageSignIn">
        <v-container>
            <v-row>
                <v-col offset-md="3" md="6" cols="12">
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
                    <div class="card-login">
                        <div class="card-login-body">
                            <h1>Logar</h1>
                            <hr>
                            <v-text-field 
                                v-model="email"
                                type="email" 
                                label="Email" 
                                placeholder="email@email.com"
                                >
                            </v-text-field>

                            <v-text-field 
                                v-model="password"
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
    </v-main>
</template>

<script>
import firebase from 'firebase/app'

export default {
    name: 'SignIn',
    data: () => ({
        email: '',
        password: '',
        validationErrors: [],
        firebaseError: "",
    }),
    methods: {
        resetError() {
            this.validationErrors = [];
        },
        validate() {
            this.resetError();
            if (!this.email) {
                this.validationErrors.push("<strong>E-mail</strong> cannot be empty.");
            }
            if (/.+@.+/.test(this.email) != true) {
                this.validationErrors.push("<strong>E-mail</strong> must be valid.");
            }
            if (!this.password) {
                this.validationErrors.push("<strong>Password</strong> cannot be empty");
            }
            if (/.{6,}/.test(this.password) != true) {
                this.validationErrors.push(
                "<strong>Password</strong> must be at least 6 characters long"
                );
            }
            if (this.validationErrors.length <= 0) {
                this.signIn();
            }
        },
        signIn() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.replace('/todolist');
                })
        }
    }
}
</script>

<style scoped lang="scss">
    #pageSignIn {
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

        .card-login {
            background: #e3d9ed;
            border: 1px solid #7a090d;
            border-radius: 8px;
            padding: 24px 0 0;
            overflow: hidden;

            .card-login-body {
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

            .card-login-footer {
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