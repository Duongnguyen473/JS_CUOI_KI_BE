// src/payos/payos.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import PayOS = require('@payos/node');

@Injectable()
export class PayosService {
  private readonly payos: PayOS;
  constructor(private readonly configService: ConfigService) {
    this.payos = new PayOS(
      this.configService.get<string>('payos.clientId'),
      this.configService.get<string>('payos.apiKey'),
      this.configService.get<string>('payos.checksumKey'),
    );
  }

  async createPayment(amount: number) {
    const orderCode = Number(
      `${Date.now()}${Math.floor(Math.random() * 900)
        .toString()
        .padStart(3, '0')}`,
    );
    const cancelUrl = `${process.env.APP_URL}/payment/cancel`;
    const returnUrl = `${process.env.APP_URL}/payment/success`;

    return this.payos.createPaymentLink({
      orderCode,
      amount,
      description: 'NAPVI',
      cancelUrl,
      returnUrl,
    });
  }

  async getPaymentStatus(orderCode: number) {
    return this.payos.getPaymentLinkInformation(orderCode);
  }
  async cancelPayment(orderCode: number) {
    return this.payos.cancelPaymentLink(orderCode);
  }
}
