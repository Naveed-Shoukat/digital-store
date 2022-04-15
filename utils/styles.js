import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  navbar: {
    backgroundColor: '#3b3b3b',
    '& a': {
      color:'#fff',
      marginLeft: 10,
      
    },
  },

  brand: {
    fontWeight:'bold',
    fontSize:'1.7rem'
  },

  grow:{
    flexGrow:1,
  },
  // brand:hover {
  //   backgroundColor = 'blue'
  // },
  backPageLink:{
    display:'inline',
    backgroundColor:'#f0c000',
    boxShadow: `0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)`,
    color:'#000000d9',
    padding:8,
    borderRadius:5,
    // border:'2px solid #111',
  },
  main:{
    minHeight:'85vh',
    minWidth: '90vw',
  },
  footor:{
    position:'static',
    textAlign:'center',
    backgroundColor: '#3b3b3b',
    color:'#fff',
    padding:15,
    marginTop:10,
    // fontWeight:'bolder'
  },
  section:{
    marginTop: 10,
    marginBottom: 10,
  },
  pname:{
    fontWeight:'bolder',
    fontSize:'1.5rem'
  },
  form:{
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  navbarButton:{
    color: '#fff',
    textTransform: 'initial',
  },
  transparentBackgroud: {
    backgroundColor: 'transparent',
  },
  error: {
    color: '#f04040',
  },
  fullWidth:{
    width:'100%',
  },
  productHeight:{
    maxHeight: '80em'
  },
  reviewForm: {
    maxWidth: 800,
    width: '100%',
  },
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  
  menuButton: { padding: 0 },
  mt1: { marginTop: '1rem' },
  // search
  searchSection: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  searchForm: {
    border: '1px solid #ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  searchInput: {
    paddingLeft: 5,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  iconButton: {
    backgroundColor: '#f8c040',
    padding: 5,
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
  },
  sort: {
    marginRight: 5,
  },
}));

export default useStyles;