var fs = require('fs');
var csvParse = require('csv-parse');


fs.readFile(__dirname + "/project-files/austin-council-districts.json", 'utf8', (err, geojson) => {
    if(err) throw err;

    fs.readFile(__dirname + "/project-files/austin-traffic-signals.csv", "utf8", (err, csvString) => {
        if(err) throw err;

        csvParse(csvString, {columns: true}, (err, csv) => {

            bindData(JSON.parse(geojson), csv);

        });
    })
});

function bindData(geojson, csv) {

    geojson.features.forEach(function(feature) {

        var count = 0;

        csv.forEach((row) => {

            if(row.COUNCIL_DISTRICT === feature.properties.council_di) {
                count++
            }

        });

        feature.properties.count = count;

    });

    writeFile(geojson);

}

function writeFile(geojson) {

    fs.writeFile(__dirname + '/data/austin-districts-counts.json', JSON.stringify(geojson), 'utf8', function(err) {

        if(err) throw err;

        console.log('File all done. Great success!');
    })

}
