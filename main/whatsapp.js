import twilio from 'twilio';
import { configDotenv } from 'dotenv';

configDotenv();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');


client.messages
    .create({
        from: process.env.TWILIO_WHATSAPP_FROM,
        body: `Vagas do dia ${day}/${month}`,
        mediaUrl: ['https://b62d-45-6-110-238.ngrok-free.app/uploads/vagas.xlsx'],
        to: process.env.TWILIO_WHATSAPP_TO
    })
    .then(message => console.log(message.sid))
    .catch(error => console.error('Erro ao enviar mensagem:', error));
