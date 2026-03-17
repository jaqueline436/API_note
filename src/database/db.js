const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database.db", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("Banco SQLite conectado");
});

db.serialize(() => {

db.run(`
CREATE TABLE IF NOT EXISTS clientes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT,
email TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS vendedores (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS produtos (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome TEXT,
preco REAL
)
`);

db.run(`
CREATE TABLE IF NOT EXISTS movimentacoes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
cliente_id INTEGER,
produto_id INTEGER,
vendedor_id INTEGER,
tipo TEXT,
data TEXT
)
`);

});

module.exports = db;