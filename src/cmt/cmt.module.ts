import { Module } from '@nestjs/common';
import { CmtController } from './cmt.controller';
import { CmtService } from './cmt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [CmtController],
  providers: [CmtService]
})
export class CmtModule { }
