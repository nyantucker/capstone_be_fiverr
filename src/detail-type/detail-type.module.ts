import { Module } from '@nestjs/common';
import { DetailTypeController } from './detail-type.controller';
import { DetailTypeService } from './detail-type.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [DetailTypeController],
  providers: [DetailTypeService]
})
export class DetailTypeModule { }
