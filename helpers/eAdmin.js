module.exports = {
    eAdmin: function(req, res, next) {

        if(req.isAuthenticated() && req.user.flag_admin == true){
            return next()
        }

        req.flash("error_msg", 'Você não esta logado como admin')
        res.redirect("/users/login")

    }
}