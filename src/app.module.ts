import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OrdersModule } from './orders/orders.module.js';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration.js';
import { EventsModule } from './events/events.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { CorrelationIdMiddleware } from './common/middleware/correlation-id.middleware.js';

@Module({
    imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  EventsModule,
    OrdersModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  implements NestModule {

  configure(
    consumer: MiddlewareConsumer,
  ) {
    consumer
      .apply(CorrelationIdMiddleware)
      .forRoutes('*');
  }
}