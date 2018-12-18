const   express         =   require('express'),
        mongoose        =   require('mongoose'),
        url             =   require('url'),
        consts          =   require('./consts.js'),
        connector       =   require('./connector');
const   PORT            =   process.env.PORT || 3000,
        URL             =   consts.MLAB_URL;

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));


mongoose.connect(URL , {useNewUrlParser: true}).then( () => {
    console.log(`Connected to Mongo!`);
}, err => {
    console.log(`Error:${err}`);
});



app.all('*' , (req , res , next) => {
    console.log(`I am everywhere...`)
    next();
});

app.get('/getAllAthletes' , (req , res) => {      
    console.log(`You are in GET`); 
    connector.findThemAll(req , res);  
});


app.get('/getAthletesBySportNameBestRecord' , (req , res) => {
    console.log(`You are in SUPER_GET`);
    let urlPart = url.parse(req.url , true);
    let query   = urlPart.query;
    connector.getWithFilter(req , res , query);
});


app.post('/updateRecord' , (req , res) => {
    console.log(`You are in POST`);
    // Updating the inner field (='best_record')-> the field is located in the 'sport' object that located in the document..
    connector.updateRecord (req , res);
});



app.listen(PORT , () => console.log(`app listening on port ${PORT}!`));
