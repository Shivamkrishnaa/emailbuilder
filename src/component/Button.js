import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStylesBase = makeStyles({
  root: {
    color: 'blue', 
  },
});


export default function MyComponent(props) {
    console.log(props.attributes,'props.attributes');
    const useStyles = makeStyles({
      root: props.attributes,
      typo: {
        fontFamily: props.attributes.fontFamily || 'Helvetica'
      }
    });
  const classes = useStyles();
  const classesBase = useStylesBase();

  const className = clsx(classes.root, classesBase.root)

  return <Button className={className} > 
  {props.initalValue}
  <Typography style={classes.type}>{props.initalValue}</Typography>
  </Button>;
}