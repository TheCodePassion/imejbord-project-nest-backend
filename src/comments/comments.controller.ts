import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(+id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() comment: Comment,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Comment> {
    return this.commentsService.create(comment, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updatedComment: Comment,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Comment> {
    return this.commentsService.update(+id, updatedComment, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.commentsService.remove(+id);
  }
}
