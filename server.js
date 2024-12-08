const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// In-memory todos
let todos = [
    // Example data structure
    // { id: 1, task: "Sample Task", completed: false }
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { todos });
});

app.post('/add', (req, res) => {
    const newTask = req.body.task.trim();
    if (newTask) {
        todos.push({ id: Date.now(), task: newTask, completed: false });
    }
    res.redirect('/');
});

app.post('/complete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
    );
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    todos = todos.filter(todo => todo.id !== id);
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});