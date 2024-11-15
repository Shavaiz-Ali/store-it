"use server";

import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transpost = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: "shavaizali159@gmail.com",
    pass: "eccd yjvc goem oekc",
  },
} as SMTPTransport.Options);

type sendEmailDto = {
  sender: Mail.Address;
  receipients: Mail.Address[];
  subject: string;
  message: string;
};

export const sendEmail = async (dto: sendEmailDto) => {
  const { sender, receipients, subject, message } = dto;

  return await transpost.sendMail({
    from: sender,
    to: receipients,
    subject,
    html: message,
    text: message,
  });
};
