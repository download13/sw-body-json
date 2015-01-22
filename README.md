# sw-body-json

Provides a middlware handler which parses `Content-Type: application/json` bodies into a value on `req.body`.

## Install

`npm install sw-body-json`

## Example

```javascript
var http = require('http');
var sw = require('simpleware');


var bodyjson = require('sw-body-json')({
	maxLength: 8192 // The maximum length of the body
});

app.post('/posttopath', bodyjson, function(req, res) {
	res.end(req.body.say);
});
```
