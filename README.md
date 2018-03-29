# Wittr - Indexed DB

## Running using local machine

### Installing the indexed db ( creating )

Dependencies:

* [Server.js](https://github.com/pvt-16/Wittr-project/blob/pvt-idb-branch/server/Server.js) 

```sh
this._app.get('/idb-test/', (req, res) {
...
})
```
Here it is defined that we need to navigate to '/idb-test' to use the idb.js file. We can change it to anything else, eg. '/zxy', and when we navigate to http://localhost:8888/zxy , we will create the idb.

### Import

```sh
import idbTestTemplate from './templates/idb-test';
```
Find the file at [idb-test.hbs](https://github.com/pvt-16/Wittr-project/blob/pvt-idb-branch/templates/idb-test.hbs)

### Source file for Idb

(https://github.com/pvt-16/Wittr-project/blob/pvt-idb-branch/public/js/idb-test/index.js)

This js file runs only when you navigate to /idb-test, as defined above.

# Original ReadME file contents here : 

You can configure the ports by changing them in `docker-compose.yml` before starting:

```yml
ports:
  # <host>:<container>
  - 8000:8888
  - 8001:8889
```

## Troubleshooting

* Errors while executing `npm run serve`.
  * The first thing to try is to upgrade to latest version of node.
  * If latest version also produces errors, try installing v4.5.0.
    * An easy fix for that would be [to use `nvm`](http://stackoverflow.com/a/7718438/1585523).
* If you get any node-sass errors, try running `npm rebuild node-sass --force` or the remove `node_modules` folder and run `npm install` again
