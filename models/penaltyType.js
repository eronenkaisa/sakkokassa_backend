const mongoose = require('mongoose')


const penaltyTypeSchema = new mongoose.Schema({
    type: String,
})


penaltyTypeSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('PenaltyType', penaltyTypeSchema)
