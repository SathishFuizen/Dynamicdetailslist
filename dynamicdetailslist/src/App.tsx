import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import DetailsListDocumentsExample from './Components/Dynamicdetails';
import { faker } from '@faker-js/faker';


function App() {


  const ldata:any = [];
  const [listData,setListData]=useState<any>([]);
  // const [sortingColumn, setSortingColumn] = useState(null);
  // const [sortingDirection, setSortingDirection] = useState('asc');
  // const [rowData, setRowData] = useState([])
 
  const generateData = () =>{

    const personname = faker.person.fullName();
    const personage = Math.floor(Math.random()*101)
    const personPosition = faker.person.jobTitle();
    const personLocation = faker.location.county();
    const occupation = faker.hacker.verb();

    
   
    ldata.push({name:personname,age:personage,position:personPosition,location:personLocation,occupation:occupation})
    
    setListData(ldata)

    // setListData((prev:any)=>[...prev,{name:personname,age:personage,position:personPosition,location:personLocation,occupation:occupation}])
  }


  // const sorting = (column:any) => {
  //   if (sortingColumn === column){
  //     setSortingDirection(sortingDirection === 'asc' ? 'desc' : 'asc')

  //   }else{
  //     setSortingColumn(column)
  //     setSortingDirection('asc')

  //   }

  // }


 


  
  useEffect(()=>{

    
    for(let i=0;i<=20;i++){
      console.log(i);
      
      generateData()
      
      
    }
    console.log(listData);
    
  },[])



  useEffect(()=>{
    console.log(listData);
    
    
  },[listData])


  return (
    <div className="App">
      <DetailsListDocumentsExample column={['name','age','position','location','occupation'] } rowdata={listData}
      // FileType={"File Type"}
      // Name={"Name"}
      // DateModifier={"Date Modified"}
      // ModifiedBy={"Modified By"}
      // FileSize={"File Size"}


       />
    </div>
    
  );
}

export default App;
