import { Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function Home() {
const [showButtons,setShowButtons]=useState(false);

return (
<Box sx={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",position:"relative",color:"white",px:2}}>
<Box sx={{position:"relative",zIndex:2,width:"100%"}}>
<Typography variant="h2" sx={{fontWeight:700,letterSpacing:3,mb:2,textShadow:"0 5px 30px rgba(0,0,0,0.8)",fontSize:{xs:"2rem",sm:"2.8rem",md:"3.5rem"}}}>
VÄLKOMMEN TILL GITARRSHOPPEN
</Typography>
<Typography variant="h6" sx={{mb:4,opacity:0.9,fontSize:{xs:"1rem",sm:"2.2rem"}}}>
Hitta din nästa gitarr idag!
</Typography>
<Button variant="contained" size="large" onClick={()=>setShowButtons(!showButtons)} sx={{backgroundColor:"#8c2220",px:{xs:3,sm:5},py:{xs:1.5,sm:2.5},fontSize:{xs:"1.2rem",sm:"1.6rem",md:"2rem"},fontWeight:"bold","&:hover":{backgroundColor:"#c62828"}}}>
Shoppa nu
</Button>
{showButtons&&(
<Box sx={{mt:3,display:"grid",gridTemplateColumns:{xs:"1fr",sm:"1fr 1fr",md:"1fr 1fr 1fr"},gap:2,width:"100%",maxWidth:"700px",mx:"auto",justifyItems:"center"}}>
<Button component={Link} to="/products/acoustic" variant="contained" sx={{backgroundColor:"rgba(122,22,22,0.9)",px:3,py:1.5,fontSize:"1.5rem",width:"100%",maxWidth:"250px"}}>
Akustiska Gitarrer
</Button>
<Button component={Link} to="products/all" variant="contained" sx={{backgroundColor:"rgba(122,22,22,0.9)",px:3,py:1.5,fontSize:"1.5rem",width:"100%",maxWidth:"250px"}}>
Alla Gitarrer
</Button>
<Button component={Link} to="/products/electric" variant="contained" sx={{backgroundColor:"rgba(122,22,22,0.9)",px:3,py:1.5,fontSize:"1.5rem",width:"100%",maxWidth:"250px"}}>
Elgitarrer
</Button>
</Box>
)}
</Box>
</Box>
);
}