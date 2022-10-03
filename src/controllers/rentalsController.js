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
      "SELECT * FROM rentals WHERE gameId=$1;",
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
      `INSERT INTO rentals("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee");`,
      [
        customerId,
        gameId,
        daysRented,
        originalPrice,
        rentDate,
        returnDate,
        delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { postRentals };
