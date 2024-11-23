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
import { Not, Repository } from 'typeorm';
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

  async findAll(id: string) {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin(
        'user.sentMessages', // Los mensajes enviados por el usuario
        'message',
        'message.receiverId = :id AND message.senderId = user.id AND message.isRead = false' // Mensajes no leídos enviados al receptor (id)
      )
      .addSelect('COUNT(message.id)', 'unreadMessageCount') // Cuenta los mensajes no leídos enviados al receptor
      .addSelect('MAX(message.timestamp)', 'mostRecentMessage') // Obtiene el mensaje más reciente
      .where('user.id != :id', { id }) // Excluye al usuario receptor
      .groupBy('user.id') // Agrupa por usuario emisor
      .orderBy('MAX(message.timestamp)', 'ASC') // Ordena por la fecha del mensaje más reciente
      .getRawAndEntities();
  
    // Combina las entidades con los datos crudos
    const result = users.entities.map((user, index) => {
      const unreadMessages = parseInt(users.raw[index].unreadMessageCount, 10) || 0; // Cuenta los mensajes no leídos
      return {
        ...user,
        unreadMessageCount: unreadMessages,
      };
    });
  
    console.log(result, 'user');
    return result;
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
