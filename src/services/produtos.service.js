const db = require("../database/db");

exports.listar = ()=>{
return new Promise((resolve,reject)=>{
    db.all("SELECT * FROM produtos",[],(err,rows)=>{
        if(err) reject(err);
        resolve(rows);
    });
});
};

exports.criar = (produto)=>{
return new Promise((resolve,reject)=>{
    db.run(
        "INSERT INTO produtos(nome,preco) VALUES (?,?)",
        [produto.nome,produto.preco],
        function(err){
            if(err) reject(err);
            resolve({id:this.lastID});
        }
    );
});
};

exports.atualizar = (id,produto)=>{
return new Promise((resolve,reject)=>{
    db.run(
        "UPDATE produtos SET nome=?,preco=? WHERE id=?",
        [produto.nome,produto.preco,id],
        function(err){
            if(err) reject(err);
            resolve({alterado:this.changes});
        }
    );
});
};

exports.deletar = (id)=>{
return new Promise((resolve,reject)=>{
    db.run(
        "DELETE FROM produtos WHERE id=?",
        id,
        function(err){
            if(err) reject(err);
            resolve({removido:this.changes});
        }
    );
});
};