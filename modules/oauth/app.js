const app = require('express')();

const OAuth2Server = require('oauth2-server'),
	Request = OAuth2Server.Request,
    Response = OAuth2Server.Response;

app.oauth = new OAuth2Server({
    model: require('./oauth-model'), /** @TODO load from factory */
    accessTokenLifetime: (60 * 60 * 24)*7,
    allowBearerTokensInQueryString: true
});

module.exports = {
    oauth:app.oauth,
    request: Request,
    response: Response
};