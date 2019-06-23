const { getTree } = require("./parse");
const { writeToFile, readFromFile, toPercent } = require("./util");
const { calComments, getBasicClassInfo } = require("./getInformation");

readFromFile(__dirname + '/temp/test.js')
    .then(data => {
        let content = data;
        let ast = getTree(content,'module');
        let info = {
            'class':{},
            'comments':'0.1',
        }
        info.comments = toPercent(calComments(ast));
        info.class = getBasicClassInfo(ast);
        console.log("information:", JSON.stringify(info));
        writeToFile(ast, __dirname + '/output/tmp.json');
    })
    .catch(err => console.error(err))
