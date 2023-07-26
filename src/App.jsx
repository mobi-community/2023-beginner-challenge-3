import { RouterProvider } from 'react-router-dom'
import './app.css'
import DiaLogProvider from './contexts/DialogProvider'
import { worker } from './__mock__/browser'
import { router } from './routes/routing'
import { useEffect } from 'react'

function App() {
	worker.start()

	return (
		<DiaLogProvider>
			<RouterProvider router={router} />
		</DiaLogProvider>
	)
}

export default App
