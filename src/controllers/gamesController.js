import connection from "../db.js";
import { gamesSchema } from "../schemas/gamesSchema.js";

async function getGames(req, res) {
  const { name } = req.query;

  try {
    if (name) {
      const games = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name LIKE $1`,
        [name + "%"]
      );
      res.status(200).send(games.rows);
    } else {
      const games = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id;
          `
      );
      res.status(200).send(games.rows);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function postGames(req, res) {
  const validation = gamesSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).send(validation.error.details.map((item) => item.message));
    return;
  }

  const { name, image, stockTotal, pricePerDay, categoryId } = req.body;
  try {
    const categorie = await connection.query(
      "SELECT * FROM categories WHERE id=$1",
      [categoryId]
    );
    if (categorie.rows.length === 0) {
      res.sendStatus(400);
      return;
    }

    const games = await connection.query(`SELECT name FROM games;`);
    let ret = false;
    games.rows.forEach((item) => {
      if (name === item.name) {
        ret = true;
        console.log("True");
      }
    });

    if (ret) {
      res.sendStatus(409);
      return;
    }

    await connection.query(
      `INSERT INTO games(name, image, "stockTotal", "pricePerDay", "categoryId") VALUES($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, pricePerDay, categoryId]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { getGames, postGames };
