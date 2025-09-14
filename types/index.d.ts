export interface User {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    subscription: string;
}

export interface File {
    _id: string;
    filename: string;
    url: string;
    metadata: {
        size: number;
        mimetype: string;
    };
    createdAt: string;
}