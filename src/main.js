// main.js
// (c) tearflake, 2026
// MIT License

var Main = (
    function (obj) {
        return {
            parse: obj.parse,
            call: obj.call
        };
    }
) (
    (function () {
        "use strict";
        
        function parse (program) {
            let syntax = `
                (GRAMMAR
                    (RULE START grammar)

                    (RULE grammar
                        (LIST "MODULE" cPublic))

                    (RULE cPublic
                        (LIST public cPrivate))
                    
                    (RULE cPublic cPrivate)

                    (RULE public
                        (LIST "PUBLIC" elements))

                    (RULE cPrivate
                        (LIST private cChild))
                    
                    (RULE cPrivate cChild)

                    (RULE private
                        (LIST "PRIVATE" elements))

                    (RULE cChild
                        (LIST child ()))
                    
                    (RULE cChild ())

                    (RULE child
                        (LIST "ALIASED" children))
                        
                    (RULE children
                        (LIST child-el children))
                    
                    (RULE children ())

                    (RULE child-el
                        (LIST "ID"
                            (LIST ATOMIC
                                (LIST chItem
                                    ()))))
                    
                    (RULE chItem grammar)
                    (RULE chItem ATOMIC)

                    (RULE elements
                        (LIST element elements))
                    
                    (RULE elements ())

                    (RULE element
                        (LIST "ID"
                            (LIST ATOMIC
                                (LIST code
                                    ()))))

                    (RULE code ANY)
                )
            `;
            
            let sSyntax = SExpr.parse (syntax);
            let sProgram = SExpr.parse (program);
            
            if (sProgram.err) {
                return sProgram;
            }
            
            let ast = Parser.parse (program, sSyntax);
            
            if (!ast.err) {
                let graph = makeTree(SExpr.removeComments (ast));
                if (!graph.err) {
                    return graph;
                }
                else {
                    let msg = SExpr.getPosition (program, skipComments (graph.path, ast));
                    return {err: msg.err, found: msg.found, pos: msg.pos, path: graph.path};
                }
            }
            else {
                return ast;
            }
        }
        
        function makeTree (sexpr) {
            let graph = {parent: null, pub: {}, priv: {}, children: {}};
            let grph = sexpr;
            for (let i = 1; i < grph.length; i++) {
                let elem = grph[i];
                if (elem[0] === "ALIASED") {
                    for (let j = 1; j < elem.length; j++) {
                        let id = elem[j];
                        if (!isIdentifier (id[1])) {
                            return {err: "Unexpected literal", path: [i, j, 1,  1]};
                        }
                    
                        if (isAvailable (graph.children, id[1])) {
                            let maked = makeTree(id[2]);
                            if(!maked.err) {
                                graph.children[id[1]] = maked;
                                //graph.children[id[1]].parent = graph;
                            }
                            else {
                                return {err: maked.err, path: [i, j, 2, ...maked.path]};
                            }
                        }
                    }
                }
                else if (elem[0] === "PUBLIC") {
                    for (let j = 1; j < elem.length; j++) {
                        let id = elem[j];
                        if (!isIdentifier (id[1])) {
                            return {err: "Unexpected literal", path: [i, j, 1,  1]};
                        }
                        
                        if (isAvailable (graph.pub, id[1])) {
                            let parsed = getAsmOrData(id[2]);
                            if(!parsed.err) {
                                graph.pub[id[1]] = parsed;
                            }
                            else {
                                return {err: parsed.err, path: [i, j, 2, ...parsed.path]};
                            }
                        }
                    }
                }
                else if (elem[0] === "PRIVATE") {
                    for (let j = 1; j < elem.length; j++) {
                        let id = elem[j];
                        if (!isIdentifier (id[1])) {
                            return {err: "Unexpected literal", path: [i, j, 1, 1]};
                        }
                        
                        if (isAvailable (graph.priv, id[1])) {
                            let parsed = getAsmOrData(id[2]);
                            if(!parsed.err) {
                                graph.priv[id[1]] = parsed;
                            }
                            else {
                                return {err: parsed.err, path: [i, j, 2, ...parsed.path]};
                            }
                        }
                    }
                }
            }
            
            return graph;
        }
        
        function isAvailable (binder, binding){
            return (!binder[binding] && !Object.prototype.hasOwnProperty.call(binder, binding))
        }
        
        function getAsmOrData(expr) {
            if (expr[0] == "ASM") {
                return Asm.parseSExpr(expr)
            }
            else {
                return expr;
            }
        }
        
        let skipComments = function (path, sexpr) {
            let result = [...path];
            let ts = sexpr;
            for (let i = 0; i < path.length; i++) {
                if (ts[result[i]]){
                    for (let j = 0; j <= result[i]; j++) {
                        if (ts[j] && ts[j][0] == "**") {
                            result[i]++;
                        }
                    }
                    
                    ts = ts[result[i]];
                }
            }
            
            return result;
        }
        
        function call(module, prog, args, rootModule) {
            if (!module.pub[prog] && !module.priv[prog]) {
                return ["ERROR", `Undefined function '${prog}'`];
            }
            
            let runnable = false;
            if (Object.hasOwn(module.pub, prog)){
                runnable = (module.pub[prog].kind === "ASM");
            }
            else if (Object.hasOwn(module.priv, prog)){
                runnable = (module.priv[prog].kind === "ASM");
            }
            
            if (runnable) {
                return Asm.run(module, prog, args, rootModule);
            }
            else {
                if (args.length > 0) {
                    return ["ERROR", `Unexpected arguments`];
                }
                
                return (Object.hasOwn(module.pub, prog) ? module.pub[prog] : module.priv[prog]);
            }
        }

        function isIdentifier(expr) {
            return (
                typeof expr === 'string' &&
                (expr.charAt (0) !== '"' && expr.charAt (expr.length - 1) !== '"') &&
                Number.isNaN(Number(expr)) &&
                (expr !== "true" && expr !== "false") &&
                (Number.isNaN(Number(expr.charAt(0))))
            );
        }

        return {
            parse: parse,
            call: call
        }
    }) ()
);

var isNode = new Function ("try {return this===global;}catch(e){return false;}");

if (isNode ()) {
    // begin of Node.js support
    
    var SExpr = require ("./s-expr.js");
    var Parser = require ("./parser.js");
    var Asm = require ("./asm.js");
    module.exports = Main;
    
    // end of Node.js support
}

