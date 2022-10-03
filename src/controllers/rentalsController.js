import connection from "../db.js";
import { rentalsSchema } from "../schemas/rentalsSchema.js";
import dayjs from "dayjs";

async function postRentals(req, res) {
  const validation = rentalsSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).send(validation.error.details.map((item) => item.message));
    return;
  }

  const { customerId, gameId, daysRented } = req.body;
  let originalPrice = null;
  let stockTotal = null;
  let qt_rentals = null;

  try {
    const user = await connection.query(
      "SELECT * FROM customers WHERE id=$1;",
      [customerId]
    );

    if (user.rows.length === 0) {
      res.sendStatus(400);
      return;
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  try {
    const game = await connection.query("SELECT * FROM games WHERE id=$1;", [
      gameId,
    ]);

    if (game.rows.length === 0) {
      res.sendStatus(400);
      return;
    }

    originalPrice = daysRented * game.rows[0].pricePerDay;
    stockTotal = game.rows[0].stockTotal;
  } catch (err) {
    res.status(500).send(err.message);
  }

  try {
    const rentals = await connection.query(
      `SELECT * FROM rentals WHERE "gameId"=$1;`,
      [gameId]
    );

    qt_rentals = rentals.rows.length;
    if (qt_rentals >= stockTotal) {
      res.sendStatus(400);
      return;
    }
  } catch (err) {
    res.status(500).send(err.message);
  }

  const rentDate = dayjs().format("YYYY-MM-DD");
  const returnDate = null;
  const delayFee = null;
  try {
    await connection.query(
      `INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES($1, $2, $3, $4, $5, $6, $7);`,
      [
        customerId,
        gameId,
        rentDate,
        daysRented,
        returnDate,
        originalPrice,
        delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getRentals(req, res) {
  try {
    const rentals =
      await connection.query(`SELECT rentals.*, customers.id AS customerId, customers.name AS customerName, games.id AS gameId, games.name AS gameName, games."categoryId", games."categoryId", categories.name AS categoryName FROM rentals JOIN customers ON rentals."customerId"=customers.id JOIN games ON rentals."gameId"=games.id JOIN categories ON categories.id=games."categoryId";
      `);

    const final = [];
    rentals.rows.forEach((item) => {
      const customer = {
        id: item.customerid,
        name: item.customername,
      };
      const game = {
        id: item.gameid,
        name: item.gamename,
        categoryId: item.categoryId,
        categoryName: item.categoryname,
      };

      delete item.customerid;
      delete item.customername;
      delete item.gameid;
      delete item.gamename;
      delete item.categoryId;
      delete item.categoryname;

      item = {
        ...item,
        customer,
        game,
      };
      final.push(item);
    });

    res.status(200).send(final);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function deleteRentals(req, res) {
  const { id } = req.params;
  try {
    const rental = await connection.query(
      "SELECT * from rentals WHERE id=$1;",
      [id]
    );
    if (rental.rows.length === 0) {
      res.sendStatus(404);
      return;
    }

    if (rental.rows[0].returnDate != null) {
      res.sendStatus(400);
      return;
    }

    await connection.query("DELETE FROM rentals WHERE id=$1;", [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { postRentals, getRentals, deleteRentals };
