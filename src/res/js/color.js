let color_picker;
let color_block;
let color_block_context;
let color_strip;
let color_strip_context;
let color_label;
let color_rgb;
let color_data;
let color_x;
let color_y;

let grd1;

function changeColor(event) {
  color_x = event.offsetX;
  color_y = event.offsetY;

  switch (event.target.id) {
    case "color_block":
      color_rgb = color_block_context.getImageData(color_x, color_y, 1, 1).data;
      break;
    case "color_strip":
      color_rgb = color_strip_context.getImageData(color_x, color_y, 1, 1).data;
      break;
  }

  color_data = "rgba(" + color_rgb[0] + "," + color_rgb[1] + "," + color_rgb[2] + ",1)";

  color_label.style.backgroundColor = color_data;
}

function fillGradient() {
  color_block_context.fillStyle = color_data;
  color_block_context.fillRect(0, 0, color_block.width, color_block.height);

  var grdWhite = color_strip_context.createLinearGradient(0, 0, color_block.width, 0);
  grdWhite.addColorStop(0, "rgba(255,255,255,1)");
  grdWhite.addColorStop(1, "rgba(255,255,255,0)");
  color_block_context.fillStyle = grdWhite;
  color_block_context.fillRect(0, 0, color_block.width, color_block.height);

  var grdBlack = color_strip_context.createLinearGradient(0, 0, 0, color_block.height);
  grdBlack.addColorStop(0, "rgba(0,0,0,0)");
  grdBlack.addColorStop(1, "rgba(0,0,0,1)");
  color_block_context.fillStyle = grdBlack;
  color_block_context.fillRect(0, 0, color_block.width, color_block.height);
}
