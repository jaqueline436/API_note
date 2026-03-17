const db = require("../database/db");

exports.listar = () =>{
    return new Promise((resolve,reject)=>{
        db.all("SELECT * FROM clientes",[],(err,rows)=>{
            if(err) reject(err);
            resolve(rows);
        });
    });
};

exports.criar = (cliente)=>{
    return new Promise((resolve,reject)=>{
        db.run(
        "INSERT INTO clientes(nome,email) VALUES (?,?)",
        [cliente.nome,cliente.email],
        function(err){
            if(err) reject(err);
            resolve({id:this.lastID});
        });
    });
};

exports.atualizar = (id,cliente)=>{
    return new Promise((resolve,reject)=>{
        db.run(
        "UPDATE clientes SET nome=?,email=? WHERE id=?",
        [cliente.nome,cliente.email,id],
        function(err){
            if(err) reject(err);
            resolve({alterado:this.changes});
        });
    });
};

exports.deletar = (id)=>{
    return new Promise((resolve,reject)=>{
        db.run(
        "DELETE FROM clientes WHERE id=?",
        id,
        function(err){
            if(err) reject(err);
            resolve({removido:this.changes});
        });
    });
};