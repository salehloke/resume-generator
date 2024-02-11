import { GeneratorController } from './generator.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PDFAnnotatorService } from '../shared/services/annotate-pdf.service';
import { CommonFolderService } from '../shared/services/folder.service';
import { LogUtilService } from '../shared/services/log-util.service';

@Module({
  imports: [],
  controllers: [

    GeneratorController,
    AppController],
  providers: [AppService, PDFAnnotatorService, CommonFolderService, LogUtilService],
})
export class AppModule { }
