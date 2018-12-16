import { Observable } from 'rxjs';

export interface SaveFileReturn<T> {
    withSharepoint: boolean;
    return?: T;
}

export interface SaveFileError<T> extends SaveFileReturn<T> {
    error: any;
}
