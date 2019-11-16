import {CacheModule, Module} from '@nestjs/common';
import {ServersController} from './servers.controller';
import {ServersService} from './servers.service';
import {MongooseModule} from '@nestjs/mongoose';
import {ServerSchema} from './schemas/server.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'Server', schema: ServerSchema}]),
        CacheModule.register()
    ],
    controllers: [ServersController],
    providers: [ServersService]
})

export class ServersModule {
}
