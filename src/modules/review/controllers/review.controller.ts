import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { ReqUser } from '@/common/decorators/user.decorator';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ApiOperation, ApiProperty, ApiQuery } from '@nestjs/swagger';
import { Auth } from '@/common/decorators/auth.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRoles } from '@/modules/user/common/constant';

@Auth()
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @ApiOperation({ summary: 'Lấy tất cả đánh giá của lớp học' })
  @ApiQuery({ name: 'studentId', required: false, type: String })
  @Public()
  @Get('class/:classId')
  async getReviewsOfClass(
    @Param('classId') classId: string,
    @Query('studentId') studentId?: string,
  ) {
    return this.reviewService.getReviewsOfClass(classId, studentId);
  }
  // Student create review
  @ApiOperation({ summary: 'Học viên tạo đánh giá cho lớp học' })
  @Roles(UserRoles.STUDENT)
  @Post('class/:classId')
  async studentCreateReviewClass(
    @ReqUser() user,
    @Param('classId') classId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewService.studentCreateReviewClass(
      user,
      classId,
      createReviewDto,
    );
  }
}
