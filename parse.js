/*
 * This is a JavaScript Scratchpad.
 *
 * Enter some JavaScript, then Right Click or choose from the Execute Menu:
 * 1. Run to evaluate the selected text (Cmd-R),
 * 2. Inspect to bring up an Object Inspector on the result (Cmd-I), or,
 * 3. Display to insert the result in a comment after the selection. (Cmd-L)
 */

var trie = 

var out = {};

var stack = [out];

var current;

for (i=0; i<trie.length; i++) {
    var char = trie[i];
    var code = trie.charCodeAt(i);
    stack.push(code);
    if (code >= 97 && code <= 122) { // a-z
        current = stack[0][char] = {};
    } else if (code === 91) { // [
        stack.unshift(current);
    } else if (code === 93) { // ]
        current = stack.shift();
    }
}
JSON.stringify(out)