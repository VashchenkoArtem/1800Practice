import 'dotenv/config';
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d';
import { contractFromJson } from "@prisma/orm-postgres/static";
import contractJson from './contract.json' with { type: 'json' };

export const contract = contractFromJson<Contract>(contractJson);

export const db = postgres({
    contract,
    url: process.env["DATABASE_URL"]!,
});