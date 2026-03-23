import { Box } from "@mui/material";
export default function BackgroundVideo() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: -1,           // Ligger bakom allt
        pointerEvents: "none" // Blockerar INTE klick
      }}>
      <video
        autoPlay loop muted playsInline
        style={{width: "100%", height: "100%", objectFit: "cover"}}>
        <source src="/gitarrvideo.mp4" type="video/mp4"/>
      </video>
    </Box>
  );
}