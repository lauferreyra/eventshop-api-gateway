import {
  Controller,
  Get,
  Post,
  Body
} from '@nestjs/common';

import { OrdersService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Post()
  async createOrder(
    @Body() order: unknown,
  ) {
    return this.ordersService.createOrder(
      order,
    );
  }
}