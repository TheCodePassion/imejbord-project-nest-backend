import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as path from 'path';
import * as multer from 'multer';

@Injectable()
export class FileUploadService {
  constructor() {}

  private readonly upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './uploads/');
      },
      filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    }),
  });

  async uploadFile(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      this.upload.single('file')(null, null, (err) => {
        if (err) {
          reject(new InternalServerErrorException('Error uploading file'));
        } else {
          resolve(path.join(__dirname, '..', 'uploads', file.filename));
        }
      });
    });
  }
}
