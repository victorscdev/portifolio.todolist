<template>
    <section id="toDoList">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <h1>Minhas Tarefas</h1>
                </v-col>
                <v-col cols="12" md="10">
                    <v-text-field
                        label="Nova Tafera"
                        placeholder="Escreva uma tarefa"
                        v-model="firebase.database.task.name"
                        @keyup.enter="setTaskDatabase"
                        >
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                    <v-btn
												class="btn-add"
                        large
                        @click="setTaskDatabase"
                        >Adicionar
                    </v-btn>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
									<div class="box-card">
                    <v-card class="v-card" v-for="item in firebase.database.tasks" :key="item.id">
                        <div class="view-task">
                            <h2>{{ item.name }}</h2>
                            <v-text-field
                                placeholder="Edite sua tarefa!"
                                v-model="firebase.database.task.updataName[item.id]"
                                >
                            </v-text-field>
														<div class="box-btn">
															<v-btn color="primary" class="btn-edit" @click="putTaskDatabase(item.id)">
																	<v-icon>mdi-pen</v-icon>
																	Editar
															</v-btn>
															<v-btn color="red" class="btn-edit" @click="deleteTaskDatabase(item.id)">
																	<v-icon>mdi-delete</v-icon>
																	Deletar
															</v-btn>
														</div>
                        </div>
                    </v-card>
									</div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import firebase from "firebase/app"
import db from '../../plugins/firebse'


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
        h1 {
            color: #121623;
        }
				.btn-add {
            background-color: #1aa5ba;
            color: #f4f4f4;
						width: 100%;
						@media (max-width: 959.98px) {
							width: auto;
						}
        }
				.box-card {
					display: -webkit-box;
					align-items: center;
					flex-wrap: wrap;
					@media (max-width: 959.98px) {
						display: flex;
					}
					.v-card {
							display: flex;
							padding: 24px;
							margin-bottom: 16px;
							margin-top: 16px;
							margin-left: 0;
							margin-right: 12px;
							width: calc(50% - 24px);
							&:nth-of-type(2n) {
								margin-right: 0;
								margin-left: 12px;
								width: 50%;
							}
							@media (max-width: 959.98px) {
								margin-right: 0;
								margin-left: 0;
								width: 100%;
								&:nth-of-type(2n) {
									margin-left: 0;
									width: 100%;
								}
							}

							.view-task {
								display: flex;
								flex-direction: column;
								width: 100%;
									h2 {
											text-align: left;
									}
									.box-btn {
										display: flex;
										width: 100%;
										flex-wrap: wrap;

										.btn-edit {
											margin-right: 8px;
											@media (max-width: 599.98px) {
												display: flex;
												margin-right: 0;
												margin-bottom: 8px;
												width: 100%;
											}
										}
									}
							}

							.v-input {
									margin-top: 0;
									padding-top: 0;
							}
					}
				}
    }
</style>
