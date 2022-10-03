import connection from "../db.js";
import { categorieSchema } from "../schemas/categoriesSchema.js";

async function getCategories(req, res) {
  try {
    const users = await connection.query("SELECT * from categories;");
    res.status(200).send(users.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function postCategories(req, res) {
  const validation = categorieSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(422).send(validation.error.details.map((item) => item.message));
    return;
  }

  try {
    const categories = await connection.query("SELECT name FROM categories;");
    let ret = false;

    categories.rows.forEach((item) => {
      if (req.body.name === item.name) {
        res.sendStatus(409);
        ret = true;
      }
    });

    if (ret) {
      return;
    }

    await connection.query("INSERT INTO categories(name) VALUES($1);", [
      req.body.name,
    ]);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { getCategories, postCategories };
