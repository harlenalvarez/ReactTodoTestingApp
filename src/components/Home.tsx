import { Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useStoreSelector } from '../store/RootStore';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4)
  }
}));
export const Home = () => {
  const styles = useStyles();

  // normal selector
  const pendingTodos = useStoreSelector(state => state.todos.filter(todo => !todo.isComplete).length);
  return (
    <Container>
      <Grid container spacing={2} alignItems='center' className={styles.container}>
        {
          !pendingTodos ?
          <Typography>You don't have pending todo's <Link to='/todos'>Add More</Link></Typography> :
          <Typography>You have {pendingTodos} todos <Link to='/todos'>View</Link></Typography>
        }
      </Grid>
    </Container>
  )
}