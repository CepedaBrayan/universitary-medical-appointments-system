import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkshopsModule } from './workshops/workshops.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { PsychologistsModule } from './psychologists/psychologists.module';

@Module({
  imports: [WorkshopsModule, StudentsModule, ConfigModule.forRoot(), PsychologistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
