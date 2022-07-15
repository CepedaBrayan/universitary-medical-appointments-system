import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FrequentQuestionsService } from './frequent-questions.service';
import { CreateFrequentQuestionDto } from './dto/create-frequent-question.dto';
import { AnswerFrequentQuestionDto } from './dto/answer-frequent-question.dto';
import { DeleteFrequentQuestionDto } from './dto/delete-frequent-question.dto';

@Controller('frequent-questions')
export class FrequentQuestionsController {
  constructor(
    private readonly frequentQuestionsService: FrequentQuestionsService,
  ) {}

  @Post()
  create(@Body() createFrequentQuestionDto: CreateFrequentQuestionDto) {
    return this.frequentQuestionsService.create(createFrequentQuestionDto);
  }

  @Post('/give-answer/')
  createAnswer(@Body() answerFrequentQuestionDto: AnswerFrequentQuestionDto) {
    return this.frequentQuestionsService.createAnswer(
      answerFrequentQuestionDto,
    );
  }

  @Get()
  findAll() {
    return this.frequentQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frequentQuestionsService.findOne(+id);
  }

  @Delete()
  remove(@Body() deleteFrequentQuestionDto: DeleteFrequentQuestionDto) {
    return this.frequentQuestionsService.remove(deleteFrequentQuestionDto);
  }
}
