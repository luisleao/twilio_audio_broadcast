const AccessToken = require('twilio').jwt.AccessToken;

const VoiceGrant = AccessToken.VoiceGrant;

exports.handler = function (context, event, callback) {
    const identity = event.identity; // Recebe o identificador do cliente

    console.log('context', context)

    // Credenciais do Twilio do arquivo .env ou configuradas no contexto
    const twilioAccountSid = context.ACCOUNT_SID;
    const twilioApiKey = context.API_KEY_SID;
    const twilioApiSecret = context.API_KEY_SECRET;
    const outgoingApplicationSid = context.APP_SID; // SID da aplicação de voz

    // Cria o grant de voz
    const voiceGrant = new VoiceGrant({
        outgoingApplicationSid: outgoingApplicationSid,
        incomingAllow: false // Permite chamadas recebidas
    });

    // Cria o token de acesso
    const token = new AccessToken(
        twilioAccountSid,
        twilioApiKey,
        twilioApiSecret,
        { identity: identity }
    );
    token.addGrant(voiceGrant);

    // Retorna o token JWT
    callback(null, { token: token.toJwt() });
};
