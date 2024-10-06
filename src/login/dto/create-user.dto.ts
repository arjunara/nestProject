export interface CreateUserDto {
    id?: string | number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    phoneNumber: string;
    email?: string;
    isActive?: boolean
}

export interface SignInDto {
    userName: string;
    password: string;
}