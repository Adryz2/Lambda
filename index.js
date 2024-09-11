const Alexa = require('ask-sdk-core');
const axios = require('axios');  // Asegúrate de incluir axios en tu proyecto

const ESP32_IP = '192.168.0.194';  // Cambia esto a la IP de tu ESP32

const EncenderCarroIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EncenderCarroIntent';
    },
    async handle(handlerInput) {
        try {
            await axios.get(`http://${ESP32_IP}/encender`);
            return handlerInput.responseBuilder
                .speak('El carro está encendido.')
                .getResponse();
        } catch (error) {
            console.log(`Error: ${error}`);
            return handlerInput.responseBuilder
                .speak('Lo siento, no pude encender el carro.')
                .getResponse();
        }
    }
};

const ApagarCarroIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ApagarCarroIntent';
    },
    async handle(handlerInput) {
        try {
            await axios.get(`http://${ESP32_IP}/apagar`);
            return handlerInput.responseBuilder
                .speak('El carro está apagado.')
                .getResponse();
        } catch (error) {
            console.log(`Error: ${error}`);
            return handlerInput.responseBuilder
                .speak('Lo siento, no pude apagar el carro.')
                .getResponse();
        }
    }
};

const ArrancarMotorIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ArrancarMotorIntent';
    },
    async handle(handlerInput) {
        try {
            await axios.get(`http://${ESP32_IP}/arrancar`);
            return handlerInput.responseBuilder
                .speak('El motor está arrancado.')
                .getResponse();
        } catch (error) {
            console.log(`Error: ${error}`);
            return handlerInput.responseBuilder
                .speak('Lo siento, no pude arrancar el motor.')
                .getResponse();
        }
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('Lo siento, no he podido procesar tu solicitud.')
            .reprompt('Lo siento, no he podido procesar tu solicitud.')
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        EncenderCarroIntentHandler,
        ApagarCarroIntentHandler,
        ArrancarMotorIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
