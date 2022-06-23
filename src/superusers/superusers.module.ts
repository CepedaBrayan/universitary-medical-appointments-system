import { Module } from '@nestjs/common';
import { SuperusersService } from './superusers.service';
import { SuperusersController } from './superusers.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  controllers: [SuperusersController],
  providers: [SuperusersService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class SuperusersModule {}
