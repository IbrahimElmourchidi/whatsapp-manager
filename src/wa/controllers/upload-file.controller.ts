import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
const path = require('path');
import { v4 as uuid4 } from 'uuid';
import { FileTypeEnum } from '../model/interfaces/FileTypeEnum';

@Controller()
export class UploadFileController {
  constructor() {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, cb) => {
          console.log(file.originalname);
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuid4();
          const extension: string = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { filePath: file.filename };
  }

  @Get('file/:fileName')
  showFile(@Param('fileName') file, @Res() res) {
    return res.sendfile(join(process.cwd(), 'files/' + file));
  }
}
