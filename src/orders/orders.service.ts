import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OrdersService {
  private readonly orderServiceUrl: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.orderServiceUrl =
      this.configService.getOrThrow<string>(
        'orderServiceUrl',
      );
  }

  async createOrder(
    order: unknown,
    correlationId: string,
  ) {
    const response =
      await axios.post(
        `${this.orderServiceUrl}/orders`,
        order,
        {
          headers: {
            'X-Correlation-ID':
              correlationId,
          },
        },
      );

    return response.data;
  }
}