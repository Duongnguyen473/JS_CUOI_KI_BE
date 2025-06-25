import {
  Controller,
  Query,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Post,
  Body,
} from '@nestjs/common';
import { BidService } from '../services/bid.service';
import { Public } from '@/common/decorators/public.decorator';
import { ReqUser } from '@/common/decorators/user.decorator';
import { CreateBidDto } from '../dto/create-bid.dto';

@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}
  @Public()
  @Get('class/:id')
  async getBidsOfClass(@Param('id') classId: string) {
    return this.bidService.getBidsOfClass(classId);
  }
  @Post('class/:id')
  async createBid(
    @ReqUser() user,
    @Param('id') classId: string,
    @Body() createBidDto: CreateBidDto,
  ) {
    return this.bidService.createBid(user, classId, createBidDto);
  }
}
