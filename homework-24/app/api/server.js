const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
	  fs = require('file-system'),
	  shortId = require('shortid'),
	  dbFilePath = 'tasks.json',
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.get('/api/tasks', (req, res) => res.send(getTasksFromDB()));

app.post('/api/task', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = req.body;

	console.log(req.body);
	task.id = shortId.generate();
	task.description = task.description || 'No Description';
	task.status = 'In Progress';

    tasksData.push(task);
    setTasksToDB(tasksData);

	res.send(task);
});

app.get('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = tasksData.find(task => task.id === req.params.id);
	// console.log(task)

    task ? res.send(task) : res.send({});
});

app.put('/api/task/:id', (req, res) => {
	const tasksData = getTasksFromDB(),
		task = tasksData.find(task => task.id === req.params.id),
		updatedTask = req.body;
	console.log(task)

	task.title = updatedTask.title;
	task.description = updatedTask.description || 'No Description';

    setTasksToDB(tasksData);

	res.sendStatus(204);
});

app.put('/api/taskDone', (req, res) => {
	const tasksData = getTasksFromDB(),
		idTask = req.body,
		task = tasksData.find(item => item.id === idTask.id);

	task.status = 'Done';

	setTasksToDB(tasksData);

	res.sendStatus(204);
});

app.delete('/api/taskRemove', (req, res) => {
	const tasksData = getTasksFromDB(),
		idTask = req.body,
		task = tasksData.filter(item => item.id !== idTask.id);

	setTasksToDB(task);

	res.sendStatus(204);
});

app.delete('/api/tasksDelete', (req, res) => {
	const tasksData = [];

	setTasksToDB(tasksData);

	res.sendStatus(204);
});


function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function setTasksToDB(tasksData) {
    fs.writeFileSync(dbFilePath, JSON.stringify(tasksData));
}

app.listen(3000, () => console.log('Server has been started...'));
