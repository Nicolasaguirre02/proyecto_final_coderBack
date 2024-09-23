/* export const estaAutenticado = (req, res, next) => {
    if(req.session.user) {
        return next();
    } else {
        res.redirect('/login')
    }
};

export const noEstaAutenticado = (req, res, next) => {
    if(!res.session.user){
        return next();
    }else{
        res.redirect('products')
    }
}; */
