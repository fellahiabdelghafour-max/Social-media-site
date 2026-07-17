"use client";

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { searchResults } from '../../../convex/posts';
import { Card, ClickAwayListener, Typography } from '@mui/material';
import Link from 'next/link';
import CircularIndeterminate from '../loading/loading';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:'gray',
  '&:hover': {
    backgroundColor: '#373737',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


export default function PrimarySearchAppBar() {
   const [Term,setTerm]=React.useState('');
   const [open,setOpen]=React.useState(false);

   const posts:Array<searchResults>|undefined = useQuery(
     api.posts.searchPosts,
     Term.length >= 2 ? { term: Term, limit: 5 } : 'skip'
   );

   function handleSearch(term:string){   
       setTerm(term);
   }
  return (
    <Box sx={{ flexGrow: 1 }}>
        <ClickAwayListener
          onClickAway={()=>{setOpen(false)}}>

         <Box>
         <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
             value={Term}
              onChange={(event)=>handleSearch(event.target.value)}
              onClick={() => setOpen(true)}
              
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />

          </Search>   
            <Box sx={{display:open? '':'none',p:'5px',m:2,position:'absolute',backgroundColor:'#212121',borderRadius:'10px'    }}>
               {

                        Term.length<=2
                        ?null
                        : posts===undefined
                        ? <Box sx={{
                                width:'400px',
                                height:'60px',
                                display:'flex',
                                alignItems:'center',
                                justifyContent:'center',
                                }}>
                            <CircularIndeterminate/>
                        </Box>
                        :posts?.length===0
                         ?<Typography
                            sx={{
                                p:1,
                                bgcolor:'#373737',
                                borderRadius:'10px',
                            }}>
                            No results found
                            </Typography>

                            :posts?.map((post)=>{

                            return(
                                <Card key={post._id} sx={{
                                    p:1,
                                    border:'solid black 1px',
                                }}>
                                       <Link href={`/blog/${post._id}`} onClick={()=>{setOpen(false)}}>
                                          <Typography
                                            sx={{
                                                fontSize:'20px',
                                                fontWeight:'700'
                                            }}>
                                              {post.title}
                                          </Typography>
                                          <Typography
                                             color='textDisabled'>
                                              {post.body}
                                          </Typography>
                                       </Link>
                                </Card>
                            )
                        })
                       

               }
            </Box>
            </Box>  
                  
        </ClickAwayListener>


    </Box>
  );
}
