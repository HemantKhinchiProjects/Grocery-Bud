import React, { useState, useEffect } from 'react';
import './style.css';
import Alert from './componenets/Alert';
import List from './componenets/List';

//for local stroge return
const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setisEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'Please enter value', 'danger'); //display alert
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      ); //deal with edit
      setName('');
      setEditId(null);
      setisEditing(false);
      showAlert(true, 'Value changed', 'success');
    } else {
      showAlert(true, 'Item added to the list', 'success'); //show alert
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  };
  const showAlert = (show = false, msg = '', type = '') => {
    setAlert({ show, type, msg });
  };
  //clear item
  const clearIteamHandler = () => {
    showAlert(true, 'Empety list', 'danger'); //show alert
    setList([]);
  };
  //remove item
  const removeItem = (id) => {
    showAlert(true, 'item remove', 'danger'); //show alert
    setList(list.filter((item) => item.id !== id));
  };
  //edit item
  const editItem = (id) => {
    showAlert(true, 'please enter value', 'danger'); //show alert
    const a = list.find((item) => item.id === id);
    setisEditing(true);
    setEditId(id);
    setName(a.title);
  };
  //for local storage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);
  return (
    <div className="App">
      <section className="section-center">
        <form action="" className="grocery-form" onSubmit={handlerSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3>Grocery Bud</h3>
          <div className="form-control">
            <input
              type="text"
              placeholder="e.g. eggs"
              className="grocery"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEditing ? 'Edit' : 'Submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <div className="clear-btn" onClick={clearIteamHandler}>
              clear items
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
