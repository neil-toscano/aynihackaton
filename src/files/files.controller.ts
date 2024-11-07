import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/filenamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post()
  @UseInterceptors(
    FileInterceptor('files', {
      fileFilter: fileFilter,
    }),
  )
  uploadImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No se proporcionó ningún archivo');
    }
    return this.filesService.uploadFile(file);
  }
}
