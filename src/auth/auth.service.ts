import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SocialLoginDto } from './dto/social-login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

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
      user = await this.userService.create(socialLoginDto);
    }

    const token = this.getJwtToken(user.id);

    return {
      token,
      user,
    };
  }
  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private getJwtToken(userId: string) {
    const token = this.jwtService.sign({ id: userId });
    return token;
  }
}
