import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BidModel } from './models/bid.model';
import { BidController } from './controllers/bid.controller';
import { BidService } from './services/bid.service';
import { BidRepository } from './repositories/bid.repository';
import { ClassModule } from '../class/class.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([BidModel]), ClassModule, UsersModule],
  controllers: [BidController],
  providers: [BidService, BidRepository],
  exports: [BidService, BidRepository],
})
export class BidModule {}
