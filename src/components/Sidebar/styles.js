import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  image: {
    width: '70%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImages: {
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
  },
  bigText: {
    color: 'primary',
    fontSize: 30,
  },
  // center the button
  buttonContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    margin: '5% 5%',
  },
  imageButton: {
    width: '90%',
    margin: '5% 5%',
  },
  // imageButtonDesc: {
  //   textAlign: 'center',
  //   color: theme.palette.text.primary,

  // },

}));
