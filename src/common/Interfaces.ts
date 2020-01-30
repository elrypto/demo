/**
|--------------------------------------------------
|  Interfaces
|--------------------------------------------------
*/

/* Application State for Store (reducer) */
export interface AppState {
  game: Game;
  gameConfig: GameConfig;
  apiData: GameApiData;
  loadingStates: LoadingStates;
}

export interface Game {
  currentQuestion: Question;
  questionIndex: number;
  answers: Array<any>;
}

export interface GameApiData {
  questions: Array<Question> | null;
}

export interface Question {
  category: string;
  type: string;
  difficulty: DifficultyLevel;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
}

export interface LoadingStates {
  error: Error | null;
  loading: boolean;
  loaded: boolean;
}

export enum DifficultyLevel {
  HARD = 'hard',
}

export enum GameType {
  BOOLEAN = 'boolean',
}

export interface GameConfig {
  difficulty: DifficultyLevel;
  amount: number;
  gameType: GameType;
}

/* App Infastructure */
export type Dispatch = React.Dispatch<Action>;

export interface Action {
  type: string;
  payload: any;
  fieldName?: string;
}

export enum ActionType {
  SET_FIELD = 'challenge/SET_FIELD',
  SET_API_QUESTIONS = 'challenge/SET_API_QUESTIONS',
  SET_QUESTION_INDEX = 'challenge/SET_QUESTION_INDEX',
  SET_CURRENT_QUESTION = 'challenge/SET_CURRENT_QUESTION',
  SET_ALL_STATE = 'challenge/SET_ALL_STATES',
  SET_LOADING = 'challenge/SET_LOADING',
  SET_ERROR = 'challenge/SET_ERROR',
  SET_LOADED = 'challenge/SET_LOADED',
  SET_ANSWERS = 'challenge/SET_ANSWERS',
  RESET_GAME_STATE = 'challenge/RESET',
}
