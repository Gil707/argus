import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {CreateServerDto, UpdateServerDto, ListAllEntities} from './dto';
import {ServersService} from './servers.service';
import {Server} from './interfaces/server.interface';

/* tslint:disable */
const ping = require('ping');
/* tslint:enable */

@Controller('servers')
export class ServersController {
    constructor(private readonly serversService: ServersService) {
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return {status: `This action updates a #${id} server`};
    }

    @Get()
    async findAll(@Query() query: ListAllEntities): Promise<Server[]> {
        return this.serversService.findAll();
    }

    @Get('/check/:ip')
    async check(@Param() params) {
        return await ping.promise.probe(params.ip);
    }

    @Post()
    async create(@Body() createServerDto: CreateServerDto) {
        try {
            return await this.serversService.create(createServerDto);
        } catch (e) {
            return e;
        }
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
        return `This action updates a #${id} server`;
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.serversService.remove(id);
    }
}
