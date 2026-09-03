import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class PaymentsService {
  private readonly paymentServiceUrl: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.paymentServiceUrl =
      this.configService.getOrThrow<string>(
        'paymentServiceUrl',
      );
  }

  async getPayment(id: string) {
    const response = await axios.get(
      `${this.paymentServiceUrl}/payments/${id}`,
    );

    return response.data;
  }
}