const       mongoose        =   require('mongoose'),
            YoungAthlete    =   require('./youngAthlete'),
            consts          =   require('./consts'),
            URL             =   consts.MLAB_URL;


mongoose.connect(URL , {useNewUrlParser: true}).then( () => {
    console.log(`Connected to Mongo!`);
}, err => {
    console.log(`Error:${err}`);
});




module.exports = {
    findThemAll : (req , res) => {
        YoungAthlete.find( {} , (err , youngAthletes) => {
            if (err) 
                console.log(`ERR : ${err}`);
            else {
                console.log(`result123 : ${youngAthletes}`);
                res.send(JSON.stringify(youngAthletes));
            }
        })
    } , 

    updateRecord : (req , res) => {
        YoungAthlete.updateOne( {id : req.body.id} , { $set:{'sport.best_record' : req.body.bestRecordToUpdate}} , {} , (err) => {
            if (err)
                console.log(`ERR : ${err}`);
            else {
                console.log(`Updated succesfully.`)
                res.send(`Updated succesfully.`)
            }
        }); 
    } ,

    getWithFilter : (req , res , query) => {
        YoungAthlete.find( {'sport.sport_name':query.sportName , 'sport.best_record': {$lt:query.bestRecord} } , (err , youngAthletes) => {
            if (err) 
                console.log(`ERR : ${err}`);
            else {
                res.send(`${JSON.stringify(youngAthletes)}`);
                console.log(youngAthletes);
            }
        });
    }


}
