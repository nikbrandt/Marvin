const fs = require("fs");

module.exports.cleanOldJokes = cleanOldJokes;
module.exports.addJoke = addJoke;
module.exports.loadJsonFile = loadJsonFile;
module.exports.saveJsonFile = saveJsonFile;
module.exports.getRandomJoke = getRandomJoke;

var jsonObject;

function cleanOldJokes(expiryTimeMilliseconds) {
    var expireDate = new Date(Date.now() - new Date(expiryTimeMilliseconds));
    for(var i = 0; i < jsonObject.length; i++) {
        var date = new Date(jsonObject[i].date);
        if(date < expireDate) {
            jsonObject.splice(i, 1);
            i--;
        }
    }
}

function loadJsonFile(filePath) {
    jsonObject = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function saveJsonFile(filePath) {
    fs.writeFileSync(filePath, JSON.stringify(jsonObject));
}

function getRandomJoke() {
    if(jsonObject.length > 0) {
        return jsonObject[Math.floor(Math.random() * (jsonObject.length))].joke;
    } else {
        return "No jokes available ;(";
    }
}

function addJoke(jokeString) {
    jsonObject.push({
        "joke": jokeString,
        "date": Date.now()
    });
}
