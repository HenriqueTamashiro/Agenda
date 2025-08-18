exports.middlewareGlobal = (req,res,next)=>{
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};
exports.middlewareSecundario = (req,res,next)=>{

    console.log('Middleware Secundário')
    next();
};

exports.checkCSRF = (err,req,res,next)=>{

    if(err){
       return  res.render('pagError') 
    }
    next();
};

exports.csrfMiddleware = (req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    next()
};

exports.loginRequired = (req,res, next)=>{
    if(!req.session.user) {
        req.flash('errors', 'Necessário estar logado');
        req.session.save(()=>res.redirect('/'));
        return;

    };
       next();
};
   
  