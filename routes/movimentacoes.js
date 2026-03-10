const express = require("express")
const router = express.Router()
const db = require("../database/db")

// LISTAR todas movimentações
router.get("/", (req, res) => {
  const query = `
    SELECT m.id, m.data, m.quantidade,
           c.nome as cliente_nome,
           v.nome as vendedor_nome,
           p.nome as produto_nome
    FROM movimentacoes m
    LEFT JOIN clientes c ON m.cliente_id = c.id
    LEFT JOIN vendedores v ON m.vendedor_id = v.id
    LEFT JOIN produtos p ON m.produto_id = p.id
    ORDER BY m.data DESC
  `

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.json(rows)
  })
})

// BUSCAR movimentação por ID
router.get("/:id", (req, res) => {
  const { id } = req.params
  const query = `
    SELECT m.id, m.data, m.quantidade,
           c.nome as cliente_nome,
           v.nome as vendedor_nome,
           p.nome as produto_nome
    FROM movimentacoes m
    LEFT JOIN clientes c ON m.cliente_id = c.id
    LEFT JOIN vendedores v ON m.vendedor_id = v.id
    LEFT JOIN produtos p ON m.produto_id = p.id
    WHERE m.id = ?
  `

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json(err)
    }
    res.json(row)
  })
})

// CRIAR movimentação
router.post("/", (req, res) => {
  const { cliente_id, vendedor_id, produto_id, quantidade, data } = req.body

  const query = `
    INSERT INTO movimentacoes (cliente_id, vendedor_id, produto_id, quantidade, data)
    VALUES (?, ?, ?, ?, ?)
  `

  db.run(query, [cliente_id, vendedor_id, produto_id, quantidade, data], function (err) {
    if (err) {
      return res.status(500).json(err)
    }

    res.json({
      id: this.lastID,
      cliente_id,
      vendedor_id,
      produto_id,
      quantidade,
      data
    })
  })
})

// ATUALIZAR movimentação
router.put("/:id", (req, res) => {
  const { id } = req.params
  const { cliente_id, vendedor_id, produto_id, quantidade, data } = req.body

  const query = `
    UPDATE movimentacoes
    SET cliente_id = ?, vendedor_id = ?, produto_id = ?, quantidade = ?, data = ?
    WHERE id = ?
  `

  db.run(query, [cliente_id, vendedor_id, produto_id, quantidade, data, id], function (err) {
    if (err) {
      return res.status(500).json(err)
    }

    res.json({ mensagem: "Movimentação atualizada" })
  })
})

// DELETAR movimentação
router.delete("/:id", (req, res) => {
  const { id } = req.params

  db.run("DELETE FROM movimentacoes WHERE id = ?", [id], function (err) {
    if (err) {
      return res.status(500).json(err)
    }

    res.json({ mensagem: "Movimentação removida" })
  })
})

module.exports = router