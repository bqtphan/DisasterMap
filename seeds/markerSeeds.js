// This file empties counters collection and inserts the countersSeeds into the collection
const mapMessages = require('../controllers/mapMessagesController');

const markerSeed = [
	{
        alert: 'rescue',
        situation: 'trapped',
        location: {
            "lat" : 26.7,
            "lng" : -92.2
        },
        message:'Stranded at sea'	
	},
	{
        alert: 'rescue',
        situation: 'other',
        location: {
            "lat" : 32.7,
            "lng" : -96.8
        },
        message:'My football team needs help'	
	},
	{
        alert: 'crime',
        situation: 'other',
        location: {
            "lat" : 33.6,
            "lng" : -105.3
        },
        message:'Stolen property'	
	},
    
]

module.exports = mapMessages.seed(markerSeed)
	.then((mapMessage) => console.log(`${mapMessage.length} document(s) inserted to homelist`))
	.catch((err) => console.log('Error when running seeds for home'));