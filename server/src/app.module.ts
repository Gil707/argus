import {Module} from '@nestjs/common';
import {ServersModule} from './servers/servers.module';
import {ApplicationsModule} from './applications/applications.module';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    imports: [
        ServersModule,
        ApplicationsModule,
        MongooseModule.forRoot('mongodb+srv://root:qwerty123@cluster0-aovtq.mongodb.net/test?retryWrites=true&w=majority')
    ]
})
export class AppModule {
}
