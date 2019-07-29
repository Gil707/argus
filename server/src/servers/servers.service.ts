import { Injectable } from '@nestjs/common';
import { Server } from './interfaces/server.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateServerDto } from './dto';

@Injectable()
export class ServersService {
    constructor(@InjectModel('Server') private readonly serverModel: Model<Server>) {}

    async create(createServerDto: CreateServerDto): Promise<Server> {
        const createdServer = new this.serverModel(createServerDto);
        return await createdServer.save();
    }

    async findAll(): Promise<Server[]> {
        return await this.serverModel.find().exec();
    }
}
