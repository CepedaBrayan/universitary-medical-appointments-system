import { PartialType } from '@nestjs/swagger';
import { CreateSuperuserDto } from './create-superuser.dto';

export class UpdateSuperuserDto extends PartialType(CreateSuperuserDto) {}
