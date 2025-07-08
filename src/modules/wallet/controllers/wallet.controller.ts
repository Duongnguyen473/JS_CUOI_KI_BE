import { Controller, Get, Param, Post } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { ReqUser } from '@/common/decorators/user.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Auth } from '@/common/decorators/auth.decorator';
import { RequestQuery } from '@/common/decorators/request-query.decorator';
import { QueryOption } from '@/common/pipe/query-option.interface';
import { PayosService } from '../services/payos.service';
import { or } from 'sequelize';
import { Public } from '@/common/decorators/public.decorator';

@Auth()
@Controller('wallet')
export class WalletController {
  constructor(
    private readonly walletService: WalletService,
    private readonly payOsService: PayosService,
  ) {}
  @ApiProperty({ description: 'Lấy số dư của owner' }) Í;
  @Get('balance/me')
  async getBalance(@ReqUser() user) {
    return this.walletService.getBalance(user.id);
  }
  @ApiProperty({ description: 'Lấy lịch sử giao dịch của owner' })
  @Get('transaction/me')
  async getWalletTransactions(
    @ReqUser() user,
    @RequestQuery() query: QueryOption,
  ) {
    return this.walletService.getWalletTransactions(user.id, query);
  }
  @ApiProperty({ description: 'Lấy thông tin thanh toán nạp ví' })
  @Get('deposit')
  async getPayosStatus(
    @ReqUser() user,
    // @Param('transactionId') transactionId: string,
  ) {
    return this.walletService.getDepositInfo(user.id);
  }
  @ApiProperty({ description: 'Xác nhận thanh toán nạp ví' })
  @Post('deposit/verify')
  async verifyDeposit(@ReqUser() user) {
    return this.walletService.verifyDeposit(user.id);
  }
  @ApiProperty({ description: 'Huỷ thanh toán nạp ví' })
  @Post('deposit/cancel')
  async cancelDeposit(@ReqUser() user) {
    return this.walletService.cancelDeposit(user.id);
  }
  // NOTE: Sau cùng
  @ApiProperty({ description: 'Tạo thanh toán nạp ví' })
  @Post('deposit/:packageId')
  async deposit(@ReqUser() user, @Param('packageId') packageId: number) {
    return this.walletService.deposit(user.id, packageId);
  }
}
