import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FrequentQuestionsService } from './frequent-questions.service';
import { CreateFrequentQuestionDto } from './dto/create-frequent-question.dto';
import { AnswerFrequentQuestionDto } from './dto/answer-frequent-question.dto';
import { UpdateFrequentQuestionDto } from './dto/update-frequent-question.dto';

@Controller('frequent-questions')
export class FrequentQuestionsController {
  constructor(private readonly frequentQuestionsService: FrequentQuestionsService) {}

  @Post()
  create(@Body() createFrequentQuestionDto: CreateFrequentQuestionDto) {
    return this.frequentQuestionsService.create(createFrequentQuestionDto);
  }

  @Post("/give-answer/")
  createAnswer(@Body() answerFrequentQuestionDto: AnswerFrequentQuestionDto) {
    return this.frequentQuestionsService.createAnswer(answerFrequentQuestionDto);
  }

  @Get()
  findAll() {
    return this.frequentQuestionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.frequentQuestionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFrequentQuestionDto: UpdateFrequentQuestionDto) {
    return this.frequentQuestionsService.update(+id, updateFrequentQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.frequentQuestionsService.remove(+id);
  }
}
