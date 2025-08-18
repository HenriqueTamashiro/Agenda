const mongoose = require('mongoose');
const validator = require('validator');// chamando o validator

const ContatoSchema = new mongoose.Schema({//criando o esquema que o MongoDB utilizará para organizar os dados
    nome: {type: String, required:true},
    sobrenome: {type: String, required:false, default: ''},
    email: {type: String, required:false, default: ''},
    telefone: {type: String, required:false, default: ''},
    criadoEm: {type: Date, default: Date.now},
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);// o nome que será dado a tabela

function Contato(body) {// utilizando o constructor function //criando os contructors
    this.body = body;
    this.errors = [];// array que recebe as mensagens flashs(.flash())
    this.contato = null;
}


    Contato.prototype.register = async function() {
        this.validar();

        if(this.errors.length > 0 ) return;

        this.contato =  await ContatoModel.create(this.body)
    }


    Contato.prototype.validar= function(){
        console.log('Chegou em validar, esta função é chamada por outras diversar funções para validar')
            this.cleanUp();
            //Validação
            //E-mail válido
            if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')
                if(!this.body.nome) this.errors.push('Nome é obrigatório');
                if(!this.body.email && !this.body.telefone) {
                    this.errors.push('Envie pelo menos 1 tipo de contato.');
                };
            };



    Contato.prototype.cleanUp = function(){
        console.log('chamado dentro de validar()')
            for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
            } console.log('em seguida, seta o this.body com propriedades com o valor de this.body.nome e etc..., meio que "limpa" e prepara para uso novamente')
            this.body= {
                nome: this.body.nome,
                sobrenome: this.body.sobrenome,
                email: this.body.email,
                telefone: this.body.telefone,
            };

        }
    

    Contato.prototype.edit = async function (id) {
        console.log('em seguida, chama está função(Contato.prototype.edit) após exports.edit')
            if(typeof id !=='string') return;
            this.validar();
            if(this.errors.length > 0) return;
            this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
    }

    //Métodos estáticos(Não irão ao prototype, são isolados)
    Contato.buscaId = async function(id){
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findById(id);
        return contato;
    }

    
    Contato.buscaContatos = async function(){
        const contatos = await ContatoModel.find()//filtros utilizando{nome:}e etc...
        .sort({criadoEm: 1});//1 para ordem crescente e -1 para decrescente
        return contatos;
    }

    Contato.delete = async function(id){
        if(typeof id !== 'string') return;
        const contato = await ContatoModel.findOneAndDelete({_id: id});
        return contato
    }
module.exports = Contato;
