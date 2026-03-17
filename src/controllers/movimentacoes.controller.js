const service = require("../services/movimentacoes.service");

exports.listar = async (req,res)=>{
    const dados = await service.listar();
    res.json(dados);
};

exports.criar = async (req,res)=>{
    const dados = await service.criar(req.body);
    res.json(dados);
};