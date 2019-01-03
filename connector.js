const       mongoose        =   require('mongoose'),
            YoungAthlete    =   require('./youngAthlete'),
            consts          =   require('./consts'),
            URL             =   consts.MLAB_URL;


// function to check if an input string represents an int/float number, using REGEX;
// this function is also a validation for making sure that the input is a *positive* number representing a valid record.
let checkIfRecordIsNum = (recordToCheck) => {   
    return /^[+]?\d+(\.\d+)?$/.test(recordToCheck);     
}


/* Functions for updating / fetching data from the DB, according to the relevant route from the index file. */
module.exports = {
    async fetchAllDocuments(req , res) {
        await YoungAthlete.find( {} , (err , youngAthletes) => {     
            if (err) {
                res.json(`Error was occured. Please try again`);
                console.log(`>> ERR : ${err}`);
            }
            else {
                if (youngAthletes.length > 0 ) {
                    res.json(youngAthletes);    
                    console.log(`>> Document/s was/were sent to the browser`);
                }
                else {
                    res.json(`There are no athletes in the DB at the moment`);    
                    console.log(`>> 'No Athletes' Message has been sent to the browser`); 
                }
            }
        });
    }, 

    async getWithFilter (res , query) {
        let recordIsNum = checkIfRecordIsNum(query.bestRecord);   // for param validation.
        if (!recordIsNum) { 
            res.json(`Please enter a valid record`);
            console.log(`>> 'Please enter a valid record' Message was sent to the browser`);
            return;
        }
        let sportNameInLowerCase = query.sportName.toLowerCase();
        let searchFilter = {'sport.sport_name':sportNameInLowerCase , 'sport.best_record': {$lt:query.bestRecord} };
        await YoungAthlete.find( searchFilter , (err , youngAthletes) => {
            if (err) {
                res.json(`Error was occured. Please try again`);
                console.log(`>> ERR : ${err}`);
            }
            else {
                if (youngAthletes.length > 0 ) {
                    res.json(youngAthletes);
                    console.log(`>> Document/s was/were sent to the browser`);     
                }
                else {
                    res.json(`Document was not found`);
                    console.log(`>> 'Document was not found' Message has been sent to the browser`);
                }
            }
        });       
    } , 
    
    
    async updateRecord(req , res) {
        let recordIsNum = checkIfRecordIsNum(req.body.bestRecordToUpdate);  // for param validation.
        if (!recordIsNum) {     
            res.json(`Please enter a valid, positive number as a record (only numbers , no latters)`);
            console.log(`>> 'Please enter a valid record' Message was sent to the browser`);
            return;
        }
        let searchFilter = { id : req.body.id , 'sport.best_record' : {$gt:req.body.bestRecordToUpdate} };
        let documentUpdate = {$set:{'sport.best_record' : req.body.bestRecordToUpdate}};

        await YoungAthlete.updateOne( searchFilter , documentUpdate , {} , (err , youngAthletes) => {
            if (err) {
                res.json(`Error was occured. Please try again`);
                console.log(`>> ERR : ${err}`);
            }
            else {
                if (youngAthletes.nModified != 0){         // in this case- document was changed. "nModified" makes us know how many changes happened in the Collection..
                    res.json(`The athlete with the id number: '${req.body.id}' was Updated succesfully`);
                    console.log(`>> 'Updated succesfully' Message was sent to the browser`);    
                }
                else {
                    res.json(`Did not update. Wrong ID or record did not improved`);
                    console.log(`>> 'Did not update' Message was sent to the browser`); 
                }
            }
        });    
    }

}
