import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkshopsModule } from './workshops/workshops.module';

@Module({
  imports: [WorkshopsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
