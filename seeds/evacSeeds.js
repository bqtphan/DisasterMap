// This file empties evackit collection and inserts the evacSeeds into the collection
const emergencykitController = require('../controllers/emergencykitController');

const evacSeed = [
	{
		item: 'Copies of your important papers in a waterproof bag.',
		
	},
	{
		item: 'Extra set of car and house keys.',
	
	},
	{
		item: 'Extra mobile phone charger',
		
    },
    {
        item: 'Bottled water and snacks such as energy or granola bars.'
    },
    
]

module.exports = emergencykitController.seed(evacSeed)
	.then((evackit) => console.log(`${evackit.length} document(s) inserted to counters`))
	.catch((err) => console.log('Error when running seeds for evacuation'));