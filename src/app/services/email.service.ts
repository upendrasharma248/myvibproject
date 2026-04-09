import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  sendEmail(serviceID: string, templateID: string, templateParams: any, userID: string): Promise<EmailJSResponseStatus> {
    return emailjs.send(serviceID, templateID, templateParams, userID);
  }
}
