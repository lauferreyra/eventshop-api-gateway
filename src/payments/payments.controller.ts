import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { PaymentsService } from './payments.service.js';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get(':id')
  async getPayment(
    @Param('id') id: string,
  ) {
    return this.paymentsService.getPayment(id);
  }
}