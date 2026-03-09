const express = require('express');
const clientes = require("./routes/clientes")

const app = express();

app.use(express.json())
app.use("/clientes", clientes)

app.get("/", (req, res) =>  {
    res.send("API funcionando")
})

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})