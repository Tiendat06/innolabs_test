const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const morgan = require("morgan");
const session = require("express-session");
const flash = require("connect-flash");
const db = require('./config/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const path = require("node:path");
const redisStore = require('connect-redis').default;
const {createClient} = require('redis');
const os = require("node:os");

const redisClient = createClient({
    url: `redis://${process.env.REDIS_HOST || 'host.docker.internal'}:${process.env.REDIS_PORT || '6379'}`,
    socket: {
        connectTimeout: 5000,
    },
});

redisClient.connect().catch(err => console.log(err));

db.connect().catch(() => console.log('Connect failed !!'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    store: new redisStore({client: redisClient}),
    secret: '123456',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000
    }
}));

app.use(cookieParser());

app.use(flash());

app.use(morgan('tiny'));

app.get('/log/instance', (req, res) => {
    const hosts = os.hostname;
    res.send(`Hostname: ${hosts}`);
})

routes(app);

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));