import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TimeModule } from './time/time.module';

@Module({
  imports: [TaskModule, EventEmitterModule.forRoot(), TimeModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  /* configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'task', method: RequestMethod.POST },
        { path: 'task', method: RequestMethod.PATCH },
        { path: 'task', method: RequestMethod.DELETE },
      )
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'task', method: RequestMethod.GET });
  } */
}
