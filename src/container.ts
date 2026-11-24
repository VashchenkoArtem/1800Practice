import type { Config } from "./config";
import { createTokenHasher } from "./lib/jwt";
import { createPasswordHasher } from "./lib/password";
import { createDb } from "./prisma/db";
import { createCategoryRepository } from "./repositories/category";
import { createProductRepository } from "./repositories/product";
import { createRefreshSessionRepository } from "./repositories/refresh-session";
import { createUserRepository } from "./repositories/user";
import { createCategoryService } from "./services/category/category";
import { createProductService } from "./services/products/product";
import { createUserService } from "./services/user/user";
import { createCategoryHandlers } from "./transport/handlers/category/category";
import { createProductHandler } from "./transport/handlers/product/product";
import { createUserHandler } from "./transport/handlers/user/user";
import { createRequireAuth } from "./transport/middlewares/require-auth";
import { createCategoryRouter } from "./transport/routers/category";
import { createProductRouter } from "./transport/routers/product";
import { createUserRouter } from "./transport/routers/user";

export function createContainer(config: Config) {
	const db = createDb(config.databaseUrl);

	const userRepository = createUserRepository(db);
	const refreshSessionRepository = createRefreshSessionRepository(db);

	const passwordHasher = createPasswordHasher(config.passwordPepper);
	const tokenHasher = createTokenHasher(
		config.jwtAccessSecret,
		config.jwtRefreshSecret,
	);

	const userService = createUserService({
		repository: userRepository,
		refreshSessionRepository,
		passwordHasher,
		tokenHasher,
	});
	const requireAuth = createRequireAuth(tokenHasher.verifyAccessToken);

	const userRouter = createUserRouter(
		createUserHandler(userService),
		requireAuth,
	);
	const productRouter = createProductRouter(
		createProductHandler(createProductService(createProductRepository(db))),
	);
	const categoryRouter = createCategoryRouter(
		createCategoryHandlers(createCategoryService(createCategoryRepository(db))),
	);
	return {
		routers: {
			userRouter,
			productRouter,
			categoryRouter,
		},
	};
}
