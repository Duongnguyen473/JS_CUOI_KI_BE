import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ReviewService } from '../services/review.service';
import { ReqUser } from '@/common/decorators/user.decorator';
import { CreateReviewDto } from '../dto/create-review.dto';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

   @ApiQuery({ name: 'studentId', required: false, type: String })
  @Get('class/:classId')
  async getReviewsOfClass(
    @Param('classId') classId: string,
    @Query('studentId') studentId?: string,
  ) {
    return this.reviewService.getReviewsOfClass(classId, studentId);
  }
  // Student create review
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
