export interface ApiResponse<T = any> {
    code: number;
    status: boolean;
    message: string;
    payload?: T;
}

export class ResponseHelper {
    static success<T>(payload: T, message = 'success'): ApiResponse<T> {
        return {
            status: true,
            code: 200,
            message,
            payload
        };
    }

    static error(message = 'error', code = 500): ApiResponse<null> {
        return {
            status: false,
            code: code,
            message
        };
    }

    static notFound(message = 'Data not found'): ApiResponse<null> {
        return this.error(message, 404);
    }

    static badRequest(message = 'Bad request'): ApiResponse<null> {
        return this.error(message, 400);
    }
}