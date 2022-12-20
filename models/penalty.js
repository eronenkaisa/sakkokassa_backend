const mongoose = require('mongoose')

const penaltySchema = new mongoose.Schema({
	personId: String,
	date: String,
	type: String,
	sum: Number,
	comment: String,
	paid: Boolean,
})


penaltySchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Penalty', penaltySchema)
