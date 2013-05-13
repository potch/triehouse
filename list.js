
function feed(obj, list) {
    for (var i=0; i<list.length; i++) {
        var word = list[i];
        var current = obj;
        for (var j=0; j<word.length; j++) {
            var char = word[j].toLowerCase();
            if (!current[char]) {
                current[char] = {};
            }
            current = current[char];
        }
    }
}

function parse(string) {
    console.log('parsing ' + string.length + ' bytes');
    var out = {};
    var stack = [out];
    var current;

    for (i=0; i<string.length; i++) {
        var char = string[i];
        var code = string.charCodeAt(i);
        // stack.push(code);
        if (code >= 97 && code <= 122) { // a-z
            current = stack[0][char] = {};
        } else if (code === 91) { // [
            stack.unshift(current);
        } else if (code === 93) { // ]
            current = stack.shift();
        } else {
            throw "unrecognized character";
        }
    }
    return obj;
}

function stringify(obj) {
    var out = '';
    for (var i in obj) {
        out += i;
        var sub = stringify(obj[i]);
        if (sub) {
            out += '[' + sub + ']';
        }
    }
    return out;
}

function check(word, obj) {
    var current = obj;
    for (var i=0; i<word.length; i++) {
        if (current[word[i]]) {
            current = current[word[i]];
        } else {
            return false;
        }
    }
    return true;
}

var fs = require('fs');

var list = fs.readFileSync('wordlist.txt', 'utf-8').toString().split(/\s+/);

// var list = [
//     'apple',
//     'apartment',
//     'appointment',
//     'apart',
//     'apt',
//     'ankle'
// ];

console.log('loading ' + list.length + ' words');

var obj = {};
feed(obj, list);
var json = JSON.stringify(obj);
var compact = stringify(obj);

// console.log(parse(compact));

fs.writeFileSync('json.json', json);
fs.writeFileSync('compact.txt', compact);
