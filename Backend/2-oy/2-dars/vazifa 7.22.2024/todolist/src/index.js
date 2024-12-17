import { todos } from "./1.js";
const result = todos.find((item) => item.title === "Kitob o'qish");


result.is_completed = true;
console.log(result.title)
console.log(todos);