// This file empties counters collection and inserts the countersSeeds into the collection
const homeController = require('../controllers/homeController');

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
        item: 'Weather radio with tone alert and extra batteries.',
    },
    {
        item:' Flashlight and extra batteries',
    },
    {
        item: 'First-aid supplies.',
    },
    {
        item: 'Whistle to signal for help',
    },
    {
        item: 'Filter mask or cotton t-shirt, to help filter the air',
    },
    {
        item:'Wrench or pliers to turn off utilities (water and electric).',
    },
    {
        item: 'Manual can opener if your kit contains canned food',
    },
    {
        item: 'Plastic sheeting and duct tape to shelter-in-place',
    },
    {
        item: 'Fire extinguisher',
    }
    
]

module.exports = homeController.seed(homeSeed)
	.then((homekit) => console.log(`${homekit.length} document(s) inserted to homelist`))
	.catch((err) => console.log('Error when running seeds for home'));