import mongoose from "mongoose";

export interface DecodedToken {
    id: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
}

export interface AuthContextType {
    auth: string | null;
    userDetails: DecodedToken | null;
    login: (token: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

//SingleTestPage
export interface Option {
    label: string;  // e.g., "a", "b", "c", "d"
    text: string;   // The text of the option, e.g., "4"
}
export interface Question {
    number: number;           // The sequence number of the question
    question: string;         // The text of the question being asked
    options: Option[];        // An array of possible options
    correctAnswer: string;    // The label of the correct answer (e.g., "b")
    photo: string;           // Optional URL to a photo associated with the question
}
export interface Result {
    number: number;
    question: string;
    options: Option[];
    correctAnswer: string;
    givenAnswer: string;
    isRight: boolean;
    photo?: string;
}

//Course
export interface Course {
    _id: string,
    is_deleted: boolean;
    name: string;
    description: string;
    duration: string;
    photo: string;
    language: string;
    class: string;
    isFree: boolean;
    price: number;
    startDate: Date;
    subjects: []
    students: []
    tests: []
    createdAt: Date;
    updatedAt: Date;
    doubt: string;
    content: string;
    playlist: string;
}
//Test
export interface Test {
    _id: string;
    is_deleted: boolean;
    name: string;
    questions: any; // Adjust the type based on the structure of questions
    description: string;
    duration: string;
    photo: string;
    language: string; // Assuming language is referenced by an ObjectId
    class: string;
    startDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Video {
    _id: string,
    videoName: string;
    videoId: string;
    class: string;
    duration: string;
    photo: string
}

export interface VideosList {
    _id: string,
    is_deleted: boolean;
    videos: Video[];
    class: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    photo: string;
}

export interface Paper {
    _id: string;
    name: string;
    pdfUrl: string;
    class: string;
    photo: string;
    createdAt: Date;
    updatedAt: Date;
    language: string;
}

export interface Playlist {
    _id: string,
    is_deleted: boolean;
    name: string;
    class: string;
    course_id: string;
    videos_id: [];
    updatedAt: Date;
    createdAt: Date;
}