const   mongoose    =   require('mongoose');
let     Schema      =   mongoose.Schema;

let schema = {
    id: {type: Number , required:true},
    first_name: {type: String , required:true},
    last_name:  {type: String , required:true},
    birth_date: Date,
    sport: {
        sport_name: String,
        coach_name: String,
        best_record: Number,
        worst_record: Number
    }
}


const   youngAthlete_schema = new Schema(schema),
        YoungAthlete        = mongoose.model(`young_athletes` , youngAthlete_schema);


module.exports = YoungAthlete;