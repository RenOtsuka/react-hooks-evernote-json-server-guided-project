import React,{useState} from "react";
import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Instructions from "./Instructions";

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and getContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
function Content({showItem, handleShow, handleUpdateList, handleDeleteItem}) {

  const [editBool, setEditBool] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  function handleEditBtn(showItem = null){
    if(!editBool){
      setEditBool((editBool) => !editBool);
      setEditTitle(showItem.title);
      setEditBody(showItem.body);
    }
    else{
      setEditBool((editBool) => !editBool);
    }
  }

  function handleSave(e){
    e.preventDefault();
    
    fetch(`http://localhost:3000/notes/${showItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        userId: 1,
        title: editTitle,
        body: editBody
      })
    })
    .then(r => r.json())
    .then(data => {
      handleUpdateList();
      handleShow(data.id, data.userId, data.title, data.body)
      handleEditBtn();
    })
    .catch(error => alert(error));
  }

  function handleTitleEdit(e){
    setEditTitle(e.target.value);
  }

  function handleBodyEdit(e){
    setEditBody(e.target.value);
  }

  const getContent = () => {
    if (editBool) {
      return <NoteEditor
        editTitle={editTitle}
        handleTitleEdit={handleTitleEdit}
        editBody={editBody}
        handleBodyEdit={handleBodyEdit}
        handleEditBtn={handleEditBtn}
        handleSave={handleSave}
        />
      ;
    } else if (Object.keys(showItem).length !== 0) {
      return <NoteViewer 
        showItem={showItem} 
        handleEditBtn={handleEditBtn}
        handleDeleteItem={handleDeleteItem}
        />
      ;
    } else {
      return <Instructions />;
    }
  };

  return <div className="master-detail-element detail">{getContent()}</div>;
}

export default Content;
