import { Module } from '@nestjs/common';
import { JobTypeController } from './job-type.controller';
import { JobTypeService } from './job-type.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [JobTypeController],
  providers: [JobTypeService]
})
export class JobTypeModule { }
