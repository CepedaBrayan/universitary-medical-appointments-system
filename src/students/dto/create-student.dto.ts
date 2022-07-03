import {
  ApiCreatedResponse,
  ApiResponse,
  ApiOkResponse,
  ApiProperty,
} from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({ type: String, description: 'nickname' })
  nickname: string;
  @ApiProperty({ type: String, description: 'name' })
  name: string;
  @ApiProperty({ type: String, description: 'password' })
  password: string;
  @ApiProperty({ type: String, description: 'email' })
  email: string;
  @ApiProperty({ type: String, description: 'phone' })
  phone: string;
  @ApiProperty({ type: String, description: 'city' })
  city: string;
  @ApiProperty({ type: String, description: 'code_student' })
  code_student: string;
  @ApiProperty({ type: Number, description: 'academic_program' })
  academic_program: number;
  @ApiProperty({ type: Number, description: 'semester' })
  semester: number;
}
