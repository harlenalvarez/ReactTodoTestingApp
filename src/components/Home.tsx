import { Container, Grid, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(4)
  }
}));
export const Home = () => {
  const styles = useStyles();
  return (
    <Container>
      <Grid container spacing={2} alignItems='center' className={styles.container}>
        <Typography>View Your Todo's <Link to='/todos'>Click Here</Link></Typography>
      </Grid>
    </Container>
  )
}