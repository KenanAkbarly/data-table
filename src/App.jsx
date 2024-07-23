import { useEffect } from 'react'
import { useState } from 'react'
//components
import Button from './components/button'
import Checkbox from './components/checkbox'
import Input from './components/input'


function App() {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState([])
  const [userId, setUserId] = useState('')
  const [postId, setPostId] = useState('')
  const [filtered, setFiltered] = useState([])
  console.log(userId,postId)
  const getData = async()=>{
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    setData(data);
    setFiltered(data)
  }
  useEffect(()=>{
    getData()
  },[])
  
  const cleanData = ()=>{
    setData([])
    setFiltered([])
  }
  const reloadData = () =>{
    getData()
  }

  const handleCheckboxChange = (id) => {
   if(selected.includes(id)){
    setSelected(selected.filter(item=>item.id !== id))
   }else{
    setSelected([...selected,id])
   }
  }
  const deleteData = ()=>{
    const deltededData = data.filter(item=> !selected.includes(item.id))
    setData(deltededData)
    setFiltered(deltededData)
    setSelected([])
  }
  const filterDataFunc =()=>{
    let filteredData = data;
    if(userId){
      filteredData = filteredData.filter(item=> item.userId.toString() === userId)
    }

    if(postId){
      filteredData = filteredData.filter(item => item.id.toString() === postId)
    }
   
    setFiltered(filteredData)

  }
  return (
    <>
      <div className='sm:container mx-auto '>
       <div className='flex justify-between pt-5'>
        <Button onClick={reloadData}>Reload</Button>
        <Button onClick={cleanData}>Clean</Button>
        <Button onClick={deleteData}>Delete</Button>
       </div>
       <div className="flex flex-col">
  <div className="-m-1.5 overflow-x-auto">
    <div className="p-1.5 min-w-full inline-block align-middle">
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Post ID</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">User ID</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Titles</th>
              <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Check</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {
              filtered && filtered.map((dataItem)=>{
                return(
                  <tr key={dataItem.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{dataItem.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{dataItem.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{dataItem.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <Checkbox
                    isChecked={selected.includes(dataItem.id)}
                    onChange={()=> handleCheckboxChange(dataItem.id)}
                    />
                  </td>
                </tr>
              )})
            }

           
          </tbody>

      
        </table>
      </div>
    </div>
  </div>
       </div>
       <div className='flex justify-between'>
        <Input 
        placeholder='User ID'
        value = {userId}
        onChange={(event)=> setUserId(event.target.value)}
        />
        <Input 
        placeholder='Post ID'
        value = {postId}
        onChange={(event)=> setPostId(event.target.value)}
        />
        <Button onClick={filterDataFunc}>Get</Button>
       </div>
      </div>
    </>
  )
}

export default App
