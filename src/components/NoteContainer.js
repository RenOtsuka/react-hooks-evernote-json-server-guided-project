import React, {useState, useEffect} from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

function NoteContainer() {

  const [list, setList] = useState([]);

  const [showItem, setShowItem] = useState({});

  const [search, setSearch] = useState("");

  useEffect( () => {
    fetch(`http://localhost:3000/notes`)
    .then(r => r.json())
    .then(data => setList(data));
  },[]);

  function handleShow(title, body){
    setShowItem({title: title, body: body});
    //console.log(showItem);
  }

  function handleSearch(e){
    setSearch(e.target.value);
  }

  const filterList = list.filter( item => {
    if(search !== ""){
      return item.title.includes(search);
    }
    else{
      return true;
    }
  });

  return (
    <>
      <Search search={search} handleSearch={handleSearch}/>
      <div className="container">
        <Sidebar list={filterList} handleShow={handleShow}/>
        <Content showItem={showItem}/>
      </div>
    </>
  );
}

export default NoteContainer;
