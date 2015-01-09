# icloud-http-client
Minimal http client for use on icloud-session

## Install
    $ git clone https://github.com/alexlincoln/icloud-http-client.git

## Example

```javascript
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
```

## API
### .get(request, callback)
This function will send a GET request with the specified `request`.
See below for `request` specification. `callback` will execute after the request
is sent and return four parameters, `err`, `data`, `cookies`, and `headers`.
See above for an example.

### .post(request, callback)
This function will send a POST request with the specified `params`.
See below for `params` specification. `callback` will execute after the request
is sent and return four parameters, `err`, `data`, `cookies`, and `headers`.
See above for an example.

### .origin()
This is simply a helper function to fill in the `Origin` header, more
specifically for ICloud's authentication procedure.

### .userAgent()
This is simple a helper function to fill in the `User-Agent` header, more
specifically for ICloud's authentication procedure. Recommended to send on
all requests, especially forms.

## Request
There are a few keys to be aware when making either request:
- `uri` (string) - Specifies the url
- `streaming` (bool) - Specifies whether to handle the request yourself as a
stream
- `form` (object) - Specifies the form to use
- `headers` (object) - Specifies the headers to use

Redirects are handled automatically. If you are still unsure, read above for an
example on how to use.

## Bugs/Errors
If you come across any bugs or errors, please submit them.

## TODO
- Tests

## License
Copyright (c) 2015 alexlincoln

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
