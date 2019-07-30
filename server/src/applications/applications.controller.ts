import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CreateApplicationDto, ListAllEntities, UpdateApplicationDto} from './dto';
import {ApplicationsService} from './applications.service';
import {Application} from './interfaces/application.interface';

@Controller('applications')
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) {
    }

    @Get(':id')
    findOne(@Param() params) {
        return {status: `This action returns a #${params.id} application`};
    }

    @Get()
    async findAll(@Query() query: ListAllEntities): Promise<Application[]> {
        return this.applicationsService.findAll();
    }

    @Post()
    async create(@Body() createApplicationDto: CreateApplicationDto) {
        this.applicationsService.create(createApplicationDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateApplicationDto: UpdateApplicationDto) {
        return `This action updates a #${id} application`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} application`;
    }
}
