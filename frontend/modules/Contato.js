const validator = require('validator')

export default class Contato {
    constructor(formContato){
        this.form = document.querySelector(formContato)
    }

    init(){
        this.events();
    }

    events(){

        if(!this.form)return;
        this.form.addEventListener('submit', e =>{
            e.preventDefault();
            this.validar(e);
        });
    };

    validar(e){
        const formEvent =  e.target;
        const nomeInput = formEvent.querySelector('input[name="nome"]');
        const sobrenomeInput = formEvent.querySelector('input[name="sobrenome"]');
        const emailInput = formEvent.querySelector('input[name="email"]');
        const teleInput = formEvent.querySelector('input[name="telefone"]');

        const nomeContainer = formEvent.querySelector('.nome-alert');
        const sobrenomeContainer = formEvent.querySelector('.sobrenome-alert');
        const emailContainer = formEvent.querySelector('.email-alert');
        const teleContainer = formEvent.querySelector('.tele-alert');
        
        let errors = false;
        
        if(!validator.isEmail(emailInput.value)){
            emailContainer.innerHTML = ''
            const alerta =  document.createElement('div');
            alerta.classList.add('alert', 'alert-danger');
            alerta.textContent= 'E-mail Inválido';
            emailContainer.appendChild(alerta);         
    
            errors = true;
        }

        if(nomeInput.value.length < 5){
            
            nomeContainer.innerHTML = ''
                const regex = /(.)\1\1+/;
                    if (regex.test(nomeInput.value)) {
                        const alerta =  document.createElement('div');
                        alerta.classList.add('alert', 'alert-danger');
                        alerta.textContent= 'Letra repetida mais do que 2 vezes';
                        nomeContainer.appendChild(alerta); 
            
                        errors = true;
                    }
            const alerta =  document.createElement('div');
            alerta.classList.add('alert', 'alert-danger');
            alerta.textContent= 'Nome muito curto.';
            nomeContainer.appendChild(alerta); 
            
            errors = true;
        }

        if(sobrenomeInput.value.length < 2){
            sobrenomeContainer.innerHTML = ''
            const alerta =  document.createElement('div');
            alerta.classList.add('alert', 'alert-danger');
            alerta.textContent= 'Sobrenome muito curto ou vazio.';
            sobrenomeContainer.appendChild(alerta); 
            
            errors = true;
        }
        if(!validator.isMobilePhone(teleInput.value)){
            teleContainer.innerHTML = ''
            const alerta =  document.createElement('div');
            alerta.classList.add('alert', 'alert-danger');
            alerta.textContent= 'Telefone inválido.';
            teleContainer.appendChild(alerta); 
            
            errors = true;
        }

        emailInput.addEventListener('input', () => emailContainer.innerHTML = '');
        nomeInput.addEventListener('input', () => nomeContainer.innerHTML = '');
        sobrenomeInput.addEventListener('input', () => sobrenomeContainer.innerHTML = '');
        teleInput.addEventListener('input', () => teleContainer.innerHTML = '');

         if(!errors)formEvent.submit();
    };
};