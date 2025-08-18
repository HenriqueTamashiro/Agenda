const validator = require('validator');

export default class login {
    constructor(formClass){
        this.form = document.querySelector(formClass);

    }
    init(){
        this.events();
    }
    events(){
        if(!this.form)return;
        this.form.addEventListener('submit',e =>{
            e.preventDefault();
            this.validate(e);
            }
        )
    }
    validate(e){
        const evento = e.target;
        const emailInput = evento.querySelector('input[name="email"]');
        const passInput = evento.querySelector('input[name="password"]');

        const emailContainer = evento.querySelector('.email-alert');
        const passContainer = evento.querySelector('.pass-alert');

        let errors = false;

        if(!validator.isEmail(emailInput.value)){
            emailContainer.innerHTML = ''
            const alerta =  document.createElement('div');
            alerta.classList.add('alert', 'alert-danger');
            alerta.textContent= 'E-mail Inválido';
            emailContainer.appendChild(alerta);         
    
            errors = true;
        }

        if(passInput.value.length < 3 || passInput.value.length > 50){
            passContainer.innerHTML = ''
            const alerta =  document.createElement('div');
            alerta.classList.add('alert', 'alert-danger');
            alerta.textContent= 'Senha inválida, maior do que 50 ou menor do que 3 caracteres';
            passContainer.appendChild(alerta);
            
            errors = true;
            
        }
        
        emailInput.addEventListener('input', () => emailContainer.innerHTML = '');
        passInput.addEventListener('input', () => passContainer.innerHTML = '');
        if(!errors)evento.submit();

    }
}