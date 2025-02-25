const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // To access in every single file or else you need to import everywhere
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  // console.log(con.connections);
  console.log('DB connection succesfull');
});



// const testTour = new Tour({
//   name:"The Sea Surfer",
//   rating:5.0,
//   price:499
// });
 
// testTour.save().then((doc)=>{
//   console.log(doc)
// }).catch((err)=>{
//   console.log(err)
// })

// console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
