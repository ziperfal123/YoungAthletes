const       mongoose        =   require('mongoose'),
            YoungAthlete    =   require('./youngAthlete'),
            consts          =   require('./consts'),
            URL             =   consts.MLAB_URL;


mongoose.connect(URL , {useNewUrlParser: true}).then( () => {
    console.log(`Connected to Mongo!`);
}, err => {
    console.log(`Error:${err}`);
});


/* Functions for updating / fetching data from the DB, according to the relevant route. */
module.exports = {      
    async fetchAllDocuments(req , res) {
        await YoungAthlete.find( {} , (err , youngAthletes) => {     
            if (err) {
                res.json('Error was occured. Please try again');
                console.log(`ERR : ${err}`);
            }
            else {
                if (youngAthletes.length > 0 ) { 
                    res.json(youngAthletes);    
                    console.log(`Document/s were sent to the browser`);
                }
                else {  //  In this case: DB is empty
                    res.json(`There are no athletes in the DB at the moment`);    
                    console.log(`'No Athletes' Message has been sent to the browser`); 
                }
            }
        });
    }, 

    async updateRecord(req , res) {
        let searchFilter = { id : req.body.id , 'sport.best_record' : {$gt:req.body.bestRecordToUpdate} };
        let documentUpdate = {$set:{'sport.best_record' : req.body.bestRecordToUpdate}};
        await YoungAthlete.updateOne( searchFilter , documentUpdate , {} , (err , youngAthletes) => {
            if (err) {
                res.json('Error was occured. Please try again');
                console.log(`ERR : ${err}`);
            }
            else {
                if (youngAthletes.nModified != 0){         // in this case- document was changed. "nModified" makes us know how many changes happened in the Collection..
                    res.json(`The athlete with the id number: '${req.body.id}' was Updated succesfully`);
                    console.log(`'Updated succesfully' Message was sent to the browser`);    
                }
                else {
                    res.json(`Did not update. Wrong ID or record did not improved`);
                    console.log(`'Did not update' Message was sent to the browser`); 
                }
            }
        });
    },

    async getWithFilter (res , query) {
        let searchFilter = {'sport.sport_name':query.sportName , 'sport.best_record': {$lt:query.bestRecord} };
        await YoungAthlete.find( searchFilter , (err , youngAthletes) => {
            if (err) {
                res.json('Error was occured. Please try again');
                console.log(`ERR : ${err}`);
            }
            else {
                if (youngAthletes.length > 0 ) {
                    res.json(youngAthletes);
                    console.log(`Document/s were sent to the browser`);     // Change to a consoleLogFeedback message    
                }
                else {
                    res.json(`Document was not found`);
                    console.log(`'Document was not found' Message has been sent to the browser`);
                }
            }
        });
    }
}
