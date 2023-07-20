const mongoose = require('mongoose');

module.exports = async function(){
    try{
            let db = await mongoose.connect(process.env.MONGO_URI, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
            });
            console.log('mongoose is connected with this app.')
    }catch(err){
        console.log(err);
         process.exit(1);
    }
} 

