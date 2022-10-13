import React, { useState } from 'react'

const Pagina = () => {
  const img = 'https://picsum.photos/200';
  const [Productos, setProduct] = useState('')
  const [Descripcion, setDescripcion] = useState('')
  const [prov, setProv] = useState('')
  const [esta_pro, seesta_pro] = useState('')
  const [feP, setfeP] = useState('')
  const [feV, setfeV] = useState('')
  const [list_produc, setlist_produc] = useState([])


  return(
    <>
    <div className="container mt-5">
      <h1 className='text-center'>Pagina Bp Rubrica</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className='text-center'>Lista de productos</h4>
          <ul className='list-group'>

          </ul>
        </div>
        <div className="col-4">
          <h4 className='text-center'>
            Agregar Productos
          </h4>
          <form>
            <input type="text" className="form-control mb-2" placeholder='Nombre del producto'/>
            <input type="text" className="form-control mb-2" placeholder='Descripcion del producto'/>
            <input type="text" className="form-control mb-2" placeholder='Provedor'/>
            <input type="text" className='form-control mb-2' placeholder='Estados del producto'/>
            <label htmlFor="">Fecha de Produccion</label>
            <input type="date" className="form-control mb-2"/>
            <label htmlFor="">Fecha de vencimiento</label>
            <input type="date" className="form-control mb-2"/>
            <button className="btn btn-primary btn-block" type='submit'>Agregar</button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Pagina