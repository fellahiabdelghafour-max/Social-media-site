'use server'
import { Box, Button, Card, Grid, Skeleton, Typography } from "@mui/material";
// import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
export default async function Blog() {
    const token=await getToken();
  if(!token){
    return redirect('/auth/sign-up')
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      <Box  sx={{width:'100%',bgcolor:'background.default',minHeight:'100vh'}}>
         <Typography color="primary" variant="h3" sx={{textAlign:'center',fontWeight:700}}>Our Blog</Typography>
      <Typography  color="textDisabled" sx={{ textAlign:'center',mb: 4 }}>
        Insights, thoughts, and trends from our team.
      </Typography>
                  <Suspense fallback={<PostsLoading/>}>
                      <PostsList/>
                  </Suspense>
                    
 
      </Box>

    </div>
  );
}


 async function PostsList(){
      let Posts;
      try{
         Posts= await fetchQuery(api.posts.getPosts) 
            if (!Posts)throw new Error('Failed to fetch data please try again')
      }
      catch(error){
        console.log(error)
         return (<Box sx={{display:'flex',alignItems:'center',justifyContent:'center',height:'30vh'}}>
               <Typography color="error" variant="h3">Failed to fetch data please try again</Typography>
          </Box>)
      }


          return(    <Grid container sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                  
          {(Posts?.map( ( post)=>{
            return(<Grid size={{xs:12,sm:12,md:4,lg:3}} key={ post._id} sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Card sx={{borderRadius: '16px',p:1,m:1,width:{xs:'300px',sm:'400px'}}}>
                    <Box sx={{ position: 'relative', height: 200}}>
                                    <Image
                          src={ post.image? post.image : 'https://cdn-icons-png.flaticon.com/128/8346/8346099.png'}
                          alt="mountain"
                          fill
                           loading="eager"
                          style={{ objectFit: 'cover', borderRadius: '16px' }}
                        />
                    </Box>

            <Link href={`/blog/${ post._id}`} >
              <Box  sx={{height:'40px',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                fontSize:'25px',
                fontWeight:400,
                
                ':hover':{color:'#0e00aa',fontSize:'30px',transition:'0.2s'}}}>
                {post.title}
              </Box>
            </Link>
              <Typography
            variant="subtitle1"
              component="p"
              color='textDisabled'
              sx={{whiteSpace:'wrap',mb:2}}
              >
                { post.body}
              </Typography>
              <Link href={`/blog/${ post._id}`}>
              <Button color="primary" variant="contained" fullWidth>
                  Read more
              </Button>     
              </Link>
                  </Card>
                  </Grid>)}))}
         
          </Grid> 
 
    )
    
 }

 async function PostsLoading(){

  return(
    <Grid container sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
      {[...Array(6)].map((_,i)=><Grid key={i} size={{xs:12,sm:12,md:4,lg:3}}>
        <Card sx={{borderRadius: '16px',p:1,m:1,}}>
            <Skeleton variant="rounded" width={'100%'} height={200} sx={{mb:2,borderRadius:'16px'}}/>
            <Skeleton variant="rounded" width={'100%'} height={10}  sx={{mb:2,borderRadius:'16px'}}/>
            <Skeleton variant="rounded" width={'100%'} height={10}  sx={{mb:2,borderRadius:'16px'}}/>
            <Skeleton variant="rounded" width={'100%'} height={40}  sx={{mb:2,borderRadius:'16px'}}/>
            </Card>
        </Grid>
            )
        }
            </Grid>
    

  )
 }

 
