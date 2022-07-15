import { ApiProperty } from '@nestjs/swagger';
import { IntersectionType, OmitType } from '@nestjs/swagger';
import { CreateStudentDto } from './create-student.dto';

export class AdditionalAuthToken {
  @ApiProperty({ type: String, description: 'nickname' })
  auth_token: string;
}

export class UpdateStudentDto extends IntersectionType(
  CreateStudentDto,
  AdditionalAuthToken,
) {}
