var translatorBot = require('../core.js');

translatorBot.controller('DefaultController', function ($) {
    let isTranslating = $.message.text ? $.message.text.match(/^(\/[a-zA-Z]{2} )/) : false;
    if (isTranslating) {
        translatorBot.translate($.message.text.replace(isTranslating[0], ''), isTranslating[1].trim().replace('/', '')).then(function (response) {
            $.sendMessage(`${response}`);
        }).catch(function (reason) {
            $.sendMessage(`Error.Wrong language ${isTranslating[1]}; Ошибка.Не верный язык ${isTranslating[1]}`);
            console.log(reason);
        });
    } else if (translatorBot.translatedGroups[$.chatId] && (translatorBot.translatedGroups[$.chatId].spamActive || (translatorBot.translatedGroups[$.chatId].has($.user.username) || translatorBot.translatedGroups[$.chatId].has($.user.first_name)))) {
        if ($.message.text && $.message.text.length > 3) {
            translatorBot.translate($.message.text, translatorBot.translatedGroups[$.chatId].defaultLanguage).then(function (response) {
                $.sendMessage(`${$.user.username || $.user.first_name}: ${response}`);
            }).catch(function (reason) {
                console.log(reason);
            });
        };
    }
})