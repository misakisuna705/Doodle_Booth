function init(){canvas_init(),tool_init(),color_init(),toolspace.addEventListener("click",select_tool,!1),canvas.addEventListener("touchstart",o=>{set_canvas_data(),set_tool(o),o.preventDefault(),canvas.addEventListener("touchmove",()=>{draw_image(o),o.preventDefault()},!1)},!1),canvas.addEventListener("touchend",o=>{o.preventDefault(),canvas.removeEventListener("touchmove",()=>{draw_image(o),o.preventDefault()},!1)},!1),canvas.addEventListener("mousedown",()=>{set_canvas_data(),set_tool(event),canvas.addEventListener("mousemove",draw_image,!1)},!1),canvas.addEventListener("mouseup",()=>{canvas.removeEventListener("mousemove",draw_image,!1)},!1),color_picker.addEventListener("click",()=>{changeColor(event),"color_strip"==event.target.id&&fillGradient()},!1),color_block.addEventListener("mousedown",()=>{color_block.addEventListener("mousemove",changeColor,!1)},!1),color_block.addEventListener("mouseup",()=>{color_block.removeEventListener("mousemove",changeColor,!1)},!1)}function canvas_init(){canvas=document.getElementById("canvas"),canvas_context=canvas.getContext("2d"),canvas_data=[],canvas_count=-1}function tool_init(){toolspace=document.getElementById("toolspace")}function color_init(){color_picker=document.getElementById("color_picker"),color_block=document.getElementById("color_block"),color_strip=document.getElementById("color_strip"),color_label=document.getElementById("color_label"),color_block_context=color_block.getContext("2d"),color_strip_context=color_strip.getContext("2d"),color_x=0,color_y=0,color_data="rgba(255,0,0,1)",color_label.style.backgroundColor=color_data,color_block_context.rect(0,0,color_block.width,color_block.height),fillGradient(),color_strip_context.rect(0,0,color_strip.width,color_strip.height),grd1=color_strip_context.createLinearGradient(0,0,0,color_block.height),grd1.addColorStop(0,"rgba(255, 0, 0, 1)"),grd1.addColorStop(.17,"rgba(255, 255, 0, 1)"),grd1.addColorStop(.34,"rgba(0, 255, 0, 1)"),grd1.addColorStop(.51,"rgba(0, 255, 255, 1)"),grd1.addColorStop(.68,"rgba(0, 0, 255, 1)"),grd1.addColorStop(.85,"rgba(255, 0, 255, 1)"),grd1.addColorStop(1,"rgba(255, 0, 0, 1)"),color_strip_context.fillStyle=grd1,color_strip_context.fill()}window.addEventListener("DOMContentLoaded",init,!1);