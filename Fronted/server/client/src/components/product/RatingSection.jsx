import { Box, Typography, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function RatingSection({ productId }) {
const [ratings,setRatings]=useState([]);
const [score,setScore]=useState(5);
const [comment,setComment]=useState("");
const isAdmin=!!localStorage.getItem("token");

useEffect(()=>{
fetch(`http://localhost:5000/products/${productId}/ratings`)
.then(res=>res.json())
.then(data=>{
if(Array.isArray(data)){setRatings(data);}else{setRatings([]);}
})
.catch(()=>setRatings([]));
},[productId]);

const submitRating=()=>{
fetch(`http://localhost:5000/products/${productId}/ratings`,{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({score,user_id:1,comment:comment||null})
})
.then(res=>res.json())
.then(newRating=>{
if(!newRating)return;
setRatings(prev=>[...prev,newRating]);
setScore(5);
setComment("");
})
.catch(err=>console.error(err));
};

const deleteRating=(ratingId)=>{
fetch(`http://localhost:5000/products/${productId}/ratings/${ratingId}`,{
method:"DELETE",
headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
})
.then(()=>{
setRatings(prev=>prev.filter(r=>r.rating_id!==ratingId));
})
.catch(err=>console.error(err));
};

const avg=ratings.length>0?(ratings.reduce((sum,r)=>sum+Number(r?.score||0),0)/ratings.length).toFixed(1):0;

return (
<Box sx={{mt:6,p:3,borderRadius:2,backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(6px)"}}>

<Typography variant="h5" sx={{color:"white",mb:2}}>
Betyg
</Typography>

<Typography sx={{color:"white",mb:3}}>
Snittbetyg: ⭐ {avg}
</Typography>

{ratings?.filter(Boolean).map(r=>(
<Box key={r.rating_id} sx={{mb:2,p:2,backgroundColor:"rgba(255,255,255,0.08)",borderRadius:2}}>
<Typography sx={{color:"white"}}>
{"⭐".repeat(r?.score||0)}
</Typography>

{r?.comment&&(
<Typography sx={{color:"#ddd"}}>
{r.comment}
</Typography>
)}

{r?.user&&(
<Typography sx={{color:"#aaa",fontSize:"0.8rem"}}>
{r.user.first_name} {r.user.last_name}
</Typography>
)}

{isAdmin&&(
<Button size="small" color="error" sx={{mt:1}} onClick={()=>deleteRating(r.rating_id)}>
Ta bort
</Button>
)}
</Box>
))}

{/* Lämna betyg */}
<Box sx={{mt:4}}>
<Typography sx={{color:"white",mb:1}}>
Lämna betyg
</Typography>

{/* 🔥 NY: snygg + / - istället för number input */}
<Box sx={{display:"flex",alignItems:"center",gap:2,mb:2}}>
<Button
variant="contained"
onClick={()=>setScore(prev=>Math.max(1,prev-1))}
sx={{minWidth:40}}>
-
</Button>

<Typography sx={{color:"white",fontSize:"1.5rem",fontWeight:"bold",minWidth:30,textAlign:"center"}}>
{score}
</Typography>

<Button
variant="contained"
onClick={()=>setScore(prev=>Math.min(5,prev+1))}
sx={{minWidth:40}}>
+
</Button>
</Box>

<TextField
fullWidth
label="Kommentar"
value={comment}
onChange={(e)=>setComment(e.target.value)}
sx={{
mb:2,
input:{color:"white"},
label:{color:"white"},
"& .MuiOutlinedInput-root":{
backgroundColor:"rgba(255,255,255,0.08)",
"& fieldset":{borderColor:"rgba(255,255,255,0.4)"},
"&:hover fieldset":{borderColor:"white"},
"&.Mui-focused fieldset":{borderColor:"white"}
}
}}
/>

<Button
variant="contained"
sx={{
mb:2,
px:3,
py:1.2,
borderRadius:2,
fontWeight:"bold",
background:"linear-gradient(135deg,#1976d2,#42a5f5)",
boxShadow:"0 4px 20px rgba(25,118,210,0.4)",
textTransform:"none",
"&:hover":{
background:"linear-gradient(135deg,#1565c0,#1e88e5)",
boxShadow:"0 6px 25px rgba(25,118,210,0.6)",
transform:"translateY(-1px)"
}
}}
onClick={submitRating}>
Skicka betyg
</Button>
</Box>
</Box>
);
}