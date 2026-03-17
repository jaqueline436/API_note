const db = require("../database/db");

exports.listar = ()=>{
return new Promise((resolve,reject)=>{
db.all(`
SELECT m.id,
c.nome as cliente,
p.nome as produto,
v.nome as vendedor,
m.tipo,
m.data
FROM movimentacoes m
JOIN clientes c ON c.id = m.cliente_id
JOIN produtos p ON p.id = m.produto_id
JOIN vendedores v ON v.id = m.vendedor_id
`,[],(err,rows)=>{
if(err) reject(err);
resolve(rows);
});
});
};

exports.criar = (mov)=>{
return new Promise((resolve,reject)=>{
db.run(
"INSERT INTO movimentacoes(cliente_id,produto_id,vendedor_id,tipo,data) VALUES (?,?,?,?,?)",
[mov.cliente_id,mov.produto_id,mov.vendedor_id,mov.tipo,mov.data],
function(err){
if(err) reject(err);
resolve({id:this.lastID});
}
);
});
};