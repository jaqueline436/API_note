const db = require("../database/db");

exports.listar = ()=>{
return new Promise((resolve,reject)=>{
    db.all("SELECT * FROM vendedores",[],(err,rows)=>{
        if(err) reject(err);
        resolve(rows);
    });
});
};

exports.criar = (vendedor)=>{
return new Promise((resolve,reject)=>{
    db.run(
        "INSERT INTO vendedores(nome) VALUES (?)",
        [vendedor.nome],
        function(err){
            if(err) reject(err);
            resolve({id:this.lastID});
        }
    );
});
};

exports.atualizar = (id,vendedor)=>{
return new Promise((resolve,reject)=>{
    db.run(
        "UPDATE vendedores SET nome=? WHERE id=?",
        [vendedor.nome,id],
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
        "DELETE FROM vendedores WHERE id=?",
        id,
        function(err){
            if(err) reject(err);
            resolve({removido:this.changes});
        }
    );
});
};