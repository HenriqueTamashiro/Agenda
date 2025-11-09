const Contato = require('../models/ContatoModel');

exports.index = async (req,res) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', {contatos});//caso queria valor específico, utilizar chave: valor 
};

