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

  async getOrders() {
    const response = await axios.get(
      `${this.orderServiceUrl}/orders`,
    );

    return response.data;
  }

    async createOrder(order: unknown) {
    const response = await axios.post(
      `${this.orderServiceUrl}/orders`,
      order,
    );

    return response.data;
  }
}