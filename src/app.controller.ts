import { Controller, Get, Post, UseInterceptors, UploadedFiles, Param, Res, UploadedFile } from '@nestjs/common';
import {FileInterceptor, FilesInterceptor, AnyFilesInterceptor, FileFieldsInterceptor} from '@nestjs/platform-express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }

  @Post('upload/array')
  @UseInterceptors(FilesInterceptor('files'))
  uploadeFiles(@UploadedFiles() files){
    console.log(files);
  }

  @Post('upload/multiple')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))
  uploadMultipleFiles(@UploadedFiles() files) {
    console.log(files);
  }

  @Post('upload/anyfiles')
  @UseInterceptors(AnyFilesInterceptor())
  uploadAnyFiles(@UploadedFiles() files) {
    console.log(files);
  }

  @Get(':filepath')
  seeUploadedFile(@Param('filepath') file, @Res() res){
    return res.sendFile(file, {root: 'uploads'});
  }
  
}
