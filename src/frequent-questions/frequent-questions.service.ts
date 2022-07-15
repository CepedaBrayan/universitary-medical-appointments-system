import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateFrequentQuestionDto } from './dto/create-frequent-question.dto';
import { AnswerFrequentQuestionDto } from './dto/answer-frequent-question.dto';
import { DeleteFrequentQuestionDto } from './dto/delete-frequent-question.dto';
import { PrismaClient, Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

const prisma = new PrismaClient();

@Injectable()
export class FrequentQuestionsService {
  constructor(private jwtService: JwtService) {}
  async create(createFrequentQuestionDto: CreateFrequentQuestionDto) {
    try {
      if (!(await this.authStudent(createFrequentQuestionDto.auth_token)))
        throw new UnauthorizedException();
      const freq_question = await prisma.frequent_questions.findMany({
        where: {
          question: createFrequentQuestionDto.question,
        },
      });
      if (freq_question.length > 0)
        return { message: 'Frequent question already exists' };
      else {
        if (createFrequentQuestionDto.anonymous) {
          var asker: string = 'Anonymous';
        } else {
          var decodedJwtAccessToken: any = this.jwtService.decode(
            createFrequentQuestionDto.auth_token,
          );
          var asker: string = decodedJwtAccessToken.nickname;
        }
        const newFreq_question = await prisma.frequent_questions.create({
          data: {
            question: createFrequentQuestionDto.question,
            asked_by: asker,
          },
        });
      }
      return { message: 'Frequent question created' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async createAnswer(answerFrequentQuestionDto: AnswerFrequentQuestionDto) {
    try {
      if (!(await this.authPsycho(answerFrequentQuestionDto.auth_token)))
        throw new UnauthorizedException();
      const verify_answer = await prisma.frequent_questions.findUnique({
        where: {
          id: answerFrequentQuestionDto.question_id,
        },
      });
      if (!verify_answer) return { message: 'Question not found' };
      if (verify_answer.answer) return { message: 'Answer already exists' };
      else {
        var decodedJwtAccessToken: any = this.jwtService.decode(
          answerFrequentQuestionDto.auth_token,
        );
        var answerer: string = decodedJwtAccessToken.nickname;
        const newAnswer = await prisma.frequent_questions.update({
          where: {
            id: answerFrequentQuestionDto.question_id,
          },
          data: {
            answer: answerFrequentQuestionDto.answer,
            answered_by: answerer,
          },
        });
        return { message: 'Frequent question answer created' };
      }
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async findAll() {
    try {
      const allQuestions = prisma.frequent_questions.findMany();
      if (allQuestions) return allQuestions;
      else return { message: 'No frequent questions found' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async findOne(id: number) {
    try {
      const foundQuestion = await prisma.frequent_questions.findUnique({
        where: {
          id: id,
        },
      });
      if (foundQuestion) {
        return foundQuestion;
      } else return { message: 'Question not found' };
    } catch (error) {
      return { message: 'Failed ' + error };
    }
  }

  async remove(deleteFrequentQuestionDto: DeleteFrequentQuestionDto) {
    try {
      if (!(await this.authPsycho(deleteFrequentQuestionDto.auth_token)))
        throw new UnauthorizedException();
      const verify_question = await prisma.frequent_questions.findUnique({
        where: {
          id: deleteFrequentQuestionDto.id,
        },
      });
      if (!verify_question) return { message: 'Question not found' };
      else {
        const deletedQuestion = await prisma.frequent_questions.delete({
          where: {
            id: deleteFrequentQuestionDto.id,
          },
        });
        return { message: 'Frequent question deleted' };
      }
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
}
