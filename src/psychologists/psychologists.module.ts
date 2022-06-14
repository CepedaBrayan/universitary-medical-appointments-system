import { Module } from '@nestjs/common';
import { PsychologistsService } from './psychologists.service';
import { PsychologistsController } from './psychologists.controller';

@Module({
  controllers: [PsychologistsController],
  providers: [PsychologistsService]
})
export class PsychologistsModule {}
