import express from "express";
import session from "express-session";
import hbs from "hbs";
import { publicPath, partialsPath } from "./utils/constants.js";
import userController from "./http/controller/UserController.js"
import UserAuth from "./http/middleware/UserAuth.js";
import utils from "./utils/utils.js";
import geocode from "./utils/geocode.js"
import weatherStack from "./utils/weatherstack.js"

const app = express();

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true
}))

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'hbs')
app.set('views', '../templates/views')

hbs.registerPartials(partialsPath);

app.use('/weather', UserAuth.authMiddleware);
app.use('/login', UserAuth.redirectMiddleware);
app.use('/register', UserAuth.redirectMiddleware);

app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});


app.get('/', (req, res) => {
    res.render('index', {page_title: 'Root'});
})

app.get('/register', (req, res, next) => {
    res.render('register', {page_title: 'Register'});
})

app.post('/register', async (req, res, next) => {
    try{
        const createRes = await userController.createUser(req.body);
        if (createRes) {
            utils.setSession(req, createRes)
            res.redirect('/weather')
            return
        }
    } catch {
        res.render('register', {error: 'Failed to register, please try again.', page_title: 'Register'})
        return
    }
})

app.get('/login', (req, res, next) => {
    res.render('login', {page_title: 'Login'});
})

app.post('/login', async (req, res, next) => {
    const user = await userController.fetchUser(req.body);
    if (user) {
        utils.setSession(req, user)
        res.redirect('/weather')
        return
    }
    res.render('login', {error: 'Invalid credentials', page_title: 'Login'})
})

app.get('/weather', (req, res, next) => {
    res.render('weather', {page_title: 'Weather'})
})

app.post('/weather', (req, res, next) => {
    const place = req.query.place;
    geocode(place, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            res.send({ error })
            return
        }
        weatherStack(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({ error })
                return
            }
            forecastData.location = location
            res.send(forecastData)
        })
    })
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
})