import { useState } from 'react';
import { Button, makeStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import { EmptyTodoList } from './EmptyTodoList';
import { TodoItemType, TodoItem } from './TodoItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

export const TodoWrapper = () => {
  const classes = useStyles();
  const [ todoList, setTodoList] = useState<Array<TodoItemType>>([]);
  let debounce: any = null;

  function addEmptyList(){    
    setTodoList([ ...todoList, { isComplete: false, todo: '' }])
  }

  function removeElementAtIndex(index: number) {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      const newList = [ ...todoList];
      newList.splice(index, 1);
      setTodoList(newList);
    }, 300);
  }

  function saveElementAtIndex(index: number, savedItem: TodoItemType) {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      if(!savedItem.todo) return;
      const newList = [ ...todoList ];
      newList[index] = savedItem;
      setTodoList(newList);
    }, 300);
  }

  function renderList(): JSX.Element {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>To do</TableCell>
              <TableCell>_</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {
            todoList.map((todo, index) => {
              let editMode = false;
              if(!todo.todo){
                editMode = true;
              }
              return <TodoItem todo={todo} onSave={(savedItem) => { saveElementAtIndex(index, savedItem)}} editMode={editMode} onRemove={() => removeElementAtIndex(index)} key={index}/>
            })
          }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  return (
      <div className={classes.root}>
        { todoList.length ? renderList() : <EmptyTodoList />}
        <br/>
        <Button variant='contained' color='primary' onClick={addEmptyList}>
          Add
        </Button>
      </div>
    );
}
