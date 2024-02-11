import { ApiProperty } from "@nestjs/swagger";

export class ResumeDetailsDTO {
    @ApiProperty({
        name: 'contactNumber',
        type: 'string',
        required: false,
        default: '000-000000'
        })
        contactNumber: string

    @ApiProperty({
        name: 'email',
        type: 'string',
        required: false,
        default: 'test'
        })
        email: string

    @ApiProperty({
        name: 'homeAddress',
        type: 'string',
        required: false,
        default: 'home'
        })
        homeAddress: string
}