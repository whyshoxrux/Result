import {
  readFileJSON,
  writeFileJSON,
} from "../../common/service/fayl.service.js";

const MANZIL = "./todo.json";

export async function addToDo(req, res) {
  try {
    const todo = req.body;
    todo.id = Math.round(Math.random() * 10000);
    const todos = await readFileJSON(MANZIL);
    
    if (!todos) {
      await writeFileJSON(MANZIL, [todo]);
    } else {
      todos.push(todo);
      await writeFileJSON(MANZIL, todos);
    }
    res.send("ToDo succesfully added🫡");
  } catch (err) {
    console.log(err);
    res.send("There's something wrong");
  }
}
export async function getAllToDos(req, res) {
  try {
    const todos = await readFileJSON(MANZIL);
    res.send(todos);
  } catch (err) {
    res.send("Something wrong in getting all todo");
  }
}

export async function getTodo(req, res) {
  try {
    const { id } = req.params;
    const todos = await readFileJSON(MANZIL);
    res.send(todos.find((todo) => todo.id === parseInt(id)));
  } catch (err) {
    res.send("Something wrong in getting todo");
  }
}
export async function updateToDo(req, res) {
  try {
    const { id } = req.params;
    const todo = req.body;
    const todos = await readFileJSON(MANZIL);
    const index = todos.findIndex((todo) => todo.id === parseInt(id));
    if (index < 0) {
      return res.send("We can't update weather🥲");
    }
    todos[index] = { ...todos[index], ...todo };
    await writeFileJSON(MANZIL, todos);
    res.send(todos[index]);
  } catch (err) {
    res.send("Something wrong in updating todo");
  }
}
export async function deleteToDo(req, res) {
  try {
    const { id } = req.params;
    const todos = await readFileJSON(MANZIL);
    const index = todos.findIndex((todo) => todo.id === parseInt(id));
    if (index < 0) {
      return res.send("We couldn't find object🥲");
    }
    todos.splice(index, 1);
    await writeFileJSON(MANZIL, todos);
    res.send("ToDo succesfully removed");
  } catch (err) {
    res.send("Something wrong in removing todo");
  }
}
