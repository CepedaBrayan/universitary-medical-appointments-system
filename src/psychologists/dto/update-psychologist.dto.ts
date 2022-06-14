import { PartialType } from '@nestjs/mapped-types';
import { CreatePsychologistDto } from './create-psychologist.dto';

export class UpdatePsychologistDto extends PartialType(CreatePsychologistDto) {}
