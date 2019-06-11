const {Router} = require("express");
const router = Router();
const messagesCtrl = require("./messagesController.js");
const {browserName, browserVersion, userDevice} = require("./headers.js");
const {writeLog, writeRequests} = require('./writeLog.js');

router.use((req, res, next) => {
    res.locals.log = {
        bName: browserName(req.headers['user-agent']),
        bVersion: browserVersion(req.headers['user-agent']),
        uDevice: userDevice(req.headers['user-agent']),
        startTime: new Date(),
        headers: req.headers,
        method: req.method,
        url: req.url,
    };

    res.once('finish', () => {
        res.locals.log.statusCode = res.statusCode;
        res.locals.log.endTime = new Date();
        writeLog(res.locals.log);
    });

    res.once('close', () => {
        res.locals.log.statusCode = 500;
        writeLog(res.locals.log);
    });

    next();
});

router.get("/", messagesCtrl.getMessages);
router.get("/:name", messagesCtrl.getMessageByName);
router.post("/messages", messagesCtrl.addNewMessage);

module.exports = router;