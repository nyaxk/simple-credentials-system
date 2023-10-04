import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {PrismaService} from "./prisma.service";

@Injectable()
export class CredentialsService {
    constructor(private prisma: PrismaService) {
    }

    async create(data: any): Promise<any> {
        try {
            await this.prisma.credentials.create({
                data
            })
            return 'Credential created successfully !'
        } catch (e) {
            throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getAll(): Promise<any> {
        return this.prisma.credentials.findMany();
    }

    async edit(data: any, {id}): Promise<any> {
        try {
            await this.prisma.credentials.update({
                where: {
                    id: parseInt(id)
                },
                data
            })

            return 'Credential updated successfully !'
        } catch (e) {
            throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete({id}): Promise<string> {
        try {
            await this.prisma.credentials.delete({
                where: {
                    id: parseInt(id)
                }
            });

            return 'Deleted successfully !'
        } catch (e) {
            throw new HttpException(e?.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
