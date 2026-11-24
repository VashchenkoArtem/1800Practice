import type { CategoryRepository } from "../domain/category/repository.js";
import type { Database } from "../prisma/db.js";

export function createCategoryRepository(
	database: Database,
): CategoryRepository {
	return {
		async getAll() {
			return database.orm.public.Category.orderBy((category) =>
				category.id.asc(),
			).all();
		},

		async getById(id) {
			return database.orm.public.Category.where({ id }).first();
		},

		async createCategory(data) {
			try {
				return await database.orm.public.Category.create(data);
			} catch (error) {
				if (
					error instanceof Error &&
					"sqlState" in error &&
					error.sqlState === "23505"
				) {
					throw new Error("CATEGORY_ALREADY_EXISTS");
				}
				throw error;
			}
		},
	};
}
