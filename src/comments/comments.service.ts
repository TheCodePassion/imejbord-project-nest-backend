import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { FileUploadService } from '../file-upload/file-upload.service';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneBy({ id });
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    return comment;
  }

  async create(comment: Comment, file: Express.Multer.File): Promise<Comment> {
    if (file) {
      const filePath = await this.fileUploadService.uploadFile(file);
      comment.attachmentPath = filePath;
    }

    return await this.commentRepository.save(comment);
  }

  async update(
    id: number,
    updatedComment: Comment,
    file: Express.Multer.File,
  ): Promise<Comment> {
    const existingComment = await this.findOne(id);
    if (file) {
      const filePath = await this.fileUploadService.uploadFile(file);
      updatedComment.attachmentPath = filePath;
    } else {
      updatedComment.attachmentPath = null;
    }

    await this.commentRepository.update(id, updatedComment);
    return await this.commentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const comment = await this.findOne(id);
    await this.commentRepository.delete(comment.id);
  }
}
