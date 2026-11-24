import type { RefreshSessionRepositoryContract } from "../domain/refresh-session/repository.js";
import type { Database } from "../prisma/db.js";

export function createRefreshSessionRepository(
	db: Database,
): RefreshSessionRepositoryContract {
	return {
		async create(data) {
			await db.orm.public.RefreshSession.create(data);
		},

		async getByHash(tokenHash) {
			return await db.orm.public.RefreshSession.where({ tokenHash }).first();
		},

		async update(oldHash, newHash, expiresAt) {
			const result = await db.orm.public.RefreshSession.where({
				tokenHash: oldHash,
			}).update({
				tokenHash: newHash,
				expiresAt,
			});

			return result ? true : false;
		},

		async delete(tokenHash) {
			console.log("adasdad", tokenHash);
			console.log(
				await db.orm.public.RefreshSession.where({ tokenHash }).delete(),
			);
		},
	};
}
