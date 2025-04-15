import { FaChevronDown, FaChevronRight, FaFolderPlus, FaFileAlt } from "react-icons/fa";
import React, { useState } from "react";
const Folder = ({ folder, onAdd,setFile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [addType, setAddType] = useState(null);
    const [name, setName] = useState("");
    const [fileContent, setFileContent] = useState("");
   
    const handleAdd = () => {
      if (!name) return;
      const newItem = {
        name,
        type: addType,
        ...(addType === "file" && { content: fileContent }),
        subData: addType === "folder" ? [] : undefined,
      };
      onAdd(folder.id, newItem);
      setName("");
      setFileContent("");
      setAddType(null);
    };

    
  
    return (
      <div className="folder">
        <div className="folder-header">
          <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          <span className="folder-name">📁 {folder.name}</span>
          <button className="action-btn" onClick={() => setAddType("folder")}> <FaFolderPlus /> Folder </button>
          <button className="action-btn" onClick={() => setAddType("file")}> <FaFileAlt /> File </button>
        </div>
  
        {addType && (
          <div className="add-form">
            <input
              className="input"
              placeholder={`Enter ${addType} name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {addType === "file" && (<>
              <textarea
                className="textarea"
                placeholder="Enter file content"
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
              />
              <span> or </span> 
               <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
              </>
            )}
           
            <button className="submit-btn" onClick={handleAdd}>Add {addType}</button>
          </div>
        )}
  
        {isOpen && folder.subData?.map((child,index) => (
          <div key={index} className="folder-children">
            {child.type === "folder" ? (
              <Folder folder={child} onAdd={onAdd} />
            ) : (
              <div className="file-card">
                <div className="file-name">📄 {child.name}</div>
                <pre className="file-content">{child.content}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default Folder;