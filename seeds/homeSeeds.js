// This file empties counters collection and inserts the countersSeeds into the collection
const emergencykitController = require('../controllers/emergencykitController');

const homeSeed = [
	{
		item: 'Water (one gallon per person per day, for drinking and sanitation—up to a 7-day supply)',
		
	},
	{
		item: 'Non-perishable food (up to a 7-day supply per person).',
	
	},
	{
		item: 'Battery-powered radio (with extra batteries) or hand-crank radio',
		
    },
    {
        item: 'Weather radio with tone alert and extra batteries.'
    },
    {
        item:' Flashlight and extra batteries'
    },
    {
        item: 'First-aid supplies.'
    },
    {
        item: 'Whistle to signal for help'
    }
    
]

module.exports = emergencykitController.seed(homeSeed)
	.then((homekit) => console.log(`${homekit.length} document(s) inserted to homelist`))
	.catch((err) => console.log('Error when running seeds for home'));