import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './pages/RootLayout'
import FormStepOne from './pages/FormStepOne'
import FormStepTwo from './pages/FormStepTwo'
import FormStepThree from './pages/FormStepThree'
import FormStepFour from './pages/FormStepFour'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";

const App = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <RootLayout />,
			children: [
				{
					index: true,
					element: <Navigate to="/home" />,
				},
				{
					path: '/home',
					element: <Home />,
				},
				{
					path: 'step-1',
					element: <FormStepOne />,
				},
				{
					path: 'step-2',
					element: <FormStepTwo />,
				},
				{
					path: 'step-3',
					element: <FormStepThree />,
				},
				{
					path: 'step-4',
					element: <FormStepFour />,
				},
			],
		},
	])

	return (<RouterProvider router={router}/>)
}
export default App
