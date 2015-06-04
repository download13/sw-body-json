module.exports = function(opts) {
	opts = opts || {};

	var maxLength = opts.maxLength;

	return function(req, res, next) {
		// Only bother with JSON bodies
		if(req.headers['content-type'] !== 'application/json') {
			next();
			return;
		}

		req.setEncoding('utf8');

		var buf = '';

		req.on('data', function(data) {
			buf += data;

			if(maxLength != null && buf.length > maxLength) {
				res.writeHead(413);
				res.end('Too much data');
				req.destroy();
				return;
			}
		}).on('end', function() {
			try {
				req.body = JSON.parse(buf) || {};
			} catch(e) {
				req.body = {};
			}

			next();
		});
	}
}
