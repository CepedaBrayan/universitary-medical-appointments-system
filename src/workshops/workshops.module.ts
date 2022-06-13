import { Module } from '@nestjs/common';
import { WorkshopsService } from './workshops.service';
import { WorkshopsController } from './workshops.controller';

@Module({
  controllers: [WorkshopsController],
  providers: [WorkshopsService]
})
export class WorkshopsModule {}
