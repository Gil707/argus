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
        const saved = await createdServer.save();
        return saved._id;
    }

    async findAll(): Promise<Server[]> {
        return await this.serverModel.find().exec();
    }

    async remove(id): Promise<Server> {
        return await this.serverModel.findOneAndDelete(id);
    }
}
