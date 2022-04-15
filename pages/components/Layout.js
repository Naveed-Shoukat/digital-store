import React, { Children, useContext, useState } from 'react';
import Head from 'next/head';
import { AppBar, Badge, Button, Container, createTheme, CssBaseline, Link, Menu, MenuItem, Switch, ThemeProvider, Toolbar, Typography, Box, IconButton, Drawer, List, ListItem, Divider, ListItemText,  InputBase, } from '@material-ui/core';
import useStyles from '../../utils/styles';
import NextLink from 'next/link';
import { Store } from '../../utils/Store';
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router';
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';
import { getError} from '../../utils/error'
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function Layout({title, description, children}) {
  const router = useRouter();
  const {state, dispatch} = useContext(Store);
  const {darkMode, cart, userInfo} = state;
   
  const theme = createTheme({
    typography:{
      h1:{
        fontSize:'1.75rem',
        fontWeight:500,
        margin:'1rem 0'
      },
      h2:{
        fontSize:'1.45rem',
        fontWeight:400,
        margin:'1rem 0'
      },
    },
    palette:{
      type: darkMode ? 'dark' : 'light',
      primary:{
        main:'#f0c000'
      },
      secondary:{
        main:'#208080',
      },
    },
  })
  const classes = useStyles();
  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  const darkModeChangeHandler = () => {
    dispatch({type:darkMode?'DARK_MODE_OFF':'DARK_MODE_ON'});
    const newDarkMode = !darkMode;
    jsCookie.set('darkMode', newDarkMode?'ON':'OFF');
    
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget)
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = ()=> {
    setAnchorEl(null);
    dispatch({type:'USER_LOGOUT'});
    jsCookie.remove('userInfo');
    jsCookie.remove('cartItems');
    jsCookie.remove('shippinhAddress');
    jsCookie.remove('paymentMethod');
    router.push('/')
  };
  return (
    <div>
      <Head>
        
          <meta name="author" content="Designed and Created by Naveed Shoukat"></meta>
          <title>{title? `${title} - Digital Shop`: `Digital Shop`}</title>
          {description && <meta name='description' content={description} ></meta>}
        </Head>
          <ThemeProvider theme={theme}>
            <CssBaseline></CssBaseline>
          <AppBar position="static" className={classes.navbar}>
            
              <Toolbar className={classes.toolbar}>
            <Box display="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                className={classes.menuButton}
              >
                <MenuIcon className={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>Digital Store</Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Shopping by category</Typography>
                    <IconButton
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>

            <div className={classes.searchSection}>
              <form onSubmit={submitHandler} className={classes.searchForm}>
                <InputBase
                  name="query"
                  className={classes.searchInput}
                  placeholder="Search products"
                  onChange={queryChangeHandler}
                />
                <IconButton
                  type="submit"
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </div>
              <div>
                
                <Switch  checked={darkMode} onChange={darkModeChangeHandler} ></Switch>
                <NextLink href="/cart" passHref>
                  <Link>
                  <Typography component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        color="secondary"
                        badgeContent={cart.cartItems.length}
                      >
                        Cart
                      </Badge>
                    ) : (
                      'Cart'
                    )}
                  </Typography>
                  </Link>
                </NextLink>
                {
                  userInfo ? (
                  <>
                  <Button 
                    aria-controls='simple-menu' 
                    aria-haspopup='true' 
                    onClick={loginClickHandler}  
                    className={classes.navbarButton}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu 
                    id='simple-menu' 
                    anchorEl={anchorEl} 
                    keepMounted 
                    open={Boolean(anchorEl)} 
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/profile')}>Profile</MenuItem>
                    <MenuItem onClick={(e) => loginMenuCloseHandler(e, '/order-history') }>Order Hisotry</MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                  </>
                  ):(
                  <NextLink href="/login" passHref>
                    <Link><Typography component="span">Login</Typography></Link>
                  </NextLink>
                  )
                }
                
              </div>
            </Toolbar>
          </AppBar>
          <Container className={classes.main}> 
            {children}
          </Container>
          <footer className={classes.footor}>
            <Typography>Page footer contents comes here...</Typography>
            
          </footer>
        </ThemeProvider>
    </div>
  )
}
