import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { EventsService } from './events.service.js';

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
  ) {}

  @Get(':name')
  async getEvent(
    @Param('name') name: string,
  ) {
    return this.eventsService.getEvent(name);
  }
}