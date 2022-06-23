import { Module } from '@nestjs/common';
import { FrequentQuestionsService } from './frequent-questions.service';
import { FrequentQuestionsController } from './frequent-questions.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  controllers: [FrequentQuestionsController],
  providers: [FrequentQuestionsService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class FrequentQuestionsModule {}
