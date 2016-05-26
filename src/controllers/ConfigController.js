var translatorBot = require('../core.js');

translatorBot.controller('ConfigController', function ($) {
    translatorBot.for('/trlang :lang', function ($) {
        if (!translatorBot.translatedGroups[$.chatId]) {
            return $.sendMessage(`Use /trstart to activate simtranslation; Инициализируйте синхро-перевод с помощью /trstart`);
        }
        if ($.query.lang.length === 2) {
            translatorBot.translate('test', $.query.lang).then(() => {
                $.sendMessage(`Changed simtranslator language to ${$.query.lang}; Синхро-перевод на ${$.query.lang} активирован`);
                translatorBot.translatedGroups[$.chatId].defaultLanguage = $.query.lang;
            }).catch(function (reason) {
                $.sendMessage(`Wrong language ${$.query.lang}; Синхро-перевод не активирован. Не верный язык ${$.query.lang}`);
            })
        }
    });

    translatorBot.for('/trspam :state', function ($) {
        if (!translatorBot.translatedGroups[$.chatId]) {
            return $.sendMessage(`Use /trstart to activate simtranslation; Инициализируйте синхро-перевод с помощью /trstart`);
        }
        switch ($.query.state) {
            case 'on':
                translatorBot.translatedGroups[$.chatId].spamActive = true;
                break;
            case 'off':
                translatorBot.translatedGroups[$.chatId].spamActive = false;
                break;
            case '':
                translatorBot.translatedGroups[$.chatId].spamActive = !translatorBot.translatedGroups[$.chatId].spamActive;
                break;
        }
        $.sendMessage(`Mayhem ${translatorBot.translatedGroups[$.chatId].spamActive ? 'started' : 'ended'}; Синхро-перевод для всех ${translatorBot.translatedGroups[$.chatId].spamActive ? 'активирован' : 'деактивирован'}!`);
    });
});