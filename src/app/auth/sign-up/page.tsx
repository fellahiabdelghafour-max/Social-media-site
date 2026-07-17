/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { authClient } from "@/lib/auth-client";
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Button, Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { useId, useState, useTransition } from "react";
import { useToastContext } from "@/context/toastContext/toastContext";
import CustomizedSnackbars from '@/components/toast/toast'
import { redirect, useRouter } from "next/navigation";
interface user{
    name:string,
    password:string,
    email:string
}
export default function SignUp(){

    const toast=useToastContext()
    if (!toast) return null
    const {handleClick,handleError,handleStatus}=toast;

    const [user, setUser]= useState<user>({
        name:'',
        password:'',
        email:''
    })
    const route=useRouter();
      // -i- password Items -i-
    const outlinedPasswordId = useId();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
    // -o- password Items -o-
   
    const [isPending, startTransition] = useTransition();
    async function handleSubmit(){
       startTransition(async()=>{
            const {error} =await authClient.signUp.email({
            email:user.email,
            name:user.name,
            password:user.password
        })
                if(error){
                    
                    handleError(error.message || '')
                    handleStatus('error')
                }
        else {
            handleError('Success SIGN IN ')
            handleStatus('success')
            route.push('/')
        }
        handleClick();        
       })    
      
    }
    return(
        <Card sx={{display:'flex',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:'10px',
        height:'70vh',
        bgcolor:'background.paper',
        p:10,width:'70%',
        flexDirection:'column',
        gap:'15px'
        }}>
            <CustomizedSnackbars/>
              <form>
                <TextField value={user.name}
                            fullWidth
                             sx={{m:2}} 
                             label='full name'
                              placeholder="write your full name"
                              onChange={(event)=>{
                                 setUser({...user,name:event.target.value})
                 }}/>


                <FormControl sx={{
                     m: 1,
                      width: '25ch',
                      minWidth:'100%',
                      ml:2}} 
                variant="outlined"
                >
                        <InputLabel htmlFor={`${outlinedPasswordId}-input`} >Password</InputLabel>
                        <OutlinedInput
                            value={user.password}
                            onChange={(event)=>
                            {
                                setUser({...user,password:event.target.value})
                            }
                            }
                            id={`${outlinedPasswordId}-input`}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end"   >
                                <IconButton
                                aria-label={
                                    showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                </FormControl>
               
                <TextField 
                        value={user.email}
                        fullWidth 
                        sx={{m:2}} 
                        label='email' 
                        placeholder="write your email"
                        onChange={(event)=>{
                            setUser({...user,email:event.target.value})
                        }}
                        />
                <Button variant="contained" onClick={handleSubmit} loading={isPending} loadingPosition="start">Sign UP</Button>

              </form>     
                 <Typography 
                 onClick={()=>redirect('/auth/login')}
                    sx={{
                      color:'#0044ff',
                      textShadow:'5px 5px 10px #008cff' ,
                      transition:'0.5s',
                      ':hover':{
                        color:'#0044ff91',
                         textShadow: "6px 6px 13px #008cff",
                        transform:'translate(20px)',
                        cursor:"pointer"
                        
                      }          
                    }}>
                     Do you have an account?
                    </Typography>           

               
        </Card>
    )
}