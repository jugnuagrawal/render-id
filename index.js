String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}


const e = {};

/**
 * @param {string} pattern The pattern of the ID
 * @param {number} nextNumber Next incremented counter number for ID
 * @return {string} ID made from the pattern.
 */
e.render = function (pattern, nextNumber) {
    let parsedString = pattern;
    let tempNext = nextNumber;
    let length = 0;
    let nextLen = 0;
    let idIndex = 0;
    let idStr = '';
    for (let i = 0; i < pattern.length; i++) {
        if (pattern.charAt(i) === '#') {
            length++;
        }
    }
    while (tempNext > 0) {
        tempNext = Math.floor(tempNext / 10);
        nextLen += 1;
    }
    if (nextLen > length) {
        for (let i = 0; i < nextLen - length; i++) {
            pattern += '#';
            parsedString += '#';
        }
        length = nextLen;
    }
    for (let i = 0; i < length - nextLen; i++) {
        idStr += '0';
    }
    idStr += nextNumber;
    if (length > 0) {
        for (let i = 0; i < pattern.length; i++) {
            if (parsedString.charAt(i) === '#') {
                parsedString = parsedString.replaceAt(i, idStr.charAt(idIndex));
                idIndex++;
            }
        }
    } else {
        parsedString = pattern + nextNumber;
    }
    return parsedString;
};

module.exports = e;