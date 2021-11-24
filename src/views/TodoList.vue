<template>
    <section id="toDoList">
        <v-container>
            <v-row>
                <v-col cols="10">
                    <v-text-field 
                        label="Nova Tafera" 
                        placeholder="Escreva uma tarefa"
                        v-model="firebase.database.task.name"
                        @keyup.enter="setTaskDatabase"
                        >
                    </v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn 
                        large color="primary" 
                        @click="setTaskDatabase"
                        >Adicionar
                    </v-btn>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-card class="v-card" v-for="item in firebase.database.tasks" :key="item.id">
                        <div class="view-task">
                            <h2>{{ item.name }}</h2>
                            <v-text-field
                                placeholder="Edite sua tarefa!"
                                v-model="firebase.database.task.updataName[item.id]"
                                >
                            </v-text-field>
                            <v-btn color="accent" @click="putTaskDatabase(item.id)">
                                <v-icon>mdi-pen</v-icon>
                                Editar
                            </v-btn>
                            <v-btn color="red" @click="deleteTaskDatabase(item.id)">
                                <v-icon>mdi-delete</v-icon>
                                Deletar
                            </v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import firebase from "firebase/app"
import db from '../plugins/firebse'


export default {
    name: 'TodoList',
    data: () => ({
        firebase: {
            database: {
                userCollection: db.collection('Users'),
                tasks: [],
                task: {
                    name: '',
                    updataName: [],
                },
            },
            authentication: {
                fireAuth: firebase.auth(),
                userUID: '',
            },
        },
    }),
    methods: {
        loggedInUser() {
            this.firebase.authentication.fireAuth
                .onAuthStateChanged((user) => {
                    this.firebase.authentication.userUID = user.uid
                })
        },
        setTaskDatabase() {
            if (this.firebase.database.task.name) {
                this.firebase.database.userCollection
                    .doc(this.firebase.authentication.userUID)
                    .collection('Tasks')
                    .doc()
                    .set({
                        name: this.firebase.database.task.name,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })
                    .then(() => {
                        this.firebase.database.task.name =  ""
                        this.firebase.database.tasks = []
                        this.getTastkDatabase()
                    })
                    .catch((error) => {
                        console.log(`Error: ${error}`);
                    })
            }
        },
        getTastkDatabase() {
            this.firebase.database.userCollection
                .doc(this.firebase.authentication.userUID)
                .collection('Tasks')
                .orderBy("createdAt", "desc")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const data = {
                            id: doc.id,
                            name: doc.data().name,
                        }
                        this.firebase.database.tasks.push(data)
                    });
                })
                .catch((error) => {
                    console.log(`Error: ${error}`);
                });
        },
        putTaskDatabase(id) {
            this.firebase.database.userCollection
                .doc(this.firebase.authentication.userUID)
                .collection('Tasks')
                .doc(id)
                .update({
                    name: this.firebase.database.task.updataName[id],
                    updatedAt: new Date(),
                })
                .then(() => {
                    this.firebase.database.task.name =  ""
                    this.firebase.database.task.updataName = []
                    this.firebase.database.tasks = []
                    this.getTastkDatabase()
                })
                .catch((error) => {
                    console.log(`Error: ${error}`);
                })
        },
        deleteTaskDatabase(id) {
            this.firebase.database.userCollection
                .doc(this.firebase.authentication.userUID)
                .collection('Tasks')
                .doc(id)
                .delete()
                .then(() => {
                    alert(`Id ${id} deletado  com sucesso!`);
                    this.firebase.database.task.name =  ""
                    this.firebase.database.tasks = []
                    this.getTastkDatabase()
                })
                .catch((error) => {
                    console.log(`Error: ${error}`);
                });
        },
        
    },
    mounted() {
        this.loggedInUser()
        setTimeout(() => {
            this.getTastkDatabase();
        }, 1);
    }
}
</script>

<style lang="scss" scoped>
    #toDoList {
        .v-card {
            display: flex;
            align-items: center;
            padding: 24px;
            margin-top: 16px;
            margin-bottom: 16px;
            
            .view-task {
                h2 {
                    text-align: left;
                }
            }

            .v-input {
                margin-top: 0;
                padding-top: 0;
            }
        }
    }
</style>