import {CacheModule, Module} from '@nestjs/common';
import {ApplicationsController} from './applications.controller';
import {ApplicationsService} from './applications.service';

@Module({
	imports: [CacheModule.register()],
    controllers: [ApplicationsController],
    providers: [ApplicationsService]
})
export class ApplicationsModule {
}
