export interface TaskRequestDto{
    id?: number;
    
    title: string;

    description: string;

    status: string; //In Progress, completed, due

    userId: string;
}