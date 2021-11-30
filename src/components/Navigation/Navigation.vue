<template>
    <div>
        <!-- TOP BAR -->
        <v-app-bar
            id="topBar"
            elevation="8"
            height="80"
            :clipped-left="clipped"
            fixed
            app
        >
            <v-btn
                id="btnMenu" 
                @click.stop="handleDrawer" 
                elevation="4"
                fab 
                icon
            >
                <v-icon>mdi-menu</v-icon>
            </v-btn>

            <v-spacer></v-spacer>

            <div class="card-avatar">
                <v-avatar
                    class="v-avatar"
                    size="48"
                >
                    {{ firebase.database.userSigla }}
                </v-avatar>
                <div class="menu-user">
                    <h2>
                        <span>Olá,</span>
                        {{ firebase.database.userName }}
                    </h2>
                    <a @click.prevent="signOut" class="btn-sair">Sair</a>
                </div>
            </div>
        </v-app-bar>

        <!-- LEFT BAR -->
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
            id="navbar"
        >
            <v-list-item>
                <v-list-item-content>
                    <router-link to="/todolist" class="router-link">
                        <v-img
                            contain
                            src="../../assets/img/logo_todolist.png" 
                            alt="Logo TodoList"
                        ></v-img>
                    </router-link>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list
                class="navigation-list"
                dense
                nav
            >
                <v-list-item
                v-for="(navigation, index) in navigations"
                :key="index"
                link
                >
                <router-link class="navigation-router" :to="navigation.link">
                    <v-list-item-icon>
                        <v-icon>{{ navigation.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ navigation.title }}</v-list-item-title>
                    </v-list-item-content>
                </router-link>

                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import firebase from "firebase/app"
import db from '../../plugins/firebse'

export default {
    name: 'Navbar',
    data: () => ({
        firebase: {
            database: {
                userCollection: db.collection('Users'),
                user: [],
                userName: '',
                userSigla: '',
            },
            authentication: {
                fireAuth: firebase.auth(),
                userUID: '',
            }
        },
        navigations: [
            {
                link: '/todolist',
                title: 'Minhas Tarefas', 
                icon: 'mdi-checkbox-marked-circle-plus-outline' 
            },
            {
                link: '/myaccount',
                title: 'Minha Conta', 
                icon: 'mdi-account' 
            },
        ],
        clipped: true,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: null,
    }),
    methods: {
        handleDrawer() {
            if (this.drawer == true) {
                this.drawer = false;
            } else if (this.drawer == false) {
                this.drawer = true;
            }
        },
        getUserDatabase() {
            this.firebase.database.userCollection
                .doc(this.firebase.authentication.userUID)
                .get()
                .then((querySnapshot) => {
                    let userName = querySnapshot.data().name
                    userName = userName.split(' ')

                    let userFirstSigla = querySnapshot.data().name
                    let userSecondSigla = querySnapshot.data().name
                    if(userName.length == 1) {
                        userFirstSigla = userFirstSigla.split(' ')
                        userFirstSigla = userFirstSigla[0].split('')
                        userSecondSigla = userSecondSigla.split(' ')
                        userSecondSigla = userSecondSigla[0].split('')
                        this.firebase.database.userSigla = `${userFirstSigla[0]}${userSecondSigla[1]}`

                    } else if(userName.length >= 2) {
                        userFirstSigla = userFirstSigla.split(' ')
                        userFirstSigla = userFirstSigla[0].split('')
                        userSecondSigla = userSecondSigla.split(' ')
                        userSecondSigla = userSecondSigla[1].split('')
                        this.firebase.database.userSigla = `${userFirstSigla[0]}${userSecondSigla[0]}`
                    }
                    this.firebase.database.userName = userName[0]
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        },
        loggedInUser() {
            this.firebase.authentication.fireAuth
                .onAuthStateChanged((user) => {
                    this.firebase.authentication.userUID = user.uid
                })
        },
        signOut() {
            this.firebase.authentication.fireAuth
                .signOut()
                .then(() => {
                    window.location.reload(true)
                    setTimeout(() => {
                        this.$router.replace('/login')
                    }, 500);
                    window.location.reload(true)
                })
        },
    },
    mounted() {
        this.loggedInUser()
        setTimeout(() => {
            this.getUserDatabase()
        }, 1);
    }
}
</script>

<style lang="scss" scoped>
    #topBar {
        background: #121623;
        padding: 0 24px 0;
        width: 100%;
        .v-toolbar__content {
            display: flex;
            align-items: center;
            #btnMenu {
                color: #f4f4f4;
            }
            .card-avatar {
                display: flex;
                align-items: center;
                .v-avatar {
                    background: #20dad8
                }
                .menu-user {
                    margin-left: 8px;
                    h2 {
                        color: #f4f4f4;
                        span {
                            font-weight: 100;
                        }
                    }
                    .btn-sair {
                        color: #20dad8;
                        transition: .2s ease;
                        &:hover {
                            color: #f4f4f4;
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
    #navbar {
        background: #121623;
        height: 100vh;
        padding: 24px;
        width: 200px;
        position: fixed;
        top: 64px;
        left: 0;

        .v-list-item__content {
            .router-link {
                width: 100%;
            }
        }
        hr[role="separator"] {
            border-color: #f4f4f4;
        }
        
        .navigation-list {
            .navigation-router {
                display: flex;
                align-items: center;
                text-decoration: none;
                .v-list-item__icon {
                    .v-icon {
                        background: #121623;
                        color: #f4f4f4;
                    }
                }
                .v-list-item__title {
                    color: #f4f4f4;
                }
            }
        }
    }
</style>