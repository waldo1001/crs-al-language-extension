
# spawno

 [![Patreon](https://img.shields.io/badge/Support%20me%20on-Patreon-%23e6461a.svg)][patreon] [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/spawno.svg)](https://www.npmjs.com/package/spawno) [![Downloads](https://img.shields.io/npm/dt/spawno.svg)](https://www.npmjs.com/package/spawno) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Easily work with child processes.

## :cloud: Installation

```sh
$ npm i --save spawno
```


## :clipboard: Example



```js
const spawn = require("spawno");

spawn("ls", ["-l"], { cwd: __dirname }, (err, stdout, stderr) => {
    console.log(err || stderr || stdout);
    // =>
    // total 4
    // -rw-rw-r-- 1 ionicabizau ionicabizau 256 Mar 27 14:53 index.js
});

// Pipe the output in the stdout/stderr streams (this will not collect the output in memory)
let proc = spawn("ping", ["ionicabizau.net"], {
    cwd: __dirname
  , _showOutput: true
});
// =>
// PING ionicabizau.net (109.107.37.233) 56(84) bytes of data.
// 64 bytes from cip-109-107-37-233.gb1.brightbox.com (109.107.37.233): icmp_seq=1 ttl=54 time=49.2 ms
// 64 bytes from cip-109-107-37-233.gb1.brightbox.com (109.107.37.233): icmp_seq=2 ttl=54 time=44.4 ms
// 64 bytes from cip-109-107-37-233.gb1.brightbox.com (109.107.37.233): icmp_seq=3 ttl=54 time=47.9 ms
// 64 bytes from cip-109-107-37-233.gb1.brightbox.com (109.107.37.233): icmp_seq=4 ttl=54 time=46.3 ms
```

## :memo: Documentation


### `spawno(command, args, options, cb)`
Creates the child process.

#### Params
- **String** `command`: The command you want to run.
- **Array** `args`: The command arguments.
- **Object** `options`: The options to pass to the `spawn` function extended with:
 - `_showOutput` (Boolean): If truly, the output will be piped in the
   process stdout/stderr streams.
- **Function** `cb`: The callback function.

#### Return
- **Process** The child process that was created.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].


## :moneybag: Donations

Another way to support the development of my open-source modules is
to [set up a recurring donation, via Patreon][patreon]. :rocket:

[PayPal donations][paypal-donations] are appreciated too! Each dollar helps.

Thanks! :heart:

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`babel-it`](https://github.com/IonicaBizau/babel-it#readme)—Babelify your code before `npm publish`.
 - [`electroner`](https://github.com/IonicaBizau/electroner#readme)—Start ElectronJS apps from Node.js.
 - [`fortran`](https://github.com/IonicaBizau/node-fortran)—Fortran bridge for Node.js which allows you to run Fortran code from Node.js.
 - [`git-cloner`](https://github.com/IonicaBizau/git-cloner#readme)—Clone multiple git repositories.
 - [`git-status`](https://github.com/IonicaBizau/git-status#readme)—A git-status wrapper.
 - [`initial-commit-date`](https://github.com/IonicaBizau/initial-commit-date#readme)—Get the initial commit date of a git repository.
 - [`powershell`](https://github.com/IonicaBizau/powershell#readme)—Run PowerShell scripts and commands from Node.js.
 - [`pull-from-source`](https://github.com/IonicaBizau/pull-from-source#readme)—Pulls the changes from the source repository in the forked one.
 - [`ship-release`](https://github.com/IonicaBizau/ship-release#readme)—Publish new versions on GitHub and npm with ease.
 - [`spawn-npm`](https://github.com/IonicaBizau/spawn-npm#readme)—Run npm commands by creating child processes.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[patreon]: https://www.patreon.com/ionicabizau
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
