function testcall(queries,params) { 
    return {params, queries }
}

function testcall1() {
    return {
        test: "testing"
    }
}

const getRoutes = new Map();
getRoutes.set("/test/:test", testcall);
getRoutes.set("/test1", testcall1);

const {constructServer} = require('./lib/index');

constructServer(__dirname, getRoutes);
