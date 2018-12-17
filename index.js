let     express     =   require('express'),
        mongoose    =   require('mongoose'),
        consts      =   require('./consts.js');
const   PORT        =   process.env.PORT || 3000,
        URL         =   `mongodb://${consts.userName}:${consts.userPass}@ds135704.mlab.com:35704/young_athletes_db`;

let YoungAthlete  = require('./youngAthlete');



let app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


mongoose.connect(URL , {useNewUrlParser: true}).then( () => {
    console.log(`Connected to Mongo!`);
}, err => {
    console.log(`Error:${err}`);
});



app.get('/' , (req , res) => {      // ...the function needs to be imported from another modul... 
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

app.post('/' , (req , res) => {     // ...the function needs to be imported from another modul... 
    console.log(`You are in POST`);

    YoungAthlete.update( {id : req.body.id} , { $set:{'sport.best_record' : req.body.bestRecordToUpdate}} , {} , (err , res) => {
        if (err)
            console.log(`ERR : ${err}`);
        else {
            console.log(`Updated! ${JSON.stringify(res)}`);
            YoungAthlete.find( {id : req.body.id} , (err , youngAthletes) =>{
                console.log(`${youngAthletes}`);
            } )
        }
    }) 
});




app.listen(PORT , () => console.log(`app listening on port ${PORT}!`));
