let     express     =   require('express'),
        mongoose    =   require('mongoose'),
        consts      =   require('./consts.js');
const   PORT        =   3000,
        URL         =   consts.MLAB_URL

let YoungAthlete  = require('./youngAthlete');
        


let app = express();
mongoose.connect(URL , {useNewUrlParser: true}).then( () => {
    console.log(`Connected to Mongo!`);
}, err => {
    console.log(`Error:${err}`);
});



app.get('/' , (req , res) => {
    console.log(`You are in GET`);
    YoungAthlete.find( (err , youngAthletes) => {
        if (err) 
            console.log(`ERR : ${err}`);
        else {
            console.log(`The result is : ${youngAthletes}`);
            res.send(JSON.stringify(youngAthletes));
            mongoose.disconnect();
        }
    })
});

app.listen(PORT , () => console.log(`app listening on port ${PORT}!`));
