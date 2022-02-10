import { useState } from 'react';
import { Button, makeStyles, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

import { EmptyTodoList } from './EmptyTodoList';
import { TodoItemType, TodoItem } from './TodoItem';

// we bring in the custom selectors we created
import { useStoreDispatch, useStoreSelector } from '../../store/RootStore';

// Legacy action we bring in the redux action types
//import { TodoAction } from '../../store/reducers/Todo.reducer.legacy';

// Hybrid action using thunk and action creators
// import { TodoAction, SaveTodoAsync } from '../../store/reducers/Todo.reducer.hybrid';

// Slice import is identical to the hybrid approach
import { TodoAction, SaveTodoAsync } from '../../store/reducers/Todo.reducer.slice';

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

  // Basic redux using hooks
  const dispatch = useStoreDispatch();
  const todoList = useStoreSelector(state => state.todos);

  function addEmptyList(){
    // Legacy call to dispatch where we build the action
    // of course this can be extracted into an action creator
    // dispatch({type: TodoAction.Add });

    // Hybrid and Slice using the actions we created
    dispatch(TodoAction.Add());
  }

  function saveElementAtIndex(index: number, savedItem: TodoItemType) {
    // Legacy dispatch
    // dispatch({ type: TodoAction.Save, payload:{ index, savedItem }});

    // Hybrid and Slice using the thunk
    dispatch(SaveTodoAsync({index, savedItem}));
  }

  function removeElementAtIndex(index: number) {
    // legacy dispatch
    // dispatch({type: TodoAction.Remove, payload: index });

    // Hybrid and Slice
    dispatch(TodoAction.Remove(index));
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
