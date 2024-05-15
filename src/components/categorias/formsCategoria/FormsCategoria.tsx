import { ChangeEvent, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom';
import { atualizar, cadastrar, listar } from '../../../services/Service';
import Categoria from '../../models/categoria';

function FormularioCategoria() {
  
   
  const [categoria, setCategorias] = useState<Categoria>({
    id: 0,
    nome: '',
    descricao: ''
  });

  let navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  

  async function buscarPorId(id: string) {
    await listar(`/categorias/${id}`,setCategorias,{});

  }

  


  
  useEffect(() => {
   
    if (id !== undefined) {
        buscarPorId(id);
        
    }
}, [id]);

    
  

function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategorias({
      ...categoria,
      [e.target.name]: e.target.value

    })


  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    console.log({ categoria });

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategorias)

        alert('Categoria atualizada com sucesso')

        retornar()

      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('o token expirou')
        } else {
          alert('erro ao atualizar categoria')
        }
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategorias)

        alert('Categoria cadastrada com sucesso')
      } catch (error: any) {
        if (error.toString().includes('403')) {
          alert('O token expirou, favor logar novamente')
        } else {
          alert('Erro ao cadastrar categoria')
        }
      }
    }
    retornar()
  }
  function retornar() {
    navigate("/categorias")
  }

  return (
    <div className="bg-indigo-100 container flex flex-col items-center  mx-auto">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? 'editar categoria' : 'Cadastre uma nova categoria'}
      </h1>

      <form onSubmit={gerarNovaCategoria} className="w-1/2 flex flex-col gap-4" >
        <div className="flex flex-col gap-2">
          <label htmlFor="nome">Titulo da Categoria</label>
          <input
            value={categoria.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            type="text"
            placeholder="Nome"
            name="nome"
            required
            className="border-2 border-slate-700 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição da Categoria</label>
          <input
            type="text"
            placeholder="Descrição"
            name='descricao'
            className="border-2 border-slate-700 rounded p-2"
            value={categoria.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="rounded text-slate-100 bg-indigo-400 hover:bg-indigo-800 w-1/2 py-2 mx-auto block"
          type="submit"
        >
          {id === undefined ? 'Cadastrar' : 'Editar'}
        </button>
      </form>
    </div>

  )
}


export default FormularioCategoria