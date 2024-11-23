import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './entities/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }

  @Get()
  @Auth()
  findAll(@GetUser() user: User) {
    return this.userService.findAll(user.id);
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch()
  @Auth()
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
