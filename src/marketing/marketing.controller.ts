import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { CreateMarketingDto } from './dto/create-marketing.dto';
import { UpdateMarketingDto } from './dto/update-marketing.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Post()
  @Auth()
  create(
    @Body() createMarketingDto: CreateMarketingDto,
    @GetUser() user: User,
  ) {
    return this.marketingService.create(createMarketingDto, user);
  }

  @Get()
  findAll() {
    return this.marketingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMarketingDto: UpdateMarketingDto,
  ) {
    return this.marketingService.update(+id, updateMarketingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketingService.remove(+id);
  }
}
