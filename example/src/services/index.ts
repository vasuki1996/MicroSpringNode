import { Share } from "../entity/Share";
import {getRepository} from "../repository";
import {Repository} from "typeorm";

export const getAllShares = async () => {
    const shareRepository = <Repository<Share>> await getRepository(Share);
    const shares = await shareRepository.find();
    return shares
}

export const createShare = async (body: any) => {
    const shareRepository = <Repository<Share>> await getRepository(Share);
    const share = shareRepository.create(body);
	const results = await shareRepository.save(share);
	return results;
}
