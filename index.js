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
app.use(express.static('docs'));

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


app.get('/api' , (req , res) => {
    console.log(`In API Route`);
    res.redirect(`https://documenter.getpostman.com/view/5691767/Rzn8RN8S#d55e93c1-80d4-4eed-a714-d98ce979d9af`);
});


app.get('/api' , (req , res) => {
    console.log(`>> In api`);
    res.redirect('https://web.postman.co/collections/5691767-a200a985-9664-4610-b5b7-69cdc38d7382?workspace=18dd077b-4221-4067-8ed7-11590defa1a6');
    console.log(`>> Client was redirected to the API Page`);

});

app.all('*' , (req , res) => {      //FallBack. For handling invalid routes
    res.json(`Invalid route, please try again`);
    console.log(`>> Invalid route was entered by the user. A Message was sent to the browser`)
});



app.listen(PORT , () => console.log(`>> app listening on port ${PORT}!`));