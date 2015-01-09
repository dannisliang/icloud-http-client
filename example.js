'use strict';

// To make a POST request, with JSON
var form = JSON.stringify({ value: 1 });

http.post({
    uri: 'YOUR_FORM_URL',
    streaming: false,
    form: form,
    headers: {
        'User-Agent': http.userAgent(),
        'Origin': http.origin()
        'Content-Type': http.mime('json'),
        'Content-Length': form.length
    }
}, function(err, data, cookies, headers) {
    if(!err && data) {
        console.log(data); // string
        console.log(cookies); // any cookies found
        console.log(headers);
    }
});

// To make a GET request
http.get({
    uri: 'YOUR_URL',
    streaming: false,
    headers: {
        'User-Agent': http.userAgent(),
        'Origin': http.origin()
    }
} function(err, data, cookies, headers) {
    if(!err && data) {
        console.log(data); // string
        console.log(cookies); // any cookies found
        console.log(headers);
    }
});
