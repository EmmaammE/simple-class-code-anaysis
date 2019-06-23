const traverse = require("babel-traverse").default;
const t = require("babel-types");

// 统计一个es6风格的class组件信息
function calComments(data) {
    let files = calLoc(data.loc);
    let comments = data.comments.reduce((acc, cur) => {
        return acc + calLoc(cur.loc)
    }, 0)
    return comments / files;
}

// param: loc的对象{start,end}
function calLoc(loc) {
    return loc.end.line - loc.start.line + 1;
}

// node type:ClassDeclaration
function getBasicClassInfo(node) {
    let classInfo = {};
    classInfo.loc = calLoc(node.loc);
    classInfo.name = node.id ? node.id.name:'';
    classInfo.method = node.body.body.map(e => {
        if (e.type === 'ClassMethod') {
            return getMethodInfo(e);
        }
    });
    classInfo.superclass = node.superclass;
    return classInfo;
}

// node-type: ClassMethod
function getMethodInfo(node) {
    return {
        name: node.key.name,
        loc: calLoc(node.loc),
        param:node.params.map(e=>e.name),
    };
}

function getProperties(ast) {
    let members = new Set();
    let classInfo;
    traverse(ast, {
        enter(path) {
            if (t.isExpressionStatement(path.node)) {
                let left = path.node.expression.left;
                if (t.isMemberExpression(left) && t.isThisExpression(left.object)) {
                    members.add(left.property.name);
                }
            } else if (t.isClassDeclaration(path.node)) {
                // console.log(JSON.stringify(path.node));
                classInfo = getBasicClassInfo(path.node);
            }
        }
    })
    classInfo.members = [...members.entries()];
    // console.log(JSON.stringify(classInfo));
    return classInfo;
}

module.exports = {
    calComments,getProperties
}