import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class NotificationsService {
  private client: Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    
    // Safer Initialization: Check keys before starting
    if (accountSid && accountSid.startsWith('AC') && authToken) {
      try {
        this.client = new Twilio(accountSid, authToken);
        console.log("✅ Twilio Client Initialized");
      } catch (e) {
        console.error("⚠️ Twilio Init Failed:", e.message);
      }
    } else {
      console.warn("⚠️ Twilio Keys missing or invalid. SMS disabled.");
    }
  }

  async sendWhatsAppConfirmation(name: string, phone: string, date: Date, doctorName: string) {
    const message = `Hello ${name}, your appointment with ${doctorName} on ${date.toDateString()} has been CONFIRMED. ✅`;
    
    // 1. Clean Phone Number
    let cleanPhone = phone.toString().replace(/[^0-9]/g, '');
    if (cleanPhone.length === 10) {
      cleanPhone = '91' + cleanPhone; // Add India code if missing
    }

    const toWhatsapp = `whatsapp:+${cleanPhone}`;
    
    // 2. Define Sender (Hardcoded or from ENV)
    // MAKE SURE THIS MATCHES YOUR TWILIO SANDBOX NUMBER EXACTLY
    const fromWhatsapp = "whatsapp:+14155238886";

    console.log(`[WHATSAPP LOG] Attempting to send...`);
    console.log(` - From: ${fromWhatsapp}`);
    console.log(` - To:   ${toWhatsapp}`);

    // 3. Send Message
    if (this.client && fromWhatsapp) {
      try {
        const response = await this.client.messages.create({
          body: message,
          from: fromWhatsapp, // <--- Correct variable name used here
          to: toWhatsapp
        });
        console.log(`✅ Twilio Success! SID: ${response.sid}`);
      } catch (e) {
        console.error("❌ Twilio Failed:", e.message);
      }
    } else {
       console.warn("❌ skipped: Client not ready.");
    }
  }
}
