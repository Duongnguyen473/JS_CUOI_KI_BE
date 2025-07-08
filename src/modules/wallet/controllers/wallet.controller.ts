import { Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { ReqUser } from '@/common/decorators/user.decorator';
import { ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Auth } from '@/common/decorators/auth.decorator';
import { RequestQuery } from '@/common/decorators/request-query.decorator';
import { QueryOption } from '@/common/pipe/query-option.interface';
import { PayosService } from '../services/payos.service';

@Auth()
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @ApiOperation({ summary: 'Lấy số sư của tôi' })
  @ApiProperty({ description: 'Lấy số dư của owner' })
  @Get('balance/me')
  async getBalance(@ReqUser() user) {
    return this.walletService.getBalance(user.id);
  }
  @ApiOperation({ summary: 'Lấy lịch sử giao dịch của tôi' })
  @ApiProperty({ description: 'Lấy lịch sử giao dịch của owner' })
  @Get('transaction/me')
  async getWalletTransactions(
    @ReqUser() user,
    @RequestQuery() query: QueryOption,
  ) {
    return this.walletService.getWalletTransactions(user.id, query);
  }
  @ApiOperation({ summary: 'Lấy thông tin thanh toán của tôi' })
  @ApiProperty({ description: 'Lấy thông tin thanh toán nạp ví' })
  @Get('deposit')
  async getPayosStatus(@ReqUser() user) {
    return this.walletService.getDepositInfo(user.id);
  }
  @ApiOperation({ summary: 'Xác nhận thanh toán nạp  ví' })
  @ApiProperty({ description: 'Xác nhận thanh toán nạp ví' })
  @Post('deposit/verify')
  async verifyDeposit(@ReqUser() user) {
    return this.walletService.verifyDeposit(user.id);
  }
  @ApiOperation({ summary: 'Huỷ thanh toán nạp ví' })
  @ApiProperty({ description: 'Huỷ thanh toán nạp ví' })
  @Post('deposit/cancel')
  async cancelDeposit(@ReqUser() user) {
    return this.walletService.cancelDeposit(user.id);
  }
  // NOTE: Sau cùng
  @ApiOperation({ summary: 'Tạo thanh toán nạp ví' })
  @ApiProperty({ description: 'Tạo thanh toán nạp ví' })
  @Post('deposit/:packageId')
  async deposit(@ReqUser() user, @Param('packageId') packageId: number) {
    return this.walletService.deposit(user.id, packageId);
  }
}
