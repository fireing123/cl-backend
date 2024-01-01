export interface User {
    id: string;
    name: string | null;
    image: string | null;
    email: string;
    rank: string;
    phoneNumber: string | null;
    posts: string[];
    applicationId: string | null;
}