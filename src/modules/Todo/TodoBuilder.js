class TodoBuilder {
	prepareTask(response) {
		const tasks = [];
		response.forEach((doc) => {
			const task = {
					id: doc.id,
					name: doc.data().name,
			}
			tasks.push(task)
		});
		return tasks;
	}
}

export default new TodoBuilder();
