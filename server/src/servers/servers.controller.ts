import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CreateServerDto, UpdateServerDto, ListAllEntities} from './dto';
import {ServersService} from './servers.service';
import {Server} from './interfaces/server.interface';

@Controller('servers')
export class ServersController {
    constructor(private readonly serversService: ServersService) {
    }

    @Get(':id')
    findOne(@Param() params): string {
        return `This action returns a #${params.id} server`;
    }

    @Get()
    async findAll(@Query() query: ListAllEntities): Promise<Server[]> {
        return this.serversService.findAll();
    }

    @Post()
    async create(@Body() createServerDto: CreateServerDto) {
        this.serversService.create(createServerDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
        return `This action updates a #${id} server`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} server`;
    }
}
