import { LogUtilService } from "./log-util.service";
import { Injectable } from "@nestjs/common";
import { promises as fs } from "fs";
import { PDFDocument } from "pdf-lib";


@Injectable()
export class CommonFolderService{
    constructor(
        private logger: LogUtilService
    ){
        this.logger.setContext(CommonFolderService.name)
    }

    async createFolderIfNotExists(folderPath) {
        try {
            await fs.mkdir(folderPath, { recursive: true });
            // console.log(`Folder "${folderPath}" created successfully (or already exists).`);
        } catch (error) {
            console.error(`Error creating folder "${folderPath}":`, error);
        }
    }

    async savingGeneratedFile(fileName:string, outputFolder: string, pdfDoc: PDFDocument){
        // Save the modified PDF with a different name
        console.log('saving,', fileName, outputFolder)
      const outputFileName = `${fileName}-.pdf`;
      await this.createFolderIfNotExists(outputFolder);
      // createFolderIfNotExists('./shared/compressed')
      const outputPath = `${outputFolder}/${outputFileName}`;

      const modifiedPdfBytes = await pdfDoc.save();
      
      await fs.writeFile(outputPath, modifiedPdfBytes);

      return {
        fileName: outputFileName,
        fullFilePath: outputPath
      }
      console.log(`Generated: ${outputFileName}`)
    }

}