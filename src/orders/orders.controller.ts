import {
  Body,
  Controller,
  Headers,
  Post,
  Get,
  Param
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

  @Get(':id')
  async getOrder(
    @Param('id') id: string,
  ) {
    return this.ordersService.getOrder(id);
  }
  }