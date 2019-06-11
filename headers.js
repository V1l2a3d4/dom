const browserName = (ua) => {
    if (ua.search(/MSIE/) > -1) return "Ie";
    if (ua.search(/Trident/) > -1) return "Iet";
    if (ua.search(/Firefox/) > -1) return "Firefox";
    if (ua.search(/Opera/) > -1) return "Opera";
    if (ua.search(/Chrome/) > -1) return "Chrome";
    if (ua.search(/Safari/) > -1) return "Safari";
    if (ua.search(/Konqueror/) > -1) return "Konqueror";
    if (ua.search(/Iceweasel/) > -1) return "Iceweasel";
    if (ua.search(/SeaMonkey/) > -1) return "Seamonkey";
};
exports.browserName = browserName;

exports.browserVersion =(ua)=> {
    let bName = browserName(ua);
    let arrayUa = ua.split(' ');
    return arrayUa.filter((prop) => {
        if (prop.search(bName) > -1) {
            return prop;
        }
    });
};

exports.userDevice = (ua) => {
    if (ua.search(/Android/) > -1) return 'Android';
    if (ua.search(/iPhone/) > -1) return 'iPhone';
    if (ua.search(/iPad/) > -1) return 'iPad';
    if (ua.search(/Symbian/) > -1) return 'Symbian';
    if (ua.search(/Windows Phone/) > -1) return 'Windows Phone';
    if (ua.search(/Tablet OS/) > -1) return 'Tablet OS';
    if (ua.search(/Linux/) > -1) return 'Linux';
    if (ua.search(/Windows NT/) > -1) return 'Windows NT';
    if (ua.search(/Macintosh/) > -1) return 'Macintosh';
};