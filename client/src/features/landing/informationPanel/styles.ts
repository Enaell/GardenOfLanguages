import { Theme } from "@material-ui/core";

export const classes = (theme: Theme) => ({
  fc: {
    backgroundColor: 'white',
    width: '350px',
    margin: '20px'
  },
  fcHover: {
    backgroundColor: theme.palette.primary.main
  }
})