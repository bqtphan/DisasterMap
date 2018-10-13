// This file empties evackit collection and inserts the evacSeeds into the collection
const evacuationController = require('../controllers/evacuationController');

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
    {
		item: ' Contact and meeting place information for your family and a map of your local area.',
	},
	{
		item: ' Escape Tool for your car',
	},
	{
		item: 'External mobile phone battery pack or solar charger',
	},
	{
		item: 'Toothpaste, toothbrushes, wet cleansing wipes, and so on',
	}
]

module.exports = evacuationController.seed(evacSeed)
	.then((evackit) => console.log(`${evackit.length} document(s) inserted to counters`))
	.catch((err) => console.log('Error when running seeds for evacuation'));