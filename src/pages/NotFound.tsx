/* 404 Page - Displays when a user attempts to access a non-existent route - translate to the language of the user */
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Página não encontrada</p>
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}

export default NotFound
