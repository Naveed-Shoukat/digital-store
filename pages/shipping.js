import {Button, Link, List, ListItem, TextField, Typography } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import useStyles from '../utils/styles'
import Layout from '../components/Layout'
import NextLink from 'next/link'
import { Store } from '../utils/Store'
import { useRouter } from 'next/router'
import jsCookie from 'js-cookie'
import {Controller, useForm} from 'react-hook-form'
import CheckoutWizard from '../components/CheckoutWizard'
export default function Shipping() {
  const {
    handleSubmit, 
    control, 
    formState:{errors},
    setValue,
  } = useForm();

  const router = useRouter();
  const {redirect} = router.query;
  const {state, dispatch} = useContext(Store);
  const {userInfo, cart:{shippingAddress}} = state;
  useEffect(()=>{
    if(!userInfo){
      router.push('/login?redirect=/shipping')
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
    setValue('phoneNumber', shippingAddress.phoneNumber);
  }, []);
  
  const classes = useStyles();
  const submitHandler = ({fullName, address, city, postalCode, country, phoneNumber}) => {
    dispatch({type:'SAVE_SHIPPING_ADDRESS', payload: {fullName, address, city, postalCode, country, phoneNumber}});
    jsCookie.set('shippingAddress', {fullName, address, city, postalCode, country, phoneNumber});
    router.push('/payment')
  };
  return (
    <Layout title='Shipping Address'>
      <CheckoutWizard activeStep={1}></CheckoutWizard>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}> 
        <Typography component='h1' variant='h1'>Shipping Address</Typography>
        <List>
        <ListItem>
            <Controller 
              name='fullName'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:6,
              }}
              render={({field})=> (
                <TextField 
                  variant='outlined' 
                  fullWidth 
                  id='fullName' 
                  label='Full Name' 
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? (
                        errors.fullName.type === 'minLength' 
                        ? (
                            'Please enter your Full Name at least 6 charctor long'
                          ):(
                            'Full Name is required'
                            )
                      ):(
                          ''
                        )}
                  {...field}  
                ></TextField>
              )}></Controller>
          </ListItem>

           {/*Address*/}
           <ListItem>
            <Controller 
              name='address'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:20,
              }}
              render={({field})=> (
                <TextField 
                  variant='outlined' 
                  fullWidth 
                  id='address' 
                  label='Complete Address, at least write Street, Building & Appartment Number' 
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? (
                        errors.address.type === 'minLength' 
                        ? (
                            'Please enter your Complete Address'
                          ):(
                            'Complete Address is required'
                            )
                      ):(
                          ''
                        )}
                  {...field}  
                ></TextField>
              )}></Controller>
          </ListItem>

           {/*City*/}
           <ListItem>
            <Controller 
              name='city'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:3,
              }}
              render={({field})=> (
                <TextField 
                  variant='outlined' 
                  fullWidth 
                  id='city' 
                  label='City Name' 
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? (
                        errors.city.type === 'minLength' 
                        ? (
                            'Please enter your City Name at least 3 charctor long'
                          ):(
                            'City Name is required'
                            )
                      ):(
                          ''
                        )}
                  {...field}  
                ></TextField>
              )}></Controller>
          </ListItem>

           {/*PostalCode*/}
           <ListItem>
            <Controller 
              name='postalCode'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:7,
              }}
              render={({field})=> (
                <TextField 
                  variant='outlined' 
                  fullWidth 
                  id='postalCode' 
                  label='Postal Code' 
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? (
                        errors.postalCode.type === 'minLength' 
                        ? (
                            'Please enter Postel Code at least 7 charctor long'
                          ):(
                            'Postal Code is required'
                            )
                      ):(
                          ''
                        )}
                  {...field}  
                ></TextField>
              )}></Controller>
          </ListItem>

           {/*Country*/}
           <ListItem>
            <Controller 
              name='country'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:6,
              }}
              render={({field})=> (
                <TextField 
                  variant='outlined' 
                  fullWidth 
                  id='country' 
                  label='Country Name' 
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? (
                        errors.country.type === 'minLength' 
                        ? (
                            'Please enter Country Name at least 6 charctor long'
                          ):(
                            'Country Name is required'
                            )
                      ):(
                          ''
                        )}
                  {...field}  
                ></TextField>
              )}></Controller>
          </ListItem>

           {/*PhoneNumber*/}
           <ListItem>
            <Controller 
              name='phoneNumber'
              control={control}
              defaultValue=''
              rules={{
                required:true,
                minLength:12,
              }}
              render={({field})=> (
                <TextField 
                  variant='outlined' 
                  fullWidth 
                  id='phoneNumber' 
                  label='Phone Number' 
                  error={Boolean(errors.phoneNumber)}
                  helperText={
                    errors.phoneNumber
                      ? (
                        errors.phoneNumber.type === 'minLength' 
                        ? (
                            'Please enter your Phone Number with country code at least 12 charctor long'
                          ):(
                            'Phone Number is required'
                            )
                      ):(
                          ''
                        )}
                  {...field}  
                ></TextField>
              )}></Controller>
          </ListItem>
          {/*Continue Button*/}
          <ListItem>
            <Button variant='contained' type='submit' fullWidth color='primary'>Continue - Payment</Button>
          </ListItem>

          
        </List>
      </form>
    </Layout>
  )
}
