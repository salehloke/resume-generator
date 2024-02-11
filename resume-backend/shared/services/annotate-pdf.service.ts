import { LogUtilService } from "./log-util.service";
import { Injectable } from "@nestjs/common";
import { promises as fs } from "fs";
import { PDFDocument } from "pdf-lib";
import { ResumeDetailsDTO } from "../models/resume-details.dto";
import { CommonFolderService } from "./folder.service";


@Injectable()
export class PDFAnnotatorService {
    constructor(
        private logger: LogUtilService,
        private commonFolderService: CommonFolderService
    ) {
        this.logger.setContext(PDFAnnotatorService.name)
    }

    async annotateForm(pdfDoc: PDFDocument,templateNum: number, resumeDetailsDTO: ResumeDetailsDTO) {
        try {
            // let pdfInputPath = `./resume-template-1.pdf`;
            console.log('accessing file')
            // let pdfInputPath = `../pdf/resume-template-${templateNum}.pdf`;
            // const test = await fs.access(pdfInputPath);
            // console.log('test,',test)
            // const existingPdfBytes = await fs.readFile(pdfInputPath);

            // Check if the file exists
            // const pdfDoc = await PDFDocument.load(existingPdfBytes);

            const form = pdfDoc.getForm();
            const email = form.getTextField("email");
            const contactNumber = form.getTextField("contactNumber");

            email.setText('test')
            contactNumber.setText('test2')
            const {fullFilePath, fileName} = await this.commonFolderService.savingGeneratedFile(
                'generated-1',
                '../pdf/output/',
                pdfDoc
            )

            return {fullFilePath, fileName}

        } catch (error) {
            console.error("Error modifying and saving PDFs:", error);

        }
    }

}