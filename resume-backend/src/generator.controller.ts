/*
https://docs.nestjs.com/controllers#controllers
*/

import { BadRequestException, Controller, Post, Query, Res, StreamableFile } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import type { Response } from 'express';
import { ResumeDetailsDTO } from '../shared/models/resume-details.dto';
import { promises as fs } from "fs";
import { PDFAnnotatorService } from '../shared/services/annotate-pdf.service';
import { PDFDocument } from 'pdf-lib';

@Controller('file')
export class GeneratorController {
    constructor(
        private pdfAnnotatorService: PDFAnnotatorService
    ) { }

    @Post('generate-resume/:contactNumber/:email') // Use @ApiParam for path parameters
    @ApiOperation({
        summary: 'Generate a Resume',
        description: 'Generate resume',
    })
    async generateSignedSamples(
        @Query() resumeDetailsDTO: ResumeDetailsDTO,
        @Res({ passthrough: true }) res: Response
    ): Promise<any> {
        try {
            const templateNum = 1
            console.log("Current directory:", __dirname);

            // console.log(sampleDataConfig);
            let pdfInputPath = `../shared/pdf/resume-template.pdf`;
            const test = await fs.access(pdfInputPath);
            console.log('test,', test)
            const existingPdfBytes = await fs.readFile(pdfInputPath);

            // Check if the file exists
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const generateFilePath = await this.pdfAnnotatorService.annotateForm(pdfDoc, 1, resumeDetailsDTO)
            const file = createReadStream(generateFilePath.fullFilePath)

            res.set({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${generateFilePath.fileName}`,
            });
            return new StreamableFile(file);
        }
        catch (error) {
            console.error("Error modifying and saving PDFs:", error);
            throw new BadRequestException();
        }
    }
}
