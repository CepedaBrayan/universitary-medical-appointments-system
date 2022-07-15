import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { FindPsychoAppointmentDto } from './dto/find-psycho-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CancelAppointmentDto } from './dto/cancel-appointment.dto';
import { FinishAppointmentDto } from './dto/finish-appointment.dto';
import { PutAppointmentRatingDto } from './dto/put-appointment-rating.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class AppointmentsService {
  constructor(private jwtService: JwtService) {}

  async findPsychoAppointments(
    findPsychoAppointmentDto: FindPsychoAppointmentDto,
  ) {
    try {
      if (
        !(await this.authStudent(findPsychoAppointmentDto.auth_token)) &&
        !(await this.authPsycho(findPsychoAppointmentDto.auth_token))
      )
        throw new UnauthorizedException();
      const appointments = await prisma.medical_appointment.findMany({
        where: {
          psycho_id: findPsychoAppointmentDto.psychologist_id,
        },
        select: {
          date_appointment: true,
          status_appointment: true,
        },
      });
      if (!appointments[0])
        return { message: 'No appointments found for this psychologist' };
      return appointments;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    try {
      if (!(await this.authStudent(createAppointmentDto.auth_token)))
        throw new UnauthorizedException();
      const psycho = await prisma.psychology.findUnique({
        where: { id: createAppointmentDto.psychologist_id },
      });

      if (!psycho) return { message: 'Psychologist not found' };
      if (!psycho.active) return { message: 'Psychologist not active' };
      if (new Date(createAppointmentDto.date_appointment) < new Date())
        return { message: 'Invalid date' };
      // date must be in the future
      const verifAppointment = await prisma.medical_appointment.findMany({
        where: {
          psycho_id: createAppointmentDto.psychologist_id,
          date_appointment: new Date(createAppointmentDto.date_appointment),
        },
      });
      if (verifAppointment[0])
        return {
          message: 'This hour is not available for create an appointment',
        };
      var decodedJwtAccessToken: any = this.jwtService.decode(
        createAppointmentDto.auth_token,
      );
      var student_id: number = decodedJwtAccessToken.id;
      const student = await prisma.student.findUnique({
        where: { id: student_id },
      });
      var a: any = new Date(createAppointmentDto.date_appointment);
      const appointment = await prisma.medical_appointment.create({
        data: {
          student_id: student_id,
          psycho_id: createAppointmentDto.psychologist_id,
          date_request: new Date(),
          date_appointment: new Date(createAppointmentDto.date_appointment),
          status_appointment: 'active',
        },
      });
      const nodemailer = require('nodemailer');

      var transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
          ciphers: 'SSLv3',
        },
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      var mailOptions = {
        from: process.env.EMAIL_USER.toString(),
        to: [student.email, psycho.email],
        subject: 'Appointment created',
        text:
          'Appointment created for ' +
          student.name +
          ' with the psychologist ' +
          psycho.name +
          ' at ' +
          appointment.date_appointment +
          '.' +
          ' Created at ' +
          appointment.date_request +
          '.',
      };

      await transporter.sendMail(
        mailOptions,
        await function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        },
      );
      return { message: 'Appointment created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async myAppointmentsStudent(payload: { auth_token: string }) {
    try {
      if (!(await this.authStudent(payload.auth_token)))
        throw new UnauthorizedException();
      var decodedJwtAccessToken: any = this.jwtService.decode(
        payload.auth_token,
      );
      var student_id: number = decodedJwtAccessToken.id;
      const appointments = await prisma.medical_appointment.findMany({
        where: {
          student_id: student_id,
        },
        select: {
          id: true,
          psychology: {
            select: {
              name: true,
            },
          },
          date_request: true,
          date_appointment: true,
          status_appointment: true,
          psycho_diagnosis: true,
          student_rating: true,
          psycho_treatment: true,
        },
      });
      if (!appointments[0])
        return { message: 'No appointments found for this student' };
      return appointments;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async myAppointmentsPsycho(payload: { auth_token: string }) {
    try {
      if (!(await this.authPsycho(payload.auth_token)))
        throw new UnauthorizedException();
      var decodedJwtAccessToken: any = this.jwtService.decode(
        payload.auth_token,
      );
      var psycho_id: number = decodedJwtAccessToken.id;
      const appointments = await prisma.medical_appointment.findMany({
        where: {
          psycho_id: psycho_id,
        },
        select: {
          id: true,
          student: {
            select: {
              name: true,
            },
          },
          date_request: true,
          date_appointment: true,
          status_appointment: true,
          psycho_diagnosis: true,
          student_rating: true,
          psycho_treatment: true,
        },
      });
      if (!appointments[0])
        return { message: 'No appointments found for this Psychologist' };
      return appointments;
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async cancelAppointment(cancelAppointmentDto: CancelAppointmentDto) {
    try {
      if (
        !(await this.authStudent(cancelAppointmentDto.auth_token)) &&
        !(await this.authPsycho(cancelAppointmentDto.auth_token)) &&
        !(await this.authSuperuser(cancelAppointmentDto.auth_token))
      )
        throw new UnauthorizedException();

      const appointment = await prisma.medical_appointment.findUnique({
        where: {
          id: cancelAppointmentDto.appointment_id,
        },
      });
      if (!appointment) return { message: 'Appointment not found' };
      const student = await prisma.student.findUnique({
        where: { id: appointment.student_id },
      });
      const psycho = await prisma.psychology.findUnique({
        where: { id: appointment.psycho_id },
      });
      var decodedJwtAccessToken: any = this.jwtService.decode(
        cancelAppointmentDto.auth_token,
      );
      var user_id: number = decodedJwtAccessToken.id;
      if (
        user_id != appointment.student_id &&
        user_id != appointment.psycho_id &&
        !(await this.authSuperuser(cancelAppointmentDto.auth_token))
      )
        throw new UnauthorizedException();
      if (appointment.status_appointment === 'canceled')
        return { message: 'Appointment already canceled' };
      if (appointment.status_appointment === 'finished')
        return { message: 'Appointment already finished' };
      if (appointment.status_appointment === 'active') {
        if (new Date() > new Date(appointment.date_appointment))
          return { message: 'Appointment already passed' };
        if (
          new Date(appointment.date_appointment).getTime() -
            new Date().getTime() <
          28800000
        )
          return {
            message: 'Appointment must canceled be at least 8 hours before',
          };
        const appointmentCanceled = await prisma.medical_appointment.update({
          where: { id: cancelAppointmentDto.appointment_id },
          data: {
            status_appointment: 'canceled',
          },
        });

        const nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
          host: 'smtp-mail.outlook.com', // hostname
          secureConnection: false, // TLS requires secureConnection to be false
          port: 587, // port for secure SMTP
          tls: {
            ciphers: 'SSLv3',
          },
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });

        var mailOptions = {
          from: process.env.EMAIL_USER.toString(),
          to: [student.email, psycho.email],
          subject: 'Appointment canceled',
          text:
            'Appointment between student: ' +
            student.name +
            ' and psychologist: ' +
            psycho.name +
            ' at ' +
            appointment.date_appointment +
            ' was canceled.',
        };

        await transporter.sendMail(
          mailOptions,
          await function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          },
        );
        return { message: 'Appointment canceled' };
      }
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async finishAppointment(finishAppointmentDto: FinishAppointmentDto) {
    try {
      if (!(await this.authPsycho(finishAppointmentDto.auth_token)))
        throw new UnauthorizedException();
      const appointment = await prisma.medical_appointment.findUnique({
        where: {
          id: finishAppointmentDto.appointment_id,
        },
      });
      if (!appointment) return { message: 'Appointment not found' };
      var decodedJwtAccessToken: any = this.jwtService.decode(
        finishAppointmentDto.auth_token,
      );
      var psycho_id: number = decodedJwtAccessToken.id;
      if (psycho_id != appointment.psycho_id) throw new UnauthorizedException();
      if (appointment.status_appointment === 'canceled')
        return { message: 'Appointment already canceled' };
      if (appointment.status_appointment === 'finished')
        return { message: 'Appointment already finished' };
      if (appointment.status_appointment === 'active') {
        if (new Date() <= new Date(appointment.date_appointment))
          return { message: 'the appointment has not been made yet' };
        const appointmentFinished = await prisma.medical_appointment.update({
          where: { id: finishAppointmentDto.appointment_id },
          data: {
            status_appointment: 'finished',
            psycho_diagnosis: finishAppointmentDto.psycho_diagnosis,
            psycho_treatment: finishAppointmentDto.psycho_treatment,
          },
        });
        return { message: 'Appointment finished' };
      }
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async putAppointmentRating(putAppointmentRatingDto: PutAppointmentRatingDto) {
    try {
      if (!(await this.authStudent(putAppointmentRatingDto.auth_token)))
        throw new UnauthorizedException();
      const appointment = await prisma.medical_appointment.findUnique({
        where: {
          id: putAppointmentRatingDto.appointment_id,
        },
      });
      if (!appointment) return { message: 'Appointment not found' };
      var decodedJwtAccessToken: any = this.jwtService.decode(
        putAppointmentRatingDto.auth_token,
      );
      var student_id: number = decodedJwtAccessToken.id;
      if (student_id != appointment.student_id)
        throw new UnauthorizedException();
      if (appointment.status_appointment != 'finished')
        return { message: 'Appointment must be finished for put a rating' };
      if (appointment.student_rating > 0)
        return { message: 'Appointment already rated' };
      const appointmentRated = await prisma.medical_appointment.update({
        where: { id: putAppointmentRatingDto.appointment_id },
        data: {
          student_rating: putAppointmentRatingDto.student_rating,
        },
      });
      const thisPsychoAppointments = await prisma.medical_appointment.findMany({
        where: {
          psycho_id: appointment.psycho_id,
          status_appointment: 'finished',
        },
      });
      var psychoRating: number = 0;
      thisPsychoAppointments.forEach((element) => {
        psychoRating = psychoRating + element.student_rating;
      });
      const psycho = await prisma.psychology.findUnique({
        where: { id: appointment.psycho_id },
      });
      psychoRating = psychoRating / (psycho.appointments_number + 1);
      await prisma.psychology.update({
        where: { id: appointment.psycho_id },
        data: {
          rating_average: psychoRating,
          appointments_number: psycho.appointments_number + 1,
        },
      });

      return { message: 'Appointment rated' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async authStudent(auth_token: string): Promise<boolean> {
    try {
      const decodedJwtAccessToken: any = this.jwtService.decode(auth_token);
      const now: any = new Date().getTime() / 1000;
      const search = await prisma.student.findMany({
        where: {
          id: decodedJwtAccessToken.id,
          nickname: decodedJwtAccessToken.nickname,
        },
      });
      if (
        !decodedJwtAccessToken ||
        !search[0] ||
        now > decodedJwtAccessToken.exp
      )
        return false;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async authPsycho(auth_token: string): Promise<boolean> {
    try {
      const decodedJwtAccessToken: any = this.jwtService.decode(auth_token);
      const now: any = new Date().getTime() / 1000;
      const search = await prisma.psychology.findMany({
        where: {
          id: decodedJwtAccessToken.id,
          nickname: decodedJwtAccessToken.nickname,
        },
      });
      if (
        !decodedJwtAccessToken ||
        !search[0] ||
        now > decodedJwtAccessToken.exp
      )
        return false;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async authSuperuser(auth_token: string): Promise<boolean> {
    try {
      const decodedJwtAccessToken: any = this.jwtService.decode(auth_token);
      const now: any = new Date().getTime() / 1000;
      const search = await prisma.superuser.findMany({
        where: {
          id: decodedJwtAccessToken.id,
          nickname: decodedJwtAccessToken.nickname,
        },
      });
      if (
        !decodedJwtAccessToken ||
        !search[0] ||
        now > decodedJwtAccessToken.exp
      )
        return false;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
