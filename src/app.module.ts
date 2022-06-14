import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkshopsModule } from './workshops/workshops.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [WorkshopsModule, StudentsModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
