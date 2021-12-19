import {
    Body,
    Controller,
    Logger,
    Post,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Get,
    Req,
    Put,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ProjectDTO } from '../../service/dto/project.dto';
import { ProjectService } from '../../service/project.service';


@Controller('api/project')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('project-resource')
export class ProjectController {
    logger = new Logger('ProjectController');

    constructor(private readonly projectService: ProjectService) {}

    @Post('/create-project')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Create project' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: ProjectDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async createProject(@Body() projectDTO: ProjectDTO): Promise<ProjectDTO> {
        const projectCreated = await this.projectService.save(projectDTO);

        return projectCreated;
    }

    @Get('/get-all')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Get the list of project' })
    @ApiResponse({
        status: 200,
        description: 'List all project',
        type: ProjectDTO,
    })
    async getAllProject(): Promise<ProjectDTO[]> {
        const projects =  await this.projectService.findAll();

        return projects;
    }

    @Get('/get-project-detail')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Get project detail by id'})
    @ApiResponse({
        status: 200,
        description: 'Project detail',
        type: ProjectDTO,
    })
    async getProjectDetail(@Req() req: Request): Promise<ProjectDTO | undefined> {
        const id = req.query.id;
        const project = await this.projectService.findById(id);

        return project
    }

    @Put('/update')
    @Roles(RoleType.USER)
    @ApiOperation({ title: 'Update project' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: ProjectDTO,
    })
    async updateProject(@Body() projectDTO: ProjectDTO): Promise<ProjectDTO | undefined> {
        const projectUpdated = await this.projectService.update(projectDTO);
        
        return projectUpdated;
    }

}