const express = require("express")
const router = express.Router()
const db = require("../database/db")

// LISTAR produtos
router.get("/", (req, res) => {
  db.all("SELECT * FROM produtos", [], (err, rows) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(rows)
    }
  })
})

// BUSCAR produto por ID
router.get("/:id", (req, res) => {
  const { id } = req.params

  db.get("SELECT * FROM produtos WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(row)
    }
  })
})

// CRIAR produto
router.post("/", (req, res) => {
  const { nome, preco, estoque } = req.body

  db.run(
    "INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)",
    [nome, preco, estoque],
    function (err) {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json({
          id: this.lastID,
          nome,
          preco,
          estoque
        })
      }
    }
  )
})

// ATUALIZAR produto
router.put("/:id", (req, res) => {
  const { id } = req.params
  const { nome, preco, estoque } = req.body

  db.run(
    "UPDATE produtos SET nome = ?, preco = ?, estoque = ? WHERE id = ?",
    [nome, preco, estoque, id],
    function (err) {
      if (err) {
        res.status(500).json(err)
      } else {
        res.json({ mensagem: "Produto atualizado" })
      }
    }
  )
})

// DELETAR produto
router.delete("/:id", (req, res) => {
  const { id } = req.params

  db.run("DELETE FROM produtos WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json({ mensagem: "Produto removido" })
    }
  })
})

module.exports = router