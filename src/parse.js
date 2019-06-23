// import babelParser from "@babel/parser";
const babelParser = require('@babel/parser');

const OPTIONS = {
    'jsx': {
        sourceType: 'module',
        plugins: ['jsx'],
    },
    'js':{},
    'module':{
        sourceType:'module'
    }
}

const reduceAstNode = (oldNode, currentNode) => {
    let element = {};
    if (currentNode.type === 'JSXElement') {
        element = {
            name: currentNode.openingElement.name.name,
            children: [],
        };
        oldNode.push(element);
    }
    if ('children' in currentNode) {
        currentNode.children.forEach(
            (node) =>
            oldNode.length > 0 ?
            reduceAstNode(element.children, node) :
            reduceAstNode(oldNode, node),
        );
    }
    return oldNode;
};

const getTree = (content,option) => {
    const rawAst = babelParser.parse(content, OPTIONS[option]);
    if (option == 'jsx') {
        const initialAst = rawAst.program.body.find(
            (astNode) => astNode.type === 'ExportNamedDeclaration',
        ).declaration.declarations[0].init.body.body[0].argument;

        return reduceAstNode([], initialAst);
    } else {
        return rawAst;
    }
};

module.exports = { getTree }