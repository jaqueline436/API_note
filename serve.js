const express = require('express');
const clientes = require("./routes/clientes")
const vendedores = require("./routes/vendedores")
const produtos = require("./routes/produtos")
const movimentacoes = require("./routes/movimentacoes")



const app = express();

app.use(express.json())
app.use("/clientes", clientes)
app.use("/vendedores", vendedores)
app.use("/produtos", produtos)
const movimentacoes = require("./routes/movimentacoes")


app.get("/", (req, res) =>  {
    res.send("API funcionando")
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})