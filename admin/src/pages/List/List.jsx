import { useEffect, useState } from 'react'
import './List.css';
import axios from 'axios';
import {toast} from 'react-toastify';
function List() {
  const url='http://localhost:4000'
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
  console.log(list)
  return (
    <div>List</div>
  )
}

export default List