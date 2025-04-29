import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-secondary">404</h1>
        <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-white">Página no encontrada</h2>
        <p className="mb-8 text-lg text-gray-700 dark:text-gray-300">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link 
          to="/"
          className="inline-block rounded-md bg-primary px-6 py-3 text-white transition hover:bg-secondary"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound; 