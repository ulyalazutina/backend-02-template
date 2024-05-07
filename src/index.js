const http = require('http');
const { URL } = require('url');
const getUsers = require('./modules/users')

const server = http.createServer((request, response) => {
    const url = new URL(request.url, 'http://127.0.0.1:3003');  

    //Если никакие параметры не переданы
    if (url.search === '') {
        response.status = 200;
        response.statusMessage = "OK";
        response.header = 'Content-Type: text/plain';
        response.write('Hello, World!');
        response.end();
        return;
    } 
    //Если параметр hello указан
    else if (url.searchParams.has('hello')) {
        //передано name
        if (url.searchParams.get('hello') !== "") {
            console.log(url.searchParams.get('hello'))
            response.status = 200;
            response.statusMessage = "OK";
            response.header = 'Content-Type: text/plain';
            response.write(`Hello, ${url.searchParams.get('hello')}`);
            response.end();
            return;
        } 
        //не передано name
        else {
            response.status = 400;
            response.statusMessage = "Bad request";
            response.header = 'Content-Type: text/plain';
            response.write(`Enter a name`);
            response.end();
            return;
        }
    } 
    //Если параметр users указан
    else if(url.searchParams.has('users')) {
        response.status = 200;
        response.statusMessage = "OK";
        response.header = 'Content-Type: application/json';
        response.write(getUsers());
        response.end();
        return;
    } 
    //Если переданы какие-либо другие параметры
    else {
        response.status = 500;
        response.end();
        return;
    } 
});


server.listen(3003, () => {
    console.log('Сервер запущен по адресу http://127.0.0.1:3003');
})