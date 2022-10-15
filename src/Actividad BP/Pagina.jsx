import React, { useEffect, useState } from 'react'
import {bd} from '../firebase';
import { collection, addDoc, deleteDoc ,doc, onSnapshot, updateDoc } from 'firebase/firestore';


const Pagina = () => {
  const img = 'https://picsum.photos/200';
  const [Productos, setProduct] = useState('')
  const [Descripcion, setDescripcion] = useState('')
  const [prov, setProv] = useState('')
  const [esta_pro, setesta_pro] = useState('')
  const [feP, setfeP] = useState('')
  const [feV, setfeV] = useState('')
  const [list_produc, setlist_produc] = useState([])
  const [EditionMode, setEditionMode] = useState(false)
  const [id,setid] = useState('')

  useEffect (() => {
    const Odatos = async () => {
      try{
        await onSnapshot(collection(bd,'Bp - Rubrica'), (query) => {
          setlist_produc(query.docs.map((doc) =>({...doc.data(),id:doc.id})))
        })
      }catch(error){
        console.log(error)
      }
    }
    Odatos();
  },[])

  const guardarProduc = async (e) => {
    e.preventDefault();
    try{
      const data = await addDoc(collection(bd,'Bp - Rubrica'),{
        nombreProduc: Productos,
        descripP: Descripcion,
        nombreProV: prov,
        estaPro: esta_pro,
        fecPro:feP,
        fecVec: feV
      })

      setlist_produc([
        ...list_produc,
        {
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

  const Eliminar = async id => {
    try{
      await deleteDoc(doc(bd,'Bp - Rubrica', id))
    }catch(error) {
      console.log(error)
    }
  }

  const edit = item => {
    setProduct(item.nombreProduc)
    setDescripcion(item.descripP)
    setProv(item.prov)
    setesta_pro(item.esta_pro)
    setfeP(item.feP)
    setfeV(item.feV)
    setid(item.id)
    setEditionMode(true)
  }

  const editPro = async e =>{
    e.preventDefault();
    try{
      const docRef = doc(bd,'Bp - Rubrica',id);
      await updateDoc(docRef,{
        nombreProduc: Productos,
        descripP: Descripcion,
        nombreProV: prov,
        estaPro: esta_pro,
        fecPro:feP,
        fecVec: feV,
      })

      const nuevalista = list_produc.map(
        item => item.id === id ? {
          id: id, 
          nombreProduc: Productos,
          descripP: Descripcion,
         nombreProV: prov,
          estaPro: esta_pro,
          fecPro:feP,
          fecVec: feV,
        } : item
      )

      setlist_produc(nuevalista)
      setProduct(' ')
      setDescripcion(' ')
      setProv(' ')
      setesta_pro(' ')
      setfeP('')
      setfeV('')
      setid(' ')
      setEditionMode(false)

    }
    catch(error){
      console.log(error)
    }
  }

  const cancel = () => {
    setEditionMode(false)
    setProduct('')
    setDescripcion('')
    setProv('')
    setesta_pro('')
    setfeP('')
    setfeV('')
    setid('')
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
                    <img src={img} alt="Esto es una imagen ramdon" class="img-thumbnail" width='60px'/>-
                    {item.nombreProduc}-
                    {item.descripP}-
                    {item.nombreProV}-
                    {item.estaPro}-
                    {item.fecPro}-
                    {item.fecVec}-
                  </span>
                  <button className='btn btn-danger btn-sm fload-end mx-2'
                  onClick={() => Eliminar(item.id)}>Eliminar</button>
                  <button className='btn btn-warning btn-sm fload-end'
                  onClick={() => edit(item)}>Editar</button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className='text-center'>
            {
              EditionMode ? 'Editar Productos' : 'Agregar Productos'
            }
          </h4>
          <form onSubmit={ EditionMode ? editPro : guardarProduc}>
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
            {
              EditionMode ? 
              (
                <>
                  <button 
                  className="btn btn-warning btn-block" 
                  type='submit'>Editar</button>
                  <button 
                  className="btn btn-dark btn-block mx-2"
                  onClick={() => cancel()}>Cancelar</button>
                </>
              ):
                  <button className="btn btn-primary btn-block" type='submit'>Agregar</button>
            }
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Pagina