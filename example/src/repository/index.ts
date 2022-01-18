import { getRepositoryForDefaultDatabase } from "microspringnode/components/persistance";
import {EntityTarget, Repository} from "typeorm";

export const getRepository = async (entity: EntityTarget<any>): Promise<Repository<any>> => {
    const repository: Repository<any> = await getRepositoryForDefaultDatabase(entity);
    return repository;
}
