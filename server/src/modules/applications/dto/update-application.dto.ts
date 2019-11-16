export class UpdateApplicationDto {
    readonly name: string;
    readonly serverId: string;
    readonly type: string;
    readonly description: string;
    readonly platform: string;
    readonly available: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
