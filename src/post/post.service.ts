import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    const post = this.postRepository.create({
      ...createPostDto,
      user: user,
    });

    return this.postRepository.save(post);
  }

  async findAll() {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user') // Relación con el usuario que creó el post
      .leftJoinAndSelect('post.likes', 'like') // Relación con "likes"
      .loadRelationCountAndMap('post.likeCount', 'post.likes') // Contar los "likes"
      .leftJoinAndSelect('post.comments', 'comment') // Relación con "comments"
      .loadRelationCountAndMap('post.commentCount', 'post.comments') // Contar los "comments"
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
