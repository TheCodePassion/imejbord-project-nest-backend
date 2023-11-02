import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { FileUploadService } from '../file-upload/file-upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([FileUploadService]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, FileUploadService],
})
export class CommentsModule {}
