import express from "express";
import { Book } from "../../models/book.js"

export const bookApi = express.Router();

bookApi.get("/books", async (req, res) => {
    try {
        const resData = await Book.findAll();
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

        return res.json({ success: true, data: arrangedResData });
    } catch (err) {
        return res.json({ success: false, message: err.message });
    }
});

bookApi.post("/books", async (req, res) => {
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

bookApi.delete("/books/:id", async (req, res) => {
    const id = req.params.id;

    const resData = await Book.destroy({
        where: { id }
    });
    // console.log({ resData })

    return res.json(resData);
});

bookApi.put("/books/:id", async (req, res) => {
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

