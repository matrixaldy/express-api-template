import { FindAndCountOptions, Model } from "sequelize";
import { db } from "../config/database";

export interface PaginationQuery {
    page: number;
    limit: number;
}

export interface PaginateResult<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}

export async function paginate<T>(
    model: any,
    paginationQuery: PaginationQuery = { page: 1, limit: 15 },
    where: any = {},
    orderBy: any = { createdAt: 'desc' }
    ): Promise<PaginateResult<T>> {
        const p = paginationQuery.page;
        const l = paginationQuery.limit;
        
    const [data, total] = await db.$transaction([
        model.findMany({
        skip: (paginationQuery.page - 1) * paginationQuery.limit,
        take: paginationQuery.limit,
        where,
        orderBy,
        }),
        model.count({ where }),
    ]);

    return {
        data,
        meta: {
            page: p,
            limit: l,
            total,
            totalPages: Math.ceil(total / paginationQuery.limit),
        },
    };
}
