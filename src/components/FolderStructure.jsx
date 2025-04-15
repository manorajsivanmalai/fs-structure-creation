
import Folder from "./Folder";
import React, { useState } from "react";
const FolderStructure = () => {
    const [structure, setStructure] = useState([
      { id: 1, name: "Root Folder", type: "folder", subData: [] },
    ]);
    const [file,setFile]=useState(null);
    console.log(structure);

  // const hanldeFiles= async() => {

  //   if (!file) {
  //     console.log("No file selected.");
  //     return;
  //   }
  //   const formData = new FormData();
  //         formData.append("file", file); 

  //  await fetch("http://localhost:5000/upload", {
  //     method: "POST",
  //     body:  formData
      
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
    
  // }


  const handleFiles =async ()=>{
  
   await fetch("http://localhost:5000/structure", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(structure)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  }
    const handleAdd = (parentId, newItem) => {
      const addRecursively = (items) => {
        return items.map((item) => {
          if (item.id === parentId && item.subData) {
            return { ...item, subData: [...item.subData, newItem] };
          }
          if (item.subData) {
            return { ...item, subData: addRecursively(item.subData) };
          }
          return item;
        });
      };
  
      setStructure((prev) => addRecursively(prev));
    };
  

    return (
      <div className="container">
        <h1 className="title">📁 Folder Structure Builder</h1>
        {structure.map((folder) => (
          <Folder key={folder.id} folder={folder} onAdd={handleAdd} file={file} setFile={setFile} />
        ))}
        <button className="btn-primary" onClick={handleFiles}>generate</button>
      </div>
    );
  };
  
  export default FolderStructure;