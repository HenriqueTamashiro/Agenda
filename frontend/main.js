import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/Login';
import Contato from './modules/Contato';

const contato = new Contato('.form-contato');
contato.init();

const login = new Login('.form-login');
const cadastro = new Login('.form-cadastro');
login.init();
cadastro.init();


/*
boilerplate

Esse conjunto de imports é necessário para inicializar seu projeto corretamente — 
mas você quase nunca altera eles diretamente.
 Por isso, ele é considerado boilerplate: código padrão para garantir que tudo funcione.
*/