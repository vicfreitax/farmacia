
import homeLogo from '../../assets/home.png'
import './Home.css';
import ListarCategoria from '../../components/categorias/listarCategorias/ListarCategoria';


function Home() {
    return (
        <>
        
        <div className="bg-blue-500 flex justify-center">
          <div className='container grid grid-cols-2 text-white'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-5xl font-bold'>Bem vindes!</h2>
              <p className='text-xl'>Farmacia Viva Bem</p>
  
              <div className="flex justify-around gap-4">
              
                <button className='rounded bg-white text-blue-800 py-2 px-4'>Ver Categorias</button>
              </div>
            </div>
  
            <div className="flex justify-center ">
              <img src={homeLogo} alt="" className='w-2/3' />
      
            </div>
          </div>
        </div>
      <ListarCategoria />
     
      </>
    );
}

export default Home;