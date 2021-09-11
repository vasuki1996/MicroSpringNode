import { Share } from "../entity/Share";
import { getDatabseConnection } from "../repository";

export const getAllShares = async () => {
    const connection = await getDatabseConnection();
    const shareRepository = connection.getRepository(Share);
    const shares = await shareRepository.find();
    await connection.close();
    return shares
}

export const createShare = async (body: any) => {
    const connection = await getDatabseConnection();
    const shareRepository = connection.getRepository(Share);
    const share = await shareRepository.create(body);
	const results = await shareRepository.save(share);
    await connection.close();
	return results;
}