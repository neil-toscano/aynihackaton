import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: bcrypt.hashSync(createUserDto.password, 10),
      });
      const user = await this.userRepository.save(newUser);

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginDto: LoginDto) {
    const { password, email } = loginDto;
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      select: {
        email: true,
        password: true,
        id: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('email/password incorrect');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('email/password incorrect');
    return this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `${email} not found`,
      });
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    console.log(error);
    throw new InternalServerErrorException('please check server logs');
  }

  findAll() {
    return this.userRepository.find({});
  }

  async findOne(id: string) {
    return await this.userRepository.findOneBy({
      id: id,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
