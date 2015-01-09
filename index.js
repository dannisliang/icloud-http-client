'use strict';

var BASE_URL = 'https://www.icloud.com',
    USER_AGENT =
    'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:32.0) Gecko/20100101 Firefox/32.0';

// Handle request
function request(options, callback) {
    var hyperquest = require('hyperquest'), util = require('util');

    var cb = function(err, res) {
        if(res && (res.statusCode === 301 || res.statusCode === 302))
            return hyperquest(res.headers.Location, options, cb);
    };

    var req = hyperquest(options.uri, options, cb);

    // Send back the stream if needed
    if(options.streaming) {
        return callback(null, req);
    }

    req.on('response', function(res) {
        var buffer = [], cookies = [];

        res.on('data', function(chunk) {
            buffer.push(chunk.toString());
        });
        res.on('end', function() {
            return callback(null, buffer.join(''), cookies, res.headers);
        });

        // Catch any invalid http responses
        if(res && res.statusCode !== 200)
            return callback(new Error(util.format('Invalid response code: %d',
                res.statusCode)), null);

        // Add any cookies to collection
        if(res && res.headers['set-cookie']) {
            cookies.push(res.headers['set-cookie']);
            delete res.headers['set-cookie'];
        }
    });

    req.on('error', function(error) {
        return callback(error, null);
    });

    if(options.form) req.write(options.form);
}

// Expose GET request
exports.get = function(options, callback) {
    options['method'] = 'GET';
    return request(options, callback);
};

// Expose POST request
exports.post = function(options, callback) {
    options['method'] = 'POST';
    return request(options, callback);
};

// Specific origin
exports.origin = function() {
    return BASE_URL;
};

// Custom agent
exports.userAgent = function() {
    return USER_AGENT;
};

// TODO: Add more mime types
exports.mime = function(type) {
    if(type.toLowerCase() === 'json') {
        return 'application/json';
    }
    else if(type.toLowerCase() === 'plain') {
        return 'text/plain';
    }
    else if(type.toLowerCase() === 'urlencoded') {
        return 'x-www-form-urlencoded';
    }
};
