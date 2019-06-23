// 统计一个es6风格的class组件信息
function calComments(data) {
    let files = calLoc(data.loc);
    let comments = data.comments.reduce((acc, cur) => {
        return acc + calLoc(cur.loc)
    }, 0)
    // console.log(files,comments);
    return comments / files;
}

// param: loc的对象{start,end}
function calLoc(loc) {
    return loc.end.line - loc.start.line + 1;
}

function getBasicClassInfo(data) {
    let classInfo = {};
    data.program.body.forEach( astNode => {
        if (astNode.type === 'ExportDefaultDeclaration') {
            let node = astNode.declaration;
            classInfo.loc = calLoc(node.loc);
            classInfo.name = node.id.name;
            classInfo.method = node.body.body.map( e => {
                if (e.type === 'ClassMethod') {
                    return {
                        name: e.key.name,
                        loc: calLoc(e.loc),
                    };
                }
            });
            classInfo.superclass = node.superclass;
        }
    })
    return classInfo;
}

module.exports = {
    calComments,getBasicClassInfo
}