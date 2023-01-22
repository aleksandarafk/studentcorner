const mongoose = require('mongoose');

module.exports = () => {
   // mongdb cloud connection is here
  mongoose
    .connect("mongodb+srv://aleks:bashtati123@loginregister.rlqablf.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log("connected to mongodb cloud! :)");
    })
    .catch((err) => {
      console.log(err);
    }); 
};

//adding notes to the db
// const Note = require("../models/Note");

// const note = new Note({
//   body: "This is the body of my first note",
//   date: "today"
// });

// note.save((error) => {
//   if (error) {
//     // Handle the error
//   } else {
//     // The note was saved successfully
//   }
// });  

// Note.findOneAndUpdate({ body: 'Your note body' }, (error, note) => {
//   if (error) {
//    console.log(error)
//   } else {
//     note.body = 'Your updated note body';
//     note.date = 'updated date too';
//     note.save((error) => {
//       if (error) {
//         // Handle error
//       } else {
//         console.log('updated')
//       }
//     });
//   }
// });

// Note.find({}, (error, notes) => {
//   if (error) {
//     // Handle error
//   } else {
//     // Display the notes
//   }
// });
