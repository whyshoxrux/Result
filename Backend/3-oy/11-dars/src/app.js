import express from "express";
import { create } from "express-handlebars";
import getConfig from "./common/config/config.service.js";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import { initDatabase } from "./database/database.service.js";
import { pool } from "./database/database.service.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = getConfig("EXPRESS_PORT") || 3000;

const hbs = create({
  extname: ".handlebars",
  defaultLayout: "main",
});

function init() {
  initDatabase();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");

  app.set("views", path.join(__dirname, "views"));

  app.get("/register", (req, res) => {
    res.render("register", {layout: false})
  })
  app.post("/register", add);

  app.get("/get", async (req, res) => {
    const result = await pool.query(`SELECT * FROM users`);
    console.log(result.rows[0]);
    res.render("get", { layout: false });
  });


  async function add(req, res) {
    try {
      res.render("register", { layout: false });
      const newData = req.body;
      console.log(newData);
      
      await pool.query(
        `INSERT INTO users (first_name, second_name, phone, address) VALUES($1, $2, $3, $4) RETURNING *`,
        [
          newData.first_name,
          newData.second_name,
          newData.phone,
          newData.address,
        ]
      );
      console.log("Worked");
    } catch (err) {
      console.log("Error: " + err.message);
    }
  }

  app.listen(PORT, () => console.log(`Server ${PORT} da ishladi`));
}
init();
