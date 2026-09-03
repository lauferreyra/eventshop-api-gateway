import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class EventsService {
  private readonly inventoryServiceUrl: string;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.inventoryServiceUrl =
      this.configService.getOrThrow<string>(
        'inventoryServiceUrl',
      );
  }

  async getEvents() {
    const response =
      await axios.get(
        `${this.inventoryServiceUrl}/events`,
      );

    return response.data;
  }

  async getEvent(name: string) {
    const response =
      await axios.get(
        `${this.inventoryServiceUrl}/events/${encodeURIComponent(name)}`,
      );

    return response.data;
  }
}