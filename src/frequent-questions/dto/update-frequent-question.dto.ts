import { PartialType } from '@nestjs/mapped-types';
import { CreateFrequentQuestionDto } from './create-frequent-question.dto';

export class UpdateFrequentQuestionDto extends PartialType(CreateFrequentQuestionDto) {}
