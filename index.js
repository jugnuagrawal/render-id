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
    const match = pattern.match(/(.*)\$\{(.*)\}(.*)/);
    if (match) {
        const year = getFinancialYear(match[2]);
        pattern = pattern.replace(/(.*)\$\{(.*)\}(.*)/, '$1' + year + '$3');
    }
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

function getFinancialYear(pattern) {
    const now = new Date();
    const currYear = now.getFullYear();
    const currMonth = now.getMonth() + 1;
    const currDate = now.getDate();
    if (pattern == 'FY-IN') {
        if (currMonth > 3) {
            return currYear + '-' + (currYear + 1);
        } else {
            return (currYear - 1) + '-' + currYear;
        }
    } else if (pattern == 'FY-US') {
        if (currMonth > 9) {
            return currYear + '-' + (currYear + 1);
        } else {
            return (currYear - 1) + '-' + currYear;
        }
    } else if (pattern == 'FY-GB') {
        if (currMonth > 4) {
            return currYear + '-' + (currYear + 1);
        } else if (currMonth < 4) {
            return (currYear - 1) + '-' + currYear;
        } else if (currDate > 5) {
            return currYear + '-' + (currYear + 1);
        } else {
            return (currYear - 1) + '-' + currYear;
        }
    } else {
        return currYear + '-' + (currYear + 1);
    }
}

module.exports = e;