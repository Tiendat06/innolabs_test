const mongoose = require('mongoose');

async function connect(){
    try{
        const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
        const MONGO_PORT = process.env.MONGO_PORT || '27017';
        const MONGO_DB = process.env.MONGO_DB || 'innolabs_test';
        const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
        console.log(MONGO_URI)
        await mongoose.connect(MONGO_URI)
            .then(() => console.log('Connected !!'));
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {connect};