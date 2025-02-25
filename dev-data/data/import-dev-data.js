const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../model/tourModel');

dotenv.config({ path: './config.env' }); // To access in every single file or else you need to import everywhere

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  // console.log(con.connections);
  console.log('DB connection succesfull');
});
// Read JSON
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));
//Import data to DB
const importData = async () =>{
    try{
       await Tour.create(tours);
       console.log('Data successfully loaded');
    }catch(err){
        console.log(err);
    }
    process.exit();
}

// Delete data from DB
const deleteData = async () => {
  try{
    await Tour.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  }catch(err){
    console.log(err);
  }
}
if(process.argv[2] === '--import'){
  importData();
}else if(process.argv[2] === '--delete'){
  deleteData();
}
