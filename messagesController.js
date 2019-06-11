exports.getMessages = (req, res) => {
    res.render('index.nunjucks', {
        arr: req.app.locals.messages,
        urlInfo: '/info'
    });
};

exports.getMessageByName = async (req, res) => {
    const fileName = req.params.name;
    if (fileName === 'messages') {
        queryArray = Object.keys(req.query);
        if (queryArray.length > 0) {
            queryArray.forEach((queryId) => {
                if (req.query[queryId]) queryObj[queryId] = req.query[queryId];
            });

            queryArray.forEach((queryId) => {
                if (queryId === 'sort') {
                    (queryObj['sortValue'] === 'asc')
                        ? messages = sortAsc(messages, queryObj['sort'])
                        : messages = sortDesc(messages, queryObj['sort']);
                }

                if (queryId === 'limit') {
                    messages = arrayLimit(messages, queryObj['limit']);
                }

                if (queryId === 'skip') {
                    messages = arraySkip(messages, queryObj['skip']);
                }
            });
        }

        sendData(req, res, JSON.stringify(messages));
    } else if (fileName === 'info') {
        const html = nunjucks.render('info.nunjucks', {
            bName: log.bName,
            bVersion: log.bVersion,
            serverTime: new Date(),
            urlImajes: '/jpg'
        });
        sendData(req, res, html);

    } else if (path.extname(fileName) === 'jpg' || 'png' || 'mp4' || 'ICO') {
        filePath = path.join(__dirname, fileName);
        const isFileExists = fs.existsSync(filePath);
        if (!isFileExists) {
            const fileList = await fs.readdirAsync(__dirname);
            const fileExists = fileList.find(el => path.extname(el) === `.${fileName}`);
            if (!fileExists) {
                res.statusCode = 404;
                sendData(req, res, '404');
            } else {
                sendFile(req, res, path.join(__dirname, fileExists));
            }
        }
    }
};

let counter = 0;
exports.addNewMessage = (req, res) => {
    req.app.locals.messages.push({
        id: counter++,
        ...req.body,
        addedAt: new Date()});
    res.json(req.app.locals.messages);
};