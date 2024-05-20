import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UsersModule } from './resources/users/users.module';
import { TodosModule } from './resources/todos/todos.module';
import { User } from './resources/users/entities/user.entity';
import { Todo } from './resources/todos/entities/todo.entity';
import { ProjectsModule } from './resources/projects/projects.module';
import { Project } from './resources/projects/entities/project.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [User, Project, Todo],
      synchronize: true,
    }),
    UsersModule,
    ProjectsModule,
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
