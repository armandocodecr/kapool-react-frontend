import { createContext } from 'react'
import { type QuizState, type IQuizQuestions } from '../../interfaces'

interface ContextProps {
  questionsGame: QuizState
  winner: string
  questionNumberState: number
  changeNumberQuestion: (value: number) => void
  addQuestion: (question: IQuizQuestions) => void
}

export const QuizContext = createContext({} as ContextProps)
