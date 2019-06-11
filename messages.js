let counter = 0;

function sendFile(req, res, urlFile) {
    log.startTime = new Date();
    log.headers = req.headers;
    log.method = req.method;
    log.url = req.url;
    res.once('finish', () => {
        log.statusCode = res.statusCode;
        log.endTime = new Date();
        writeLog(log);
    });
    res.once('close', () => {
        log.statusCode = 500;
        writeLog(log);
    });
    res.sendFile(urlFile);
}

function sortAsc(objs, item) {
    return objs.sort((a, b) => (a[item] > b[item]) ? 1 : ((b[item] > a[item]) ? -1 : 0));
}

function sortDesc(objs, item) {
    return objs.sort((a, b) => (a[item] < b[item]) ? 1 : ((b[item] < a[item]) ? -1 : 0));
}

function arrayLimit(objs, index) {
    if (index >= 0 && index < 51) return objs.slice(0, index);
}

function arraySkip(objs, index) {
    if (index >= 0 && index < 501) return objs.slice(index);
}

let queryObj = {
    sort: 'addedAt',
    sortValue: 'desc',
    limit: 10,
    skip: 0
};
let queryArray = [];
let filePath = '';

setInterval(() => {
    writeRequests(log);
}, 60000);

