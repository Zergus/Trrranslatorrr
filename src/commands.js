var translatorBot = require('./core.js');

translatorBot.router
    .when(['/trtrack :userName', '/truntrack :userName', '/trclear', '/trstart'], 'TrackController')
    .when(['/trhelp', '/trlist'], 'HelpController')
    .when(['/trlang :lang', '/trspam :state'], 'ConfigController')
    .otherwise('DefaultController')