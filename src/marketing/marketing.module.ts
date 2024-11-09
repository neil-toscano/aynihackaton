import { Module } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { MarketingController } from './marketing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marketing } from './entities/marketing.entity';

@Module({
  controllers: [MarketingController],
  providers: [MarketingService],
  imports: [TypeOrmModule.forFeature([Marketing])],
})
export class MarketingModule {}
