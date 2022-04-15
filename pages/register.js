import {Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import useStyles from '../utils/styles'
import Layout from './components/Layout'
import NextLink from 'next/link'
import axios from 'axios'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import jsCookie from 'js-cookie'
import {Controller, useForm} from 'react-hook-form'
import {useSnackbar } from 'notistack'
import { getError } from '../utils/error';

export default function Register() {
  const {handleSubmit, control, formState:{errors}} = useForm();
  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  const router = useRouter();
  const {redirect} = router.query;
  const {state, dispatch} = useContext(Store);
  const {userInfo} = state;
  useEffect(()=>{
    if(userInfo){
      router.push('/')
    }
  }, []);
  
  const classes = useStyles();
  const submitHandler = async ({name, email, password, confirmPassword}) => {
    closeSnackbar();
    if (password !== confirmPassword){
      enqueueSnackbar("Confirm password don't match", {variant:'error'} );
      return;
    }
    try{
      const {data} = await axios.post('/api/users/register', {name, email, password,});
      dispatch({type:'USER_LOGIN', payload: data});
      jsCookie.set('userInfo', data);
      router.push(redirect || '/')
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
    
  };
  return (
    <Layout title='Register'>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}> 
        <Typography component='h1' variant='h1'>Register</Typography>
        <List>
        <ListItem>
            <Controller 
              name='name'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:2,
              }}
              render={({field})=> (
                <TextField 
                  variant='outlined' 
                  fullWidth 
                  id='name' 
                  label='Name' 
                  inputProps={{type: 'text'}}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? (
                        errors.name.type === 'minLength' 
                        ? (
                            'Please enter user Name at least 2 charctor long'
                          ):(
                            'Name is required'
                            )
                      ):(
                          ''
                        )}
                  {...field}  
                ></TextField>
              )}></Controller>
          </ListItem>
          <ListItem>
            <Controller 
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                pattern:/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
              }}
              render={({field})=> (
                <TextField 
                  variant='outlined' 
                  fullWidth 
                  id='email' 
                  label='Email' 
                  inputProps={{type: 'email'}}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? (
                        errors.email.type === 'pattern' 
                        ? (
                            'You have entered Invalid Email ID'
                          ):(
                            'Enter your Email ID to register your account'
                            )
                      ):(
                          // 'This email ID is already registed with us. Please login or use different email to register your account with us'
                          ''
                        )}
                  {...field}  
                ></TextField>
              )}></Controller>
          </ListItem>

          <ListItem>
            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:6,
              }}
              render={({field})=>(
                <TextField 
                  variant='outlined' 
                  fullWidth
                  id='password' 
                  label='Password' 
                  inputProps={{type: 'password'}}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type==='minLength'
                        ? 'Password Length must be at least 6 charactors'
                        : 'Password is requierd'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
            
          </ListItem>

          <ListItem>
            <Controller
              name='confirmPassword'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:6,
              }}
              render={({field})=>(
                <TextField 
                  variant='outlined' 
                  fullWidth
                  id='confirmPassword' 
                  label='Confirm Password' 
                  inputProps={{type: 'password'}}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword
                      ? errors.confirmPassword.type==='minLength'
                        ? 'Confirm Password Length must be at least 6 charactors'
                        : 'Confirm Password is requierd'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>

          <ListItem>
            <Button variant='contained' type='submit' fullWidth color='primary'>Register</Button>
          </ListItem>

          <ListItem>
            Already have an account? {/*&nbsp is not working check it latter*/} <NextLink href={`/login?redirect=${redirect || '/'}`} passHref><Link>Login</Link></NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  )
}
