import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JobTypeModule } from './job-type/job-type.module';
import { DetailTypeModule } from './detail-type/detail-type.module';
import { JobsModule } from './jobs/jobs.module';
import { CmtModule } from './cmt/cmt.module';
import { HireModule } from './hire/hire.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({
    isGlobal: true
  }), UsersModule, JobTypeModule, DetailTypeModule, JobsModule, CmtModule, HireModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
