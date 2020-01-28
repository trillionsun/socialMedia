const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const cors = require('cors');




const config = require('./config/database');
const path = require('path');
const authentication =  require('./routes/authentication')(router);
const bodyParser = require('body-parser');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err)=> {
        if (err) {
            console.log('cannot connected to mongodb', err);
        } else {
            console.log("connected successfully to " + config.db);
        }
    }
);


// middle ware
app.use(bodyParser.json());
// directory path: middleware
app.use(cors({
    origin: 'http://localhost:4200'
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+ '/client/dist/client'));
app.use('/authentication', authentication);

app.get('Home', (req, res)=>{
    res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});


app.listen(3001, ()=>{
    console.log("Listening on port 3001")
});
