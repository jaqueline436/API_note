const express = require("express");

const clientesRoutes = require("./routes/clientes.routes");
const vendedoresRoutes = require("./routes/vendedores.routes");
const produtosRoutes = require("./routes/produtos.routes");
const movimentacoesRoutes = require("./routes/movimentacoes.routes");

const app = express();

app.use(express.json());

app.use("/clientes", clientesRoutes);
app.use("/vendedores", vendedoresRoutes);
app.use("/produtos", produtosRoutes);
app.use("/movimentacoes", movimentacoesRoutes);

app.listen(3000, () => {
    console.log("API rodando na porta 3000");
});


// mt bao, proximo passo eh adicionar método PATCH para todas as rotas