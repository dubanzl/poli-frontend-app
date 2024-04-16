// @ts-ignore
import 'leaflet/dist/leaflet.css';
import { useState } from "react";
import { Link } from "react-router-dom";
import homeImage from '../../assets/Home.jpg';
 // @ts-ignore

// eslint-disable-next-line react-refresh/only-export-components
export default () => {



	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<section className="bg-blue-500 py-4 px-8 md:flex md:justify-between md:items-center" style={{  backgroundColor: '#247d1d' }}>
				<div className="flex items-center justify-between">
					<div className="text-white lg:text-3xl font-bold">Fingit</div>
					<button className="md:hidden text-white focus:outline-none focus:text-white" onClick={() => setIsOpen(!isOpen)} >
						<svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" >
							{isOpen ? (
								<path d="M6 18L18 6M6 6l12 12"></path>
							) : (
								<path d="M4 6h16M4 12h16m-7 6h7"></path>
							)}
						</svg>
					</button>
				</div>
				<div className={`md:flex ${isOpen ? 'block' : 'hidden'} md:items-center md:space-x-6`}>
					<Link to={'/iniciar-sesion'}><button className="block md:inline-block bg-white text-blue-500 px-4 py-2 rounded-md mt-4 md:mt-0">Iniciar sesión</button></Link>
				</div>
			</section>

			<section className=" py-12 px-4 md:px-16 lg:px-32 xl:px-12 min-h-screen">
				<div className="flex flex-col md:flex-row items-center justify-center">
					<div className="w-full md:w-1/2 mb-8 md:mb-0">
						<img src={homeImage} alt="Imagen de Control de Asistencia" className="w-full h-auto" style={{ width: 600}} />
					</div>
					<div className="w-full md:w-1/2 text-center mx-auto">
					<div className="text-white lg:text-3xl font-bold" style={{ color: '#247d1d', fontSize: 80 }}>Fingit</div>

						<p className="text-xl lg:text-2xl font-bold mb-8 lg:mt-12 lg:mb-12 md:mx-auto mx-auto" style={{ maxWidth: 800 }}>

						
							Inicia a registrar la informacion de tu trabajo
						</p>

						<Link to={'/iniciar-sesion'}>
							<button className="bg-blue-500 text-white px-8 py-4 text-lg lg:text-3xl font-bold rounded-lg md:mx-auto w-1/2" style={{ maxWidth: 400, backgroundColor: '#247d1d'}}>
								¡Empieza Ahora!
							</button>
						</Link>
					</div>
				</div>
			</section>

	
		</>
	)
}

