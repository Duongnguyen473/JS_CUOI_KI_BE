import {
  Controller,
  Query,
  HttpCode,
  HttpStatus,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BidService } from '../services/bid.service';
import { Public } from '@/common/decorators/public.decorator';
import { ReqUser } from '@/common/decorators/user.decorator';
import { CreateBidDto } from '../dto/create-bid.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateBidDto } from '../dto/update-bid.dto';
import { Auth } from '@/common/decorators/auth.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRoles } from '@/modules/user/common/constant';

@Auth()
@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}
  // Get bid of class
  @ApiProperty()
  @Public()
  @Get('class/:classId')
  async getBidsOfClass(@Param('classId') classId: string) {
    return this.bidService.getBidsOfClass(classId);
  }
  // Get bid by id
  @ApiProperty()
  @Get(':bidId')
  async getBidById(@Param('bidId') bidId: string) {
    return this.bidService.getById(bidId);
  }
  // Create bid of class
  @Roles(UserRoles.STUDENT)
  @Post('class/:classId')
  async createBid(
    @ReqUser() user,
    @Param('id') classId: string,
    @Body() createBidDto: CreateBidDto,
  ) {
    return this.bidService.createBid(user, classId, createBidDto);
  }
  // Edit bid
  @Put(':bidId')
  async updateBid(
    @ReqUser() user,
    @Param('bidId') bidId: string,
    @Body() updateBidDto: UpdateBidDto,
  ) {
    return this.bidService.updateBid(user, bidId, updateBidDto);
  }

  @Delete(':bidId')
  async deleteBid(@ReqUser() user, @Param('bidId') bidId: string) {
    return this.bidService.deleteBid(user, bidId);
  }
  // Tutor handle
  // tutor select student
  @Post(':bidId/tutor/select')
  async tutorSelectBidStudent(@ReqUser() user, @Param('bidId') bidId: string) {
    return this.bidService.tutorSelectBidStudent(user.id, bidId);
  }
  // Tutor reject student
  @Post(':bidId/tutor/reject')
  async tutorRejectBidStudent(@ReqUser() user, @Param('bidId') bidId: string) {
    return this.bidService.tutorRejectBidStudent(user.id, bidId);
  }
}
