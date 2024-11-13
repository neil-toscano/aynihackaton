import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async socialLogin(socialLoginDto: SocialLoginDto) {
    const { email } = socialLoginDto;

    let user = await this.userService.findOneByEmail(email);
    if (!user) {
      user = await this.userService.create({
        ...socialLoginDto,
        password: 'p',
      });
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.login(loginDto);
    return {
      ...user,
      token: this.getJwtToken(user.id),
    };
  }

  async checkStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken(user.id),
    };
  }

  create(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private getJwtToken(userId: string) {
    const token = this.jwtService.sign({ id: userId });
    return token;
  }
}
