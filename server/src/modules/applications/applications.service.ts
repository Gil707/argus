import {CacheInterceptor, Injectable, UseInterceptors} from '@nestjs/common';
import {Application} from './interfaces/application.interface';

@Injectable()
@UseInterceptors(CacheInterceptor)
export class ApplicationsService {
    private readonly applications: Application[] = [];

    create(application: Application) {
        this.applications.push(application);
    }

    findAll(): Application[] {
        return this.applications;
    }
}
