import {Controller, Get, Post, Body, Delete, Put, Param} from '@nestjs/common';
import {CredentialsService} from "../services/credentials.service";

@Controller('credentials')
export class CredentialsController {
    constructor(private readonly appService: CredentialsService) {
    }

    @Get()
    getAll(): Promise<any> {
        return this.appService.getAll();
    }

    @Post()
    create(@Body() data): Promise<any> {
        return this.appService.create(data);
    }

    @Delete(':id')
    delete(@Param() query): Promise<string> {
        return this.appService.delete(query);
    }

    @Put(':id')
    edit(@Body() data, @Param() param): Promise<string> {
        return this.appService.edit(data, param);
    }
}
