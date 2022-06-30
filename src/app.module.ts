import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkshopsModule } from './workshops/workshops.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { PsychologistsModule } from './psychologists/psychologists.module';
import { FrequentQuestionsModule } from './frequent-questions/frequent-questions.module';
import { SuperusersModule } from './superusers/superusers.module';
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [WorkshopsModule, StudentsModule, ConfigModule.forRoot(), PsychologistsModule, FrequentQuestionsModule, SuperusersModule, AppointmentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
