import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectRepository } from '../repository/project.repository';
import { ProjectDTO } from './dto/project.dto';
import { ProjectMapper } from './mapper/project.mapper';

@Injectable()
export class ProjectService {
    constructor(@InjectRepository(ProjectRepository) private projectRepository: ProjectRepository) { }

    async save(projectDTO: ProjectDTO): Promise<any | undefined> {
        const newPoject = ProjectMapper.fromDTOtoEntity(projectDTO);
        let projectFind: ProjectDTO = await this.findByName(newPoject.name);
        if (projectFind) {
            return {
                status: HttpStatus.BAD_REQUEST,
                message: 'Project name already exist!',
            }
        }

        const projectCreated = await this.projectRepository.save(newPoject);

        return ProjectMapper.fromEntityToDTO(projectCreated);
    }

    async findAll(): Promise<ProjectDTO[] | undefined> {
        const result = await this.projectRepository.find({relations: ['projectCategory']});
        const projectsDTO: ProjectDTO[] = [];

        result.forEach((project) => projectsDTO.push(ProjectMapper.fromEntityToDTO(project)));

        return projectsDTO;
    }

    async findById(id: number): Promise<ProjectDTO | undefined> {
        const result = await this.projectRepository.findOne({
            relations: ['projectCategory'],
            where: {
                id: id,
            }    
        });

        return ProjectMapper.fromEntityToDTO(result);
    }

    async findByName(name: string): Promise<ProjectDTO | undefined> {
        const projectFind = await this.projectRepository.findOne({ name: name });

        return ProjectMapper.fromEntityToDTO(projectFind);
    }

}
