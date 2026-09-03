import {
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrdersService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @Post()
  async createOrder(
    @Body() order: CreateOrderDto,

    @Headers('X-Correlation-ID')
    correlationId: string,
  ) {
    return this.ordersService.createOrder(
      order,
      correlationId,
    );
  }
}