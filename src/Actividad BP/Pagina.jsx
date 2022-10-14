import React, { useState } from 'react'
import {bd} from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const Pagina = () => {
  //const img = 'https://picsum.photos/200';
  const [Productos, setProduct] = useState('')
  const [Descripcion, setDescripcion] = useState('')
  const [prov, setProv] = useState('')
  const [esta_pro, setesta_pro] = useState('')
  const [feP, setfeP] = useState('')
  const [feV, setfeV] = useState('')
  const [list_produc, setlist_produc] = useState([])

  const guardarProduc = async (e) => {
    e.preventDefault();
    try{
      const {data} = await addDoc(collection(bd,"Bp - Rubrica"),{
        nombreProduc: Productos,
        descripP: Descripcion,
        nombreProV: prov,
        estaPro: esta_pro,
        fecPro:feP,
        fecVec: feV
      })

      setlist_produc([
        ...list_produc,{
          nombreProduc: Productos,
          descripP: Descripcion,
          nombreProV: prov,
          estaPro: esta_pro,
          fecPro:feP,
          fecVec: feV,
          id: data.id,
        }
      ])
      
      setProduct(' ')
      setDescripcion(' ')
      setProv(' ')
      setesta_pro(' ')
      setfeP('')
      setfeV('')

    }catch(error) {
      console.log(error)
    }
  }
  return(
    <>
    <div className="container mt-5">
      <h1 className='text-center'>Pagina Bp Rubrica</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className='text-center'>Lista de productos</h4>
          <ul className='list-group'>
            {
              list_produc.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead">
                    {item.nombreProduc}-
                    {item.descripP}-
                    {item.prov}-
                    {item.estaPro}-
                    {item.feP}-
                    {item.feV}-
                  </span>
                  <button className='btn btn-danger btn-sm fload-end mx-2'>Eliminar</button>
                  <button className='btn btn-warning btn-sm fload-end '>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className='text-center'>
            Agregar Productos
          </h4>
          <form onSubmit={guardarProduc}>
            <input type="text" className="form-control mb-2" placeholder='Nombre del producto' value={Productos}
            onChange={(e)=> setProduct(e.target.value)}/>
            <input type="text" className="form-control mb-2" placeholder='Descripcion del producto' value={Descripcion}
            onChange={(e)=> setDescripcion(e.target.value)}/>
            <input type="text" className="form-control mb-2" placeholder='Provedor' value={prov}
            onChange={(e)=> setProv(e.target.value)}/>
            <input type="text" className='form-control mb-2' placeholder='Estados del producto' value={esta_pro}
            onChange={(e)=> setesta_pro(e.target.value)}/>
            <label htmlFor="">Fecha de Produccion</label>
            <input type="date" className="form-control mb-2" value={feP}
            onChange={(e)=> setfeP(e.target.value)}/>
            <label htmlFor="">Fecha de vencimiento</label>
            <input type="date" className="form-control mb-2" value={feV}
            onChange={(e)=> setfeV(e.target.value)}/>
            <button className="btn btn-primary btn-block" type='submit'>Agregar</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Pagina