const authMiddleware = function (req, res, next) {
    if (req.session.userId && req.session.isLoggedIn) {
        next()
    } else {
        res.redirect('/login')
    }
}

const redirectMiddleware = function (req, res, next) {
    if (req.session.userId && req.session.isLoggedIn) {
        res.redirect('/')
    } else {
        next()
    }
}

export default {
    authMiddleware,
    redirectMiddleware
}