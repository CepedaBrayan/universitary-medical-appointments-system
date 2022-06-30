import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { FindPsychoAppointmentDto } from './dto/find-psycho-appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';
import { FinishAppointmentDto } from './dto/finish-appointment.dto';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get('/psycho-appointments')
  findPsychoAppointments(
    @Body() findPsychoAppointmentDto: FindPsychoAppointmentDto,
  ) {
    return this.appointmentsService.findPsychoAppointments(
      findPsychoAppointmentDto,
    );
  }

  @Post('/create-appointment')
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Get('my-appointments-student')
  myAppointmentsStudent(@Body() payload: { auth_token: string }) {
    return this.appointmentsService.myAppointmentsStudent(payload);
  }

  @Get('my-appointments-psycho')
  myAppointmentsPsycho(@Body() payload: { auth_token: string }) {
    return this.appointmentsService.myAppointmentsPsycho(payload);
  }

  @Post('/cancel-appointment')
  cancelAppointment(@Body() cancelAppointmentDto: CancelAppointmentDto) {
    return this.appointmentsService.cancelAppointment(cancelAppointmentDto);
  }

  @Post('finish-appointment')
  finishAppointment(@Body() finishAppointmentDto: FinishAppointmentDto) {
    return this.appointmentsService.finishAppointment(finishAppointmentDto);
  }
}
