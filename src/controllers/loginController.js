const Login = require('../models/LoginModel')

exports.index = (req, res) => {
    if(req.session.user)return res.render('dashboard');
    return res.render('login');
}
exports.register = async (req, res) => {
    try{
        const login = new Login(req.body); //instância da classe Login
        await login.register();
        
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
                req.session.save( ()=>{
                    return res.redirect('/login/index');
                });
            return
        }
            req.flash('success','Usuário criado com sucesso.');
                req.session.save( ()=>{
                    return res.redirect('/login/index');
                });
    }catch(e){
        return res.render('pagError')
    }

}

exports.login = async (req, res) => {
    try{
        const login = new Login(req.body); //instância da classe Login
        await login.login();
        
        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save( ()=>{
                 return res.redirect('/login/index');
            });
            return;
        }



        req.flash('success','Logado com sucesso.');
        req.session.user = login.user;
        req.session.save( ()=>{
        return res.redirect('/login/index');
                });
                
    }catch(e){
        return res.render('pagError')
    }

}

exports.logout = (req,res) => {
    req.session.destroy()
    res.redirect('/')
}


