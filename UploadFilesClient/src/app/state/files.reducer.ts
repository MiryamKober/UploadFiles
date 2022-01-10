//import { Product } from './../product/product.model';
import { Action } from '@ngrx/store';
import { FileModel } from '../interfaces/file';

export const ADD_FILE = 'ADD_FILE';

export function fileReducer(state: FileModel[] = [], action) {
  switch (action.type) {
    case ADD_FILE:
        {
            console.log(state)
            return [...state, action.payload];

        }
    default:
        return state;
    }
}