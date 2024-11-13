import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { GetChatDto } from './dto/get-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private chatRepository: Repository<Chat>,
  ) {}
  create(createChatDto: CreateChatDto) {
    const { content, receiverId, senderId } = createChatDto;
    console.log(createChatDto);
    const comment = this.chatRepository.create({
      content,
      receiver: {
        id: receiverId,
      },
      sender: {
        id: senderId,
      },
    });

    return this.chatRepository.save(comment);
  }

  async getChatMessages(getChatDto: GetChatDto): Promise<Chat[]> {
    const { senderId, receiverId } = getChatDto;

    return this.chatRepository.find({
      where: [
        {
          sender: {
            id: senderId,
          },
          receiver: {
            id: receiverId,
          },
        },
        {
          sender: {
            id: receiverId,
          },
          receiver: {
            id: senderId,
          },
        },
      ],
      relations: ['sender', 'receiver'],
      order: { timestamp: 'ASC' },
    });
  }

  findAll() {
    return `This action returns all chat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
