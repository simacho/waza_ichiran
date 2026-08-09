import { ALL_TABLE_TECHNIOUES, GRIP_CATEGORIES as PARSED_GRIP_CATEGORIES, ALL_GRADES as PARSED_ALL_GRADES } from './parsedTechniques';
import { Grade, GripType, Technique } from '../types';

export const GRIP_CATEGORIES: GripType[] = PARSED_GRIP_CATEGORIES;
export const ALL_GRADES: Grade[] = PARSED_ALL_GRADES;

export const INITIAL_TECHNIQUES: Technique[] = ALL_TABLE_TECHNIOUES;
