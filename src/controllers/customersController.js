import connection from "../db.js";
import { customersSchema } from "../schemas/customersSchema.js";
import dayjs from "dayjs";

async function getCustomers(req, res) {
  const { cpf } = req.query;

  try {
    let users;

    if (cpf) {
      users = await connection.query(
        "SELECT * from customers WHERE cpf LIKE $1",
        [cpf + "%"]
      );
    } else {
      users = await connection.query("SELECT * from customers;");
    }

    users.rows.forEach((item) => {
      item.birthday = dayjs(item.birthday).format("YYYY-MM-DD");
    });

    res.status(200).send(users.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function getOneCustomer(req, res) {
  const { id } = req.params;

  try {
    const user = await connection.query(
      "SELECT * from customers WHERE id = $1;",
      [id]
    );

    if (user) {
      res.status(200).send(user.rows[0]);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function postCustomer(req, res) {
  const validation = customersSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).send(validation.error.details.map((item) => item.message));
    return;
  }

  const { name, phone, cpf } = req.body;
  const birthday = dayjs(req.body.birthday).format("YYYY-MM-DD");

  try {
    const customer = await connection.query("SELECT cpf from customers;");
    let ret = false;
    customer.rows.forEach((item) => {
      if (cpf === item.cpf) {
        ret = true;
      }
    });
    if (ret) {
      res.sendStatus(409);
      return;
    }

    await connection.query(
      "INSERT INTO customers(name, phone, cpf, birthday) VALUES($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function updateCustomer(req, res) {
  const validation = customersSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).send(validation.error.details.map((item) => item.message));
    return;
  }

  const { id } = req.params;
  const { name, phone, cpf } = req.body;
  const birthday = dayjs(req.body.birthday).format("YYYY-MM-DD");

  try {
    const customers = await connection.query("SELECT * FROM customers;");
    let ret = false;
    customers.rows.forEach((item) => {
      if (id != item.id) {
        if (cpf === item.cpf) {
          ret = true;
        }
      }
    });

    if (ret) {
      res.sendStatus(409);
      return;
    }

    await connection.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;",
      [name, phone, cpf, birthday, id]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export { getCustomers, getOneCustomer, postCustomer, updateCustomer };
