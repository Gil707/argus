export interface Application {
    name: string;
    serverId: string;
    type: string;
    description: string;
    platform: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}
