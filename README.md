# connect-ua-parser

Integrates ua-parser with connect/express

## Installation

```
npm install connect-ua-parser
```

## Usage

Initialize the middleware with :

``` js
var connect = require('connect'),
    connectUaParser = require('connect-ua-parser'),
    app = connect();

app.use(connectUaParser());
```

By default, the middleware will parse the user-agent header using the
[ua-parser](https://github.com/tobie/ua-parser) library and attach it to the
request object at `req.useragent`.

## Options

#### requestKey

Specifies the key on the request object the parsed user-agent info will be
attached. Defaults to `useragent`.

#### ua

Specifies whether to use the ua parser from the 
[ua-parser](https://github.com/tobie/ua-parser#usage--nodejs) library. Defaults
to `true`.

#### os

Specifies whether to use the os parser from the
[ua-parser](https://github.com/tobie/ua-parser#usage--nodejs) library. Defaults
to `true`.

#### device

Specifies whether to use the device parser from the
[ua-parser](https://github.com/tobie/ua-parser#usage--nodejs) library. Defaults
to `true`.
