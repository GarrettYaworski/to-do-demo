const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
let id = 5;
const myToDos = [
  {id: 1,  text: 'build server'},
  {id: 2,  text: 'build ui'},
  {id: 3,  text: 'connect the dots'},
  {id: 4,  text: 'delete request'},
];

app.get('/api/todos', (req, res) => {
  res.status(200).send(myToDos);
})

app.post('/api/todos', (req, res) => {
  const { todo } = req.body;
  myToDos.push({id , text: todo});
  res.status(200).send(myToDos);
  id++
})


app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const deleteIndex = myToDos.findIndex((todo) => +todo.id === +id);
  myToDos.splice(deleteIndex, 1);
  res.status(200).send(myToDos);
})

app.put('/api/todos', (req, res) => {
  const { id, text } = req.body;
  const editIndex = myToDos.findIndex((todo) => +todo.id === +id);
  myToDos[editIndex].text = text;
  res.status(200).send(myToDos);
})

app.listen(4090, () => console.log('listening on port 4090'));
