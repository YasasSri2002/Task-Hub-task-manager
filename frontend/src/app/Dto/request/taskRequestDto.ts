export interface TaskRequestDto{
    
    title: string;

    description: string;

    status: string; //In Progress, completed, due

    userId: string;
}