import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { SocketContext } from '../context/Socket'
import { QuizContext } from '../context/quiz'

import { type QuizStateInDB, type IGame } from '../interfaces'

import { getGamesByOwner, removeQuiz, updateStateGame } from '../api'
import { INITIAL_STATE } from '../services'
import { removeGame } from '../api/game'

export const useGame = () => {
  const { currentQuestionNumber, changeNumberQuestion } = useContext(QuizContext)
  const [questionData, setQuestionData] = useState<QuizStateInDB>(INITIAL_STATE)
  const [timeForQuestion, setTimeForQuestion] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { initializeSocket } = useContext(SocketContext)
  const [error, setError] = useState({
    isError: false,
    message: ''
  })
  const [gamesByOwner, setGamesByOwner] = useState<IGame[]>([])
  const navigate = useNavigate()

  const getListGames = async () => {
    const idOwner = localStorage.getItem('id')
    if (!idOwner) return
    setIsLoading(true)
    const listGames = await getGamesByOwner(idOwner)
    if (!listGames) return
    if (!listGames.ok) {
      setError({
        isError: true,
        message: 'No se pudo obtener la lista de partidas'
      })
      setIsLoading(false)
      return
    }
    setGamesByOwner(listGames.games)
    setIsLoading(false)
  }

  const activeGame = async (game: IGame) => {
    initializeSocket(game.hostId)
    await updateStateGame(game.hostId, game, true)
    navigate(`/HostScreen/${game.quizId}`)
  }

  const restartGame = async (game: IGame) => {
    await updateStateGame(game.hostId, game, false)
    getListGames()
  }

  const removeGameToBD = async (quizId: string, gameId: string) => {
    const responseToRemoveQuiz = await removeQuiz(quizId)
    // if (!resp) return
    if (!responseToRemoveQuiz.ok) {
      return {
        ok: responseToRemoveQuiz.ok,
        msg: 'Ocurrió un problema al eliminar el quiz'
      }
    }
    const responseToRemoveGame = await removeGame(gameId)
    if (!responseToRemoveGame.ok) {
      return {
        ok: responseToRemoveGame.ok,
        msg: 'Ocurrió un problema al eliminar la partida'
      }
    }

    getListGames()
    return {
      ok: responseToRemoveGame.ok,
      msg: responseToRemoveGame.msg
    }
  }

  useEffect(() => {
    getListGames()
  }, [])

  return {
    // Variables
    isLoading,
    gamesByOwner,
    error,
    currentQuestionNumber,
    questionData,
    timeForQuestion,

    // Methods
    activeGame,
    restartGame,
    changeNumberQuestion,
    setQuestionData,
    setTimeForQuestion,
    removeGameToBD
  }
}
