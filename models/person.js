const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
	name: String,
})

/* const Person = mongoose.model('Person', personSchema)

const person = new Person({
	name: 'Madde'
})

person.save().then(result => {
	console.log('person saved')
	mongoose.connection.close()
}) */


personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', personSchema)
