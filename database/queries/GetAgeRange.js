const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
	const minQuery = Artist
		.find({})
		.sort({
			// min
			age: 1
		})
		// Dont do this
		// .then((artist) => artist[0])
		// By doing so you are looping through possibly alot of artists and its making a huge request on the server
		// Use limit instead to only return 1 item rather than looping through a list
		.limit(1)
		//returns just one artist from the limit
		.then((artists) => artists[0].age)

	const maxQuery = Artist
		.find({})
		.sort({
			// max
			age: -1
		})
		.limit(1)
		.then((artists) => artists[0].age)

	return Promise.all([minQuery, maxQuery])
		.then((result) => {
			return {
				min: result[0],
				max: result[1]
			}
		})
};