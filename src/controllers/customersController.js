import connection from "../db.js";

async function getCustomers(req, res) {
  try {
    const users = await connection.query("SELECT * from categories;");
    res.status(200).send(users.rows);
  } catch (err) {
    console.log(err.message);
  }
}

async function postCustomer(req, res) {
  const { name } = req.body;
  try {
    await connection.query("INSERT INTO categories(name) VALUES($1);", [name]);
    res.sendStatus(201);
  } catch (err) {
    console.log(err.message);
  }
}

export { getCustomers, postCustomer };
