import React, {useState, useCallback} from 'react';
import { v4 as uid } from 'uuid';

const App = () => {
  console.log('In App');
  const [name, setName] = useState('');
  const [users, setUsers] = useState(
    [
      { id:'a', name:'premal'},
      { id:'b', name:'katigar'},
    ]
  );
  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleClick = () => {
    setUsers([...users, { id: uid(), name: name }]);
  };
  const handleDelete = useCallback((id)=> {
    setUsers(users.filter((obj)=> obj.id !== id));
  }, [users]);
  return(
    <div>
      <input type="text" onChange={handleChange} />
      <button type="button" onClick={handleClick}>Submit</button>
      <List
        items={users}
        onDelete={handleDelete}
      />
    </div>
  )
}
const List = React.memo(({ items, onDelete })=>{
  console.log('In List');
  return(
    <ul>
      {
        items.map((item)=>{
          return (
            <Item
              item={item}
              key={item.id}
              onDelete={onDelete}
            />
          )
        })
      }
    </ul>
  )
});
const Item = React.memo(({ item, onDelete })=>{
  return (<li>
    {item.name}{' '}
    <button type="button" onClick={()=> onDelete(item.id)}>Delete</button>
    </li>
  )
});
export default App;
