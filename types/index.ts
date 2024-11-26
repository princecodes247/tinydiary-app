export type TMood = { emoji: string, label: string, value: string }
export type FABState = 'idle' | 'addNote' | 'recording' | 'reviewRecord';

export interface INote { 
    title: string;
     content: string; 
     createdAt?: Date
    }