import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { FilesModule } from './files/files.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationModule } from './notification/notification.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { Comment } from './comment/entities/comment.entity';
import { Like } from './like/entities/like.entity';
import { MercadoModule } from './mercado/mercado.module';
import { Mercado } from './mercado/entities/mercado.entity';
import { FinanciamientoModule } from './financiamiento/financiamiento.module';
import { Financiamiento } from './financiamiento/entities/financiamiento.entity';
import { MarketingModule } from './marketing/marketing.module';
import { Marketing } from './marketing/entities/marketing.entity';
import { OrderHistoryModule } from './order_history/order_history.module';
import { OrderHistory } from './order_history/entities/order_history.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/product.entity';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entities/chat.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: true,
      extra: {
        ssl: true ? { rejectUnauthorized: false } : null,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        User,
        Post,
        Comment,
        Like,
        Mercado,
        Financiamiento,
        Marketing,
        OrderHistory,
        Product,
        Order,
        Chat,
      ],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    PostModule,
    FilesModule,
    CloudinaryModule,
    NotificationModule,
    CommentModule,
    LikeModule,
    MercadoModule,
    FinanciamientoModule,
    MarketingModule,
    OrderHistoryModule,
    ProductsModule,
    OrderModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
