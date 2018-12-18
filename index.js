const   express         =   require('express'),
        mongoose        =   require('mongoose'),
        url             =   require('url'),
        consts          =   require('./consts.js'),
        YoungAthlete    =   require('./youngAthlete.js');
const   PORT            =   process.env.PORT || 3000,
        URL             =   `mongodb://${consts.userName}:${consts.userPass}@ds135704.mlab.com:35704/young_athletes_db`;


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


mongoose.connect(URL , {useNewUrlParser: true}).then( () => {
    console.log(`Connected to Mongo!`);
}, err => {
    console.log(`Error:${err}`);
});



app.get('/getAllAthletes' , (req , res) => {      // ...the function needs to be imported from another module... 
    console.log(`You are in GET`);
    console.log(`${YoungAthlete}`);
    YoungAthlete.find( {} , (err , youngAthletes) => {
        if (err) 
            console.log(`ERR : ${err}`);
        else {
            console.log(`result : ${youngAthletes}`);
            res.send(JSON.stringify(youngAthletes));
            mongoose.disconnect();
        }
    });
});

app.post('/updateRecord' , (req , res) => {     // ...the function needs to be imported from another module... 
    console.log(`You are in POST`);
    // Updating the inner field (='best_record')-> the field is located in the 'sport' object that located in the document..
    YoungAthlete.update( {id : req.body.id} , { $set:{'sport.best_record' : req.body.bestRecordToUpdate}} , {} , (err , res) => {
        if (err)
            console.log(`ERR : ${err}`);
        else {
            console.log(`Updated! ${JSON.stringify(res)}`);
            YoungAthlete.find( {id : req.body.id} , (err , youngAthletes) =>{
                console.log(`${youngAthletes}`);
            })
        }
    }) 
});


app.get('/getAthletesBySportNameBestRecord' , (req , res) => {      // ...the function needs to be imported from another module... 
    console.log(`You are in SUPER_GET`);
    let urlPart = url.parse(req.url , true);
    let query   = urlPart.query;
    YoungAthlete.find( {'sport.sport_name':query.sportName , 'sport.best_record': {$lt:query.bestRecord} } , (err , youngAthletes) => {
        if (err) 
            console.log(`ERR : ${err}`);
        else {
            res.send(`${JSON.stringify(youngAthletes)}`);
            console.log(youngAthletes);
        }
    });
});




app.listen(PORT , () => console.log(`app listening on port ${PORT}!`));
