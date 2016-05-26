var config = require('../config/conf.json');
var yandex = require('yandex-translate')(config.ydxToken);
var translatorBot = require('../vendor/telegram-node-bot')(config.botToken);

translatorBot.translatedGroups = {};

translatorBot.translate = function (text, to = 'en') {
    return new Promise(function (resolve, reject) {
        if (!text || !to) {
            return reject(false);
        }
        yandex.translate(text, { to }, function(err, res) {
            if (!res) return reject(null);

            if (res.code === 200) {
                resolve(res.text);
            } else {
                reject(err ? err : res.text);
            }
        });
    })
};

module.exports = translatorBot;