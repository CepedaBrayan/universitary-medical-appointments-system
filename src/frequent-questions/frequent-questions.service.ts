import { Injectable } from '@nestjs/common';
import { CreateFrequentQuestionDto } from './dto/create-frequent-question.dto';
import { AnswerFrequentQuestionDto } from './dto/answer-frequent-question.dto';
import { UpdateFrequentQuestionDto } from './dto/update-frequent-question.dto';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class FrequentQuestionsService {
  async create(createFrequentQuestionDto: CreateFrequentQuestionDto) {
    try {
      
      const freq_question = await prisma.frequent_questions.findMany({
        where: {
          question: createFrequentQuestionDto.question,
        },  
      });
      if (freq_question.length > 0) return { message: 'Frequent question already exists' };
      else {
        if(createFrequentQuestionDto.anonymous) var asker: string = 'Anonymous';
        else var asker: string = 'Student'; // From jwt find student username and put in asker var
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
      const verify_answer = await prisma.frequent_questions.findUnique({
        where: {
          id: answerFrequentQuestionDto.question_id,
        },
      });
      if (!verify_answer) return { message: 'Question not found' };
      if (verify_answer.answer) return { message: 'Answer already exists' };
      else {
        var answerer: string = 'Psycho'; // From jwt find psycho username and put in answerer var
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

  update(id: number, updateFrequentQuestionDto: UpdateFrequentQuestionDto) {
    return `This action updates a #${id} frequentQuestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} frequentQuestion`;
  }
}
