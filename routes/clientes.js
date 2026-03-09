const express = require("express")
const router = express.Router()
const db = require("../database/db")

router.get("/", (req, res) => {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    res.json(rows)
  })
})

router.post("/", (req, res) => {
  const { nome, email } = req.body

  db.run(
    "INSERT INTO clientes (nome, email) VALUES (?, ?)",
    [nome, email],
    function (err) {
      res.json({ id: this.lastID })
    }
  )
})

module.exports = router