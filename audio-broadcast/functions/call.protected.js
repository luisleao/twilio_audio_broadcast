exports.handler = function (context, event, callback) {
    console.log('event', event)
    const twiml = new Twilio.twiml.VoiceResponse();

    if (event.To === '0') {
        // Admin: join conference unmuted and start conference
        console.log('ADMIN')
        twiml.say({ voice: 'alice', language: 'pt-BR' }, 'Acessando o modo administrador do streaming de áudio.');
        twiml.dial().conference({
            startConferenceOnEnter: true,
            endConferenceOnExit: true,
            muted: false
        }, 'EventBroadcast');
    } else {
        // Participant: join conference muted, do not start conference
        twiml.say({ voice: 'alice', language: 'pt-BR' }, 'Obrigado por ligar pra gente. Você será conectado ao streaming de áudio.');
        twiml.dial().conference({
            startConferenceOnEnter: false,
            endConferenceOnExit: false,
            muted: true
        }, 'EventBroadcast');
        twiml.say({ voice: 'alice', language: 'pt-BR' }, 'Parece que nossa sala de transmissão se encerrou. Por favor ligue novamente mais tarde.');
    }
    return callback(null, twiml);



    callback(null, twiml);
};
