export interface User {
    id: number;
    fullName: String;
    email: String;
    password: String;
    gender: number;
    userRole: UserRole
}

export enum UserRole {
  'USER', 'ADMIN'
}
