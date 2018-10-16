module.exports = () => {
	const evacSeed = require('./evacSeeds');
	const homeSeed = require('./homeSeeds');
	const markerSeed = require('./markerSeeds');
	
	Promise.all([
		evacSeed,
		homeSeed,
		markerSeed
	])
		.then((dataArr) => { console.log('...All seeds inserted into collections succesfully!') });
}