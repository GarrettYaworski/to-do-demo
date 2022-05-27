// ****************FETCH LIST CODE***********************
const fetchButton = document.querySelector('#fetch-list-button');

const handleDeleteButton = (id) => {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', () => {
    axios.delete(`http://localhost:4090/api/todos/${id}`)
    .then(appendToDos)
    .catch((err) => {
      console.log(err)
    })
  })
  return deleteButton;
}

const handleEditButton = (id) => {
  const editButton = document.createElement('button');
  editButton.innerText = "Edit";
  editButton.addEventListener('click', () => {
    const editInput = document.createElement('input');
    const sendEditButton = document.createElement('button');
    sendEditButton.innerText = 'Send Edit!'
    sendEditButton.addEventListener('click', () => {
      const body = {
        id,
        text: editInput.value
      }
      axios.put('http://localhost:4090/api/todos', body)
      .then(appendToDos)
      .catch((err) => {
        console.log(err)
      })
    })
    document.body.append(editInput, sendEditButton)
  })
  return editButton;
}

const appendToDos = ({ data }) => {
  const toDoContainer = document.getElementById('to-do-list');
  toDoContainer.innerHTML = '';
  data.forEach(({ text, id }) => {
    const todo = document.createElement('li');
    const todoText = document.createElement('span');
    const deleteButton = handleDeleteButton(id);
    const editButton = handleEditButton(id);
    todoText.innerText = text;
    todo.append(todoText, editButton, deleteButton);
    toDoContainer.appendChild(todo);
  });
}

fetchButton.addEventListener('click', () => {
  axios.get('http://localhost:4090/api/todos')
  .then(appendToDos)
  .catch((err) => {
    console.log(err)
  })
})


// ****************ADD TO LIST CODE***********************

const addToDoButton = document.getElementById('add-to-list-button');

addToDoButton.addEventListener('click',  () => {
  const todo = document.querySelector('input');
  axios.post('http://localhost:4090/api/todos', { todo: todo.value })
  .then((res) => {
    appendToDos(res)
    todo.value = '';
  })
  .catch((err) => {
    console.log(err)
  })
})