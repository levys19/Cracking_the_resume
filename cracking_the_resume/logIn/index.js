var middlewareObj ={};

//middle ware is used to restrict users to visit the pages
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/');
};

module.exports= middlewareObj;
