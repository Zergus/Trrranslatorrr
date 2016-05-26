var translatorBot = require('../core.js');

var helpText = `/trstart - start simtranslate; инициализировать синхро-перевод;
/trtrack @user - start simtranslating @user; начать переводить иносранца;
/truntrack @user - stop simtranslating @user; остановить перевод иносранца;
/trclear - stop all simtranslations; остановить все переводы
/trlist - show list of users to be simtranslated; показать иносранцев
/[lang] - translate to other language ("/de something" for example); перевести сообщение на другой язык, например "/de перевести на немецкий"
/trlang [lang] - change language of simtranslating; синхро-перевод будет выполнятся на определенном языке
/trspam [on, off] - start mayhem (simtranslating group); включить синхро-перевод для всех`;

translatorBot.controller('HelpController', function ($) {
	translatorBot.for('/trhelp', ($) => {
        $.sendMessage(helpText);
    });

    translatorBot.for('/trlist', ($) => {
        if (translatorBot.translatedGroups[$.chatId] && translatorBot.translatedGroups[$.chatId].size) {
            $.sendMessage(`${Array.from(translatorBot.translatedGroups[$.chatId])}`);
        } else {
            $.sendMessage('Empty list; Список пуст;');
        }
    })
})