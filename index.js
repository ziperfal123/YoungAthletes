const   express         =   require('express'),
        mongoose        =   require('mongoose'),
        url             =   require('url'),
        morgan          =   require('morgan'),
        consts          =   require('./consts.js'),
        connector       =   require('./connector'),
        URL             =   consts.MLAB_URL,
        PORT            =   process.env.PORT || 3000;

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


mongoose.connect(URL , {useNewUrlParser: true}).then( () => {   //opening connection to the DB.
    console.log(`>> Connected to Mongo!`);
}, err => {
    console.log(`>> Error:${err}`);
});



app.get('/getAllAthletes' , (req , res) => {      
    console.log(`>> In GET`); 
    connector.fetchAllDocuments(req , res);  
});


app.get('/getAthletesBySportNameBestRecord' , (req , res) => {
    console.log(`>> In FILTERED_GET`);
    let urlPart = url.parse(req.url , true);
    let query   = urlPart.query;
    connector.getWithFilter(res , query);
});


app.post('/updateRecord' , (req , res) => {
    console.log(`>> In POST`);
    connector.updateRecord(req , res);
});


app.all('*' , (req , res) => {      //FallBack. For handling invalid routes
    res.json(`Invalid route, please try again`);
    console.log(`>> Invalid route was entered by the user. A Message was sent to the browser`)
});



app.listen(PORT , () => console.log(`>> app listening on port ${PORT}!`));