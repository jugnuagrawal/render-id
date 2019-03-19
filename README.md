# render-id
Converts a string pattern to a string by replacing all the '#' to '0' after replacing the next counter number.

### Example 1
```javascript
const renderId = require('render-id');
renderId.render('TES#######',12);

// output : TES0000012
```

### Example 2
```javascript
const renderId = require('render-id');
renderId.render('XYZ#####99##',1234);

// output : XYZ000129934
```

### Example 3
```javascript
const renderId = require('render-id');
renderId.render('ABC##99##',123456);

// output : ABC12993456
```
