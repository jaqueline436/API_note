const express = require("express")
const router = express.Router()
const db = require("../database/db")

// LISTAR todos vendedores
router.get("/", (req, res) => {
  db.all("SELECT * FROM vendedores", [], (err, rows) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.json(rows)
  })
})

// BUSCAR vendedor por ID
router.get("/:id", (req, res) => {
  const { id } = req.params

  db.get("SELECT * FROM vendedores WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.json(row)
  })
})

// CRIAR vendedor
router.post("/", (req, res) => {
  const { nome, email } = req.body

  db.run(
    "INSERT INTO vendedores (nome, email) VALUES (?, ?)",
    [nome, email],
    function (err) {
      if (err) {
        return res.status(500).json(err)
      }

      res.json({
        id: this.lastID,
        nome,
        email
      })
    }
  )
})

// ATUALIZAR vendedor
router.put("/:id", (req, res) => {
  const { id } = req.params
  const { nome, email } = req.body

  db.run(
    "UPDATE vendedores SET nome = ?, email = ? WHERE id = ?",
    [nome, email, id],
    function (err) {
      if (err) {
        return res.status(500).json(err)
      }

      res.json({
        mensagem: "Vendedor atualizado"
      })
    }
  )
})

// DELETAR vendedor
router.delete("/:id", (req, res) => {
  const { id } = req.params

  db.run("DELETE FROM vendedores WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json(err)
    }

    res.json({
      mensagem: "Vendedor removido"
    })
  })
})

module.exports = router