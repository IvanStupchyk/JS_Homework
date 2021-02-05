import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

class Info extends Component {
    constructor() {
        super();

        this.task = this.tasks.find(task => task.id === this.request.id);
    }

    render() {
        return new Promise(resolve => {
            let html;

            if (this.task) {
                let {id, title, status, description} = this.task;

                if (description === '') {
                    description = 'No description';
                }

                function btnView(status) {
                    let linkEdit;

                    if (status === 'Done') {
                        linkEdit = '';
                    } else {
                        linkEdit = `<a class="task-info__btn-edit button" href="#/task/${id}/edit">Edit Task</a>`;
                    }

                    return linkEdit;
                }

                html = `
					<h1 class="page-title">Task Info</h1>
					
					<div class="task-info">
						<p>
							<b>Task Title:</b>
							${title}
						</p>
						<p>
							<b>Task Status:</b>
							${status}
						</p>
						<p>
						    <b>Task Description:</b>
						    ${description}
                        </p>
						
						<div class="task-info__buttons">
						    <a class="task-info__btn-back button" href="#/tasks">Back to List</a>
							${btnView(status)}
							
						</div>
					</div>
				`;
            } else {
                html = new Error404().render();
            }

            resolve(html);
        });
    }
}

export default Info;