import { useEffect, useState } from 'react'
import './List.css';
import axios from 'axios';
import {toast} from 'react-toastify';
function List({url}) {

  const [list, setList]=useState([]);
  const fetchList = async()=>{
    const res = await axios.get(`${url}/api/food/list`)
    if(res.data.success){
      setList(res.data.data)
    }else{
      toast.error("Error in loading list")
    }
  };
  useEffect(()=>{
    fetchList();
  },[])
  const removeFood = async(foodId)=>{
    const res = await axios.post(`${url}/api/food/remove`,{id:foodId});
    if(res.data.success){
      toast.success("Food removed");
      await fetchList();
    }else{
      toast.error("Error occured in removing food")
    }
  }
  return (
    <div className='list add flex-col'>
      <p>All Foods list</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div className='list-table-format' key={index}>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default List