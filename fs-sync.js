//Step 1
// var fs = require('fs');
//
// var data = fs.readFileSync('./project-files/cartocolors.json');
//
// console.log(data);

//Step 2
// var fs = require('fs');
//
// var data = fs.readFileSync('./project-files/cartocolors.json', 'utf8');
//
// console.log(data);

// Step 4
// var fs = require('fs');
//
// // read the file with a synchronous fs request
// var rawData = fs.readFileSync('./project-files/cartocolors.json');
//
// // data are in raw form
// console.log(rawData); // <Buffer 7b 0a 20 20 20 20 22 42 ...
//
// // use JSON.parse() to parse raw string to JSON
// var data = JSON.parse(rawData);
//
// // this looks familiar
// console.log(data); // { "Burg": { "2": [ "#ffc6c4", "#672044" ], ...
//
// Step 5
// // create a new object with key 'Emrld' and value the object
// var outputData = {'Emrld': data['Emrld'] };
// console.log(outputData);
var fs = require('fs');

// read the file with a synchronous fs request
var rawData = fs.readFileSync('./project-files/cartocolors.json', 'utf8');

// use JSON.parse() to parse raw string to JSON
var data = JSON.parse(rawData);

// create a new object with key 'Emrld' and value the object
var outputData = {'Emrld': data['Emrld'] };

// write the output file, stringifying the JS object
fs.writeFileSync('./data/emrldcolors.json', JSON.stringify(outputData));
