const mongoose = require('mongoose');
let connection = async ()=>{
  try{
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('database is connected to ', conn.connection.host);
}catch(err){
  console.log(err);
  process.exit(1);
}};

module.exports = connection;
