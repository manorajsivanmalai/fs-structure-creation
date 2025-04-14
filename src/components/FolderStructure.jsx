
import Folder from "./Folder";
import React, { useState } from "react";
const FolderStructure = () => {
    const [structure, setStructure] = useState([
      { id: 1, name: "Root Folder", type: "folder", subData: [] },
    ]);
  console.log(structure);
  const hanldeFiles=()=>{

    fetch("http://localhost:5000",{
      method
    })
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
          <Folder key={folder.id} folder={folder} onAdd={handleAdd} />
        ))}
        <button className="btn-primary" onClick={hanldeFiles}>generate</button>
      </div>
    );
  };
  
  export default FolderStructure;