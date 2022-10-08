import express from "express";
import mysql from "mysql";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "minimun-react-mysql",
});

const sequelize = new Sequelize('minimun-react-mysql', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const Book = sequelize.define('Book', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  cover: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  // Other model options go here
  timestamps: false,
});

// `sequelize.define` also returns the model
console.log("`sequelize.define` also returns the model"); // true
console.log("Book === sequelize.models.Book", Book === sequelize.models.Book); // true

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", async (req, res) => {
  console.log("get /books")

  try {
    const resData = await Book.findAll();
    // console.log({ resData })

    let arrangedResData = [];
    resData.forEach(row => {
      arrangedResData.push(
        {
          "id": row.id,
          "title": row.title,
          "desc": row.desc,
          "price": row.price,
          "cover": row.cover ? row.cover : "https://www.publicdomainpictures.net/pictures/300000/nahled/empty-white-room.jpg"
        }
      );
    });
    // console.log({ arrangedResData })

    return res.json(arrangedResData);
  } catch (err) {
    console.error(err.message);
  }
});


app.post("/books", async (req, res) => {
  console.log("post /books")

  const { title, desc, price, cover } = req.body
  const inputData = { title, desc, price, cover }
  // console.log({ inputData })

  try {
    const resData = await Book.create(inputData);
    // console.log({ resData })

    return res.json(resData);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/books/:id", async (req, res) => {
  console.log("delete /books/:id")
  const id = req.params.id;

  const resData = await Book.destroy({
    where: { id }
  });
  // console.log({ resData })

  return res.json(resData);
});

app.put("/books/:id", async (req, res) => {
  console.log("put /books/:id")
  const id = req.params.id;
  const { title, desc, price, cover } = req.body
  const inputData = { title, desc, price, cover }
  // console.log({ inputData })

  const resData = await Book.update(inputData, {
    where: { id }
  });
  // console.log({ resData })

  return res.json(resData);
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
