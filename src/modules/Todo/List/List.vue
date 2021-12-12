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
						v-model="task.name"
						@keyup.enter="createTaskDB"
					>
					</v-text-field>
				</v-col>
				<v-col cols="12" md="2">
					<v-btn
						class="btn-add"
						large
						@click="createTaskDB"
					>Adicionar
					</v-btn>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12">
					<div class="box-card">
						<v-card class="v-card" v-for="item in tasks" :key="item.id">
							<div class="view-task">
								<h2>{{ item.name }}</h2>
								<v-text-field
									placeholder="Edite sua tarefa!"
									v-model="task.updataName[item.id]"
								>
								</v-text-field>
								<div class="box-btn">
									<v-btn color="primary" class="btn-edit" @click="editTaskDB(item.id)">
										<v-icon>mdi-pen</v-icon>
										Editar
									</v-btn>
									<v-btn color="red" class="btn-edit" @click="deleteTaskDB(item.id)">
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
import TodoRepository from '../TodoRepository';
import TodoBuilder from '../TodoBuilder'

export default {
	name: 'List',
	data: () => ({
		tasks: [],
		task: {
				name: '',
				updataName: [],
		},
	}),
	methods: {
		createTaskDB() {
			TodoRepository.create({
				name: this.task.name,
				createdAt: new Date(),
				updatedAt: new Date(),
			})
			.then(() => {
				this.task.name =  ""
				this.tasks = []
				this.fetchAllTasksDB()
			})
			.catch((error) => {
				console.log(`Error: ${error}`);
			})
		},
		fetchAllTasksDB() {
			TodoRepository.fetchAll()
			.then((res) => {
				this.tasks = TodoBuilder.prepareTask(res)
			})
			.catch((error) => {
				console.log(`Error: ${error}`);
			});
		},
		editTaskDB(id) {
			TodoRepository.edit(id)
			.update({
				name: this.task.updataName[id],
				updatedAt: new Date(),
			})
			.then(() => {
				this.task.name =  ""
				this.task.updataName = []
				this.tasks = []
				this.fetchAllTasksDB()
			})
			.catch((error) => {
				console.log(`Error: ${error}`);
			})
		},
		deleteTaskDB(id) {
			TodoRepository.delete(id)
				.then(() => {
					alert(`Id ${id} deletado  com sucesso!`);
					this.task.name =  ""
					this.tasks = []
					this.fetchAllTasksDB()
				})
				.catch((error) => {
					console.log(`Error: ${error}`);
				});
		},
	},
	mounted() {
		this.fetchAllTasksDB();
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
