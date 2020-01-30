import { GameConfig, DifficultyLevel, GameType, Game, Question, GameApiData } from '../../../common/Interfaces';

export const gameConfig: GameConfig = {
  difficulty: DifficultyLevel.HARD,
  amount: 10,
  gameType: GameType.BOOLEAN
}

export const game: Game = {
  currentQuestion: {} as Question,
  questionIndex: 5,
  answers: []
}

export const oneQuestion: Question = {
  category: 'entertainment',
  correct_answer: 'true',
  type: 'boolean',
  difficulty: DifficultyLevel.HARD,
  question: 'Do you believe in magic?',
  incorrect_answers: ['false']
}

export const apiData: GameApiData = {
  questions: [oneQuestion]
}