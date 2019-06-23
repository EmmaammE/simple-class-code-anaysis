const fs = require('fs');

// write to files serializing data to JSON
exports.writeToFile = function (data, path) {
    // add line breaks and indentation keeping the JSON human readable
    const json = JSON.stringify(data, null, 2);

    fs.writeFile(path, json, (err) => {
        if (err) {
            console.error(err);
            throw err;
        }
        // else {
        //     console.log('saved');
        // }
    })
}

// read File
exports.readFromFile = function (path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(data);
            }
        })
    });
}

exports.toPercent = function (point) {
    var str = Number(point * 100).toFixed(2);
    str += "%";
    return str;
}