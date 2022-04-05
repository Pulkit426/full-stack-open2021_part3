const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log("connecting to ", url)

mongoose.connect(url)
        .then(result => console.log('connected to MongoDB'))
        .catch(error => console.log("error connecting to MongoDB", error.message))


const personSchema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true
    },
    number: {
      type: String,
      minlength: 9,
      validate: {
        validator : function(v){
          return /\d{2,3}-\d/.test(v)
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    }
  })      

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })



  module.exports = mongoose.model('Person', personSchema)

// const Person = mongoose.model('Person', personSchema)

// if(process.argv.length===3){

//     

// }

// if(process.argv.length===5){
//     const nameVal= process.argv[3]
//     const numberVal= process.argv[4]

//     const person = new Person({
//         name: nameVal,
//         number: numberVal
//     })

//     person.save().then(result => {
//         console.log("added ",result.name," number ",result.number," to phonebook")
//         mongoose.connection.close()
//     })
// }

