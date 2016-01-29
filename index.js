"use strict";

exports.stringify = stringify;

var defaults = {
    maxLength: 200,
    doubleSpaceDepth: 1,
    spaceBeforeColon: false,
    spaceAfterColon: true,
    spaceAfterComma: true,
    spaceInsideBraces: true,
    spaceInsideBrackets: true,
    sameLineBraces: false,
    sameLineBrackets: false,
    typeOrder: {
        boolean: 1,
        number: 2,
        string: 3,
        default: 99,
    }
};

function stringify(obj, opts, depth) {
    var str, indent, type = typeof obj;

    if (typeof depth !== 'number') { depth = 1; };
    if (typeof opts !== 'object') { opts = {}; }
    Object.keys(defaults).forEach(function(key){
        if (!opts.hasOwnProperty(key)) {
            opts[key] = defaults[key];
        }
    });

    switch(type){
        case "object":
            indent = Array(depth).join('\t');

            if (obj === null) {
                str = "null";
            } else if (Array.isArray(obj)) {
                str = '[' + (opts.spaceInsideBrackets?' ':'') + '\n';
                str += Object.keys(obj)
                    .map(function(key, i, arr){ return (depth <= opts.doubleSpaceDepth && i?'\n':'') + '\t' + indent + stringify(obj[key], opts, depth+1); })
                    .join(',' + (opts.spaceAfterComma?' ':'') + '\n');
                str += (opts.spaceInsideBrackets?' ':'') + '\n' + indent + ']';
                if (opts.sameLineBrackets) { str = str.replace(/\n\t*\[/g,'['); }
            } else {
                str = '{' + (opts.spaceInsideBraces?' ':'') + '\n';
                str += Object.keys(obj)
                    .sort(function(a,b){ var sa=opts.typeOrder[typeof obj[a]]||opts.typeOrder.default, sb=opts.typeOrder[typeof obj[b]]||opts.typeOrder.default; return ((sa !== sb)?(sa - sb):(a>b?1:-1)); })
                    .map(function(key, i, arr){ return (depth <= opts.doubleSpaceDepth && i?'\n':'') + '\t' + indent + JSON.stringify(key) + (opts.spaceBeforeColon?' ':'') + ':' + (opts.spaceAfterColon?' ':'') + stringify(obj[key], opts, depth+1); })
                    .join(',' + (opts.spaceAfterComma?' ':'') + '\n');
                str += (opts.spaceInsideBraces?' ':'') + '\n' + indent + '}';
                if (opts.sameLineBraces) { str = str.replace(/\n\t*\{/g,'{'); }
            }

            if (str.length < opts.maxLength) { str = str.replace(/\n\t*/g,''); } // collapse short JSON sections
            if (/ \n/.test(str)) { str = str.replace(/ \n/g,'\n'); } // remove extraneous spaces
            if (/^{ +}/.test(str)) { str = str.replace(/^{ +}/,'{}'); } // collapse empty braces

            return str;

        default:
            str = JSON.stringify(obj);
  }

  return str;
}
