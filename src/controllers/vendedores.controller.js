const service = require("../services/vendedores.service");

exports.listar = async (req,res)=>{
    const dados = await service.listar();
    res.json(dados);
};

exports.criar = async (req,res)=>{
    const dados = await service.criar(req.body);
    res.json(dados);
};

exports.atualizar = async (req,res)=>{
    const dados = await service.atualizar(req.params.id,req.body);
    res.json(dados);
};

exports.deletar = async (req,res)=>{
    const dados = await service.deletar(req.params.id);
    res.json(dados);
};