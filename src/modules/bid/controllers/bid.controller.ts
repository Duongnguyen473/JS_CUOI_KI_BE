import {
  Controller,
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
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { UpdateBidDto } from '../dto/update-bid.dto';
import { Auth } from '@/common/decorators/auth.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRoles } from '@/modules/user/common/constant';

@Auth()
@Controller('bid')
export class BidController {
  constructor(private readonly bidService: BidService) {}
  // Get bid of class
  @ApiOperation({ summary: 'Lấy tất các chào giá của lớp học' })
  @Public()
  @Get('class/:classId')
  async getBidsOfClass(@Param('classId') classId: string) {
    return this.bidService.getBidsOfClass(classId);
  }

  // Create bid of class
  @ApiOperation({ summary: 'Học viên chào giá lớp học' })
  @Roles(UserRoles.STUDENT)
  @Post('class/:classId')
  async createBid(
    @ReqUser() user,
    @Param('classId') classId: string,
    @Body() createBidDto: CreateBidDto,
  ) {
    return this.bidService.createBid(user, classId, createBidDto);
  }
  // Get bid by id
  @ApiOperation({ summary: 'Lấy thông tin chào giá theo id' })
  @Get(':bidId')
  async getBidById(@Param('bidId') bidId: string) {
    return this.bidService.getById(bidId);
  }
  // Edit bid
  @ApiOperation({ summary: 'Học viên cập nhật chào giá lớp học' })
  @Put(':bidId')
  async updateBid(
    @ReqUser() user,
    @Param('bidId') bidId: string,
    @Body() updateBidDto: UpdateBidDto,
  ) {
    return this.bidService.updateBid(user, bidId, updateBidDto);
  }

  @ApiOperation({ summary: 'Học viên xoá chào giá lớp học' })
  @Delete(':bidId')
  async deleteBid(@ReqUser() user, @Param('bidId') bidId: string) {
    return this.bidService.deleteBid(user, bidId);
  }
  // Tutor handle
  // tutor select student
  @ApiOperation({ summary: 'Gia sư chọn học viên chào giá' })
  @Roles(UserRoles.TUTOR)
  @Post(':bidId/tutor/select')
  async tutorSelectBidStudent(@ReqUser() user, @Param('bidId') bidId: string) {
    return this.bidService.tutorSelectBidStudent(user.id, bidId);
  }
  // Tutor reject student
  @ApiOperation({ summary: 'Gia sư từ chối học viên chào giá' })
  @Roles(UserRoles.TUTOR)
  @Post(':bidId/tutor/reject')
  async tutorRejectBidStudent(@ReqUser() user, @Param('bidId') bidId: string) {
    return this.bidService.tutorRejectBidStudent(user.id, bidId);
  }
}
