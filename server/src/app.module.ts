import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {ServersModule} from './modules/servers/servers.module';
import {ApplicationsModule} from './modules/applications/applications.module';

@Module({
    imports: [
        ServersModule,
        ApplicationsModule,
        MongooseModule.forRoot('mongodb+srv://testuser:qwerty123@cluster0-aovtq.mongodb.net/test?retryWrites=true&w=majority')
    ]
})
export class AppModule {}
