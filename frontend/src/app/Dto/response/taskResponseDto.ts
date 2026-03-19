import { UserDto } from "../userDto";

export interface TaskResponseDto {

    id: number;

    title:string;

    description:string;

    status:string;

    createdAt: Date;

    user: UserDto;


}