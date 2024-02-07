import { Module } from '@nestjs/common';
import { HireController } from './hire.controller';
import { HireService } from './hire.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({})],
  controllers: [HireController],
  providers: [HireService]
})
export class HireModule { }
