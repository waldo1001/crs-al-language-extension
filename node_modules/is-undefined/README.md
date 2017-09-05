
# is-undefined

 [![Support me on Patreon][badge_patreon]][patreon] [![Buy me a book][badge_amazon]][amazon] [![PayPal][badge_paypal_donate]][paypal-donations] [![Version](https://img.shields.io/npm/v/is-undefined.svg)](https://www.npmjs.com/package/is-undefined) [![Downloads](https://img.shields.io/npm/dt/is-undefined.svg)](https://www.npmjs.com/package/is-undefined)

> Check if a value is undefined or not.

## :cloud: Installation

```sh
$ npm i --save is-undefined
```


## :clipboard: Example



```js
const isUndefined = require("is-undefined");

console.log(isUndefined(undefined));
// => true

console.log(isUndefined(false));
// => false

console.log(isUndefined(null));
// => false
```

## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation


### `isUndefined(input)`
Checks if a value is undefined or not.

#### Params
- **Anything** `input`: The input value.

#### Return
- **Boolean** `true`, if the input is `undefined`, `false` otherwise.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :sparkling_heart: Support my projects

I open-source almost everything I can, and I try to reply everyone needing help using these projects. Obviously,
this takes time. You can integrate and use these projects in your applications *for free*! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, there are few ways you can do it:

 - Starring and sharing the projects you like :rocket:
 - [![PayPal][badge_paypal]][paypal-donations]—You can make one-time donations via PayPal. I'll probably buy a ~~coffee~~ tea. :tea:
 - [![Support me on Patreon][badge_patreon]][patreon]—Set up a recurring monthly donation and you will get interesting news about what I'm doing (things that I don't share with everyone).
 - **Bitcoin**—You can send me bitcoins at this address (or scanning the code below): `1P9BRsmazNQcuyTxEqveUsnf5CERdq35V6`

    ![](https://i.imgur.com/z6OQI95.png)

Thanks! :heart:


## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`cli-box`](https://github.com/IonicaBizau/node-cli-box)—A library to generate ASCII boxes via NodeJS
 - [`get-key-or-default`](https://github.com/lewismoten/get-key-or-default#readme) (by Lewis Edward Moten III)—Get object key or default value
 - [`obj-unflatten`](https://github.com/IonicaBizau/obj-unflatten#readme)—Convert flatten objects in nested ones.
 - [`octothorpe-xo`](https://github.com/lewismoten/octothorpe-xo#readme) (by Lewis Edward Moten III)—A game of tic-tac-toe
 - [`powershell`](https://github.com/IonicaBizau/powershell#readme)—Run PowerShell scripts and commands from Node.js.
 - [`spooky-element`](https://github.com/maxtherocket/spooky-element) (by Max Rusan)—A lightweight DOM element wrapper with only the essentials (css, on, off, append, prepend ...)
 - [`spooky-router`](https://github.com/maxtherocket/spooky-router) (by Max Rusan)—The scariest router ever.
 - [`spooky-view-manager`](https://github.com/maxtherocket/spooky-view-manager) (by Max Rusan)—Manages spooky-element views
 - [`tilda`](https://github.com/IonicaBizau/tilda)—Tiny module for building command line tools.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[badge_patreon]: http://ionicabizau.github.io/badges/patreon.svg
[badge_amazon]: http://ionicabizau.github.io/badges/amazon.svg
[badge_paypal]: http://ionicabizau.github.io/badges/paypal.svg
[badge_paypal_donate]: http://ionicabizau.github.io/badges/paypal_donate.svg
[patreon]: https://www.patreon.com/ionicabizau
[amazon]: http://amzn.eu/hRo9sIZ
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(https%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: https://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
