import { useState, useEffect } from 'react';
import { Checkbox, TableRow, TableCell, TextField, IconButton } from '@material-ui/core';
import { Edit, Save, Delete } from '@material-ui/icons';
export interface TodoItemType {
  todo: string;
  isComplete: boolean;
}

export const TodoItem: React.FC<{ todo: TodoItemType, editMode: boolean, onSave: (savedItem: TodoItemType) => void, onRemove: () => void }> = ({ todo, editMode = false, onSave, onRemove }) => {

  const [todoItem, setTodoItem] = useState({ ...todo });
  const [isEditMode, setEditMode] = useToggle(editMode);
  useEffect(() => {
    setTodoItem(todo);
  }, [todo]);

  useEffect(() => {
    setEditMode(editMode);
  }, [editMode])

  return (
    <TableRow hover>
      <TableCell padding='checkbox'>
        <Checkbox disabled={!isEditMode} checked={todoItem.isComplete} inputProps={{ 'aria-label': 'primary checkbox' }} onChange={(event) => setTodoItem({ ...todoItem, isComplete: event.target.checked })} />
      </TableCell>
      <TableCell>
        {
          isEditMode ?
            <TextField value={todoItem.todo} onChange={(event) => setTodoItem({ ...todoItem, todo: event.target.value })} /> :
            todoItem.todo
        }
      </TableCell>
      <TableCell>
        <IconButton onClick={() => { setEditMode(); } }>
          <Edit />
        </IconButton>
        <IconButton onClick={() => { 
          if(!todoItem.todo) return;
          onSave(todoItem);
          setEditMode(false); }}>
          <Save />
        </IconButton>
        <IconButton onClick={onRemove}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const useToggle: (initialValue: boolean) => [boolean, (value?:boolean) => void] = (initialValue) => {
  const [toggleValue, setToggleValue ] = useState(initialValue);

  const toggleTheValue = (value?:boolean) => {
    if(value != null){
      setToggleValue(value);
    }
    else{
      setToggleValue(prev => !prev);
    }
  }
  return [toggleValue, toggleTheValue];
}