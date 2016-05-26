var translatorBot = require('../core.js');

translatorBot.controller('TrackController', ($) => {

    translatorBot.for('/trtrack :userName', ($) => {
        if (translatorBot.translatedGroups[$.chatId]) {
        	$.sendMessage(`Simtranslating ${$.query.userName}; Синхро-перевод активирован для ${$.query.userName} `);
            translatorBot.translatedGroups[$.chatId].add($.query.userName.replace(/^@/, ''));
        } else {
            $.sendMessage(`Use /trstart to activate simtranslation; Инициализируйте синхро-перевод с помощью /trstart`);
        }
    });

    translatorBot.for('/truntrack :userName', ($) => {
        if (translatorBot.translatedGroups[$.chatId]) {
        	$.sendMessage(`Stop simtranslating ${$.query.userName}; Синхро-перевод остановлен для ${$.query.userName} `);
            translatorBot.translatedGroups[$.chatId].delete($.query.userName.replace(/^@/, ''));
        } else {
            $.sendMessage(`Use /trstart to activate simtranslation; Инициализируйте синхро-перевод с помощью /trstart`);
        }
    });

    translatorBot.for('/trclear', ($) => {
        console.log(translatorBot.translatedGroups);
        if (translatorBot.translatedGroups[$.chatId]) {
        	$.sendMessage(`Stop simtranslating; Синхро-перевод остановлен для всех`);
            translatorBot.translatedGroups[$.chatId].clear();
        } else {
            $.sendMessage(`Use /trstart to activate simtranslation; Инициализируйте синхро-перевод с помощью /trstart`);
        }
    });

    translatorBot.for('/trstart', function ($) {
        if ($.message.chat.type.match(/group/gi)) {
            if (!translatorBot.translatedGroups[$.chatId]) {
                translatorBot.translatedGroups[$.chatId] = new Set();
            }

            $.sendMessage(`Activated simptranslator; Cинхро-перевод инициализирован!`);
        }
    });

});