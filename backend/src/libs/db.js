// /* This code snippet is setting up a database connection using Prisma Client in a Node.js environment.*/

import {PrismaClient} from "../generated/prisma/index.js";

const globalForPrisma = globalThis;

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// import { neon } from '@neondatabase/serverless';
// import { PrismaNeonHTTP } from '@prisma/adapter-neon';
// // import { PrismaClient } from '../generated/prisma/index.js';
// import { PrismaClient } from '@prisma/client';

// const sql = neon(process.env.DATABASE_URL);
// const adapter = new PrismaNeonHTTP(sql);

// const globalForPrisma = globalThis;
// export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
