module.exports = () => {
	const evacSeed = require('./evacSeeds');
	const homeSeed = require('./homeSeeds');
	
	Promise.all([
		evacSeed,
		homeSeed,
		
	])
		.then((dataArr) => { console.log('...All seeds inserted into collections succesfully!') });
}