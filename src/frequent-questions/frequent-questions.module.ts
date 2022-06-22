import { Module } from '@nestjs/common';
import { FrequentQuestionsService } from './frequent-questions.service';
import { FrequentQuestionsController } from './frequent-questions.controller';

@Module({
  controllers: [FrequentQuestionsController],
  providers: [FrequentQuestionsService]
})
export class FrequentQuestionsModule {}
