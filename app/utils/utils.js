const setSession = (req, user) => {
    req.session.userId = user.id
    req.session.email = user.email
    req.session.name = user.name
    req.session.isLoggedIn = user.id;
}

export default {
    setSession
}