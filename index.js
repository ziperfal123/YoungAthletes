const   express         =   require('express'),
        mongoose        =   require('mongoose'),
        url             =   require('url'),
        consts          =   require('./consts.js'),
        connector       =   require('./connector'),
        URL             =   consts.MLAB_URL,
        PORT            =   process.env.PORT || 3000;

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


mongoose.connect(URL , {useNewUrlParser: true}).then( () => {   //opening connection to the DB.
    console.log(`Connected to Mongo!`);
}, err => {
    console.log(`Error:${err}`);
});



app.get('/getAllAthletes' , (req , res) => {      
    console.log(`In GET`); 
    connector.fetchAllDocuments(req , res);  
});


app.get('/getAthletesBySportNameBestRecord' , (req , res) => {
    console.log(`In SUPER_GET`);
    let urlPart = url.parse(req.url , true);
    let query   = urlPart.query;
    connector.getWithFilter(res , query);
});


app.post('/updateRecord' , (req , res) => {
    console.log(`In POST`);
    // Updating the inner field (='best_record')-> the field is located in the 'sport' object that located in the document..
    connector.updateRecord(req , res);
});


app.all('*' , (req , res) => {      //FallBack. For handling invalid routes
    console.log(`Invalid route was entered by the user.`)
    res.json(`Invalid route, please try again`);
});




app.listen(PORT , () => console.log(`app listening on port ${PORT}!`));