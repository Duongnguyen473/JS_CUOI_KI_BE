import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Bid } from '../entities/bid.entity';
import { BidRepository } from '../repositories/bid.repository';
import { CreateBidDto } from '../dto/create-bid.dto';
import { UpdateBidDto } from '../dto/update-bid.dto';
import { AuthUser } from '@/common/interfaces/auth-user.interface';

@Injectable()
export class BidService extends BaseService<Bid> {
  constructor(private readonly bidRepository: BidRepository) {
    super(bidRepository);
  }
  
  async getBidsOfClass(classId: string): Promise<Bid[]> {
    return this.bidRepository.getMany({ where: { class_id: classId } });
  }
  
  async createBid(user: AuthUser, classId: string, createBidDto: CreateBidDto): Promise<Bid> {
    const bidData = {
      ...createBidDto,
      class_id: classId,
      student_id: user.id,
    };
    return this.bidRepository.create(bidData);
  }
  async updateBid(user: AuthUser, id: string, updateBidDto: UpdateBidDto): Promise<Bid> {
    return this.bidRepository.updateOne(updateBidDto, { where: { _id: id, student_id: user.id } });
  }
  async deleteBid(user: AuthUser, id: string): Promise<Bid> {
    return this.bidRepository.deleteOne({ where: { _id: id, student_id: user.id } });
  }
  

}
