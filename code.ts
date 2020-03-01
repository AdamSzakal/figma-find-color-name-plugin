// get selected node
const selection = figma.currentPage.selection;
const to_request = [];

function toHex(decimal_val) {
  let base256_val = Math.round(decimal_val * 255);
  let hex_val = base256_val.toString(16);
  if (base256_val < 11) {
    return '0' + hex_val;
  } else {
    return hex_val;
  }
}

for (let [key, value] of Object.entries(selection)) {
  let node = selection[key];

  // get r, g, b values from fill -> convert to hex -> concat to single string
  const r_val = toHex(node.fills[0].color.r);
  const g_val = toHex(node.fills[0].color.g);
  const b_val = toHex(node.fills[0].color.b);
  to_request.push(r_val + g_val + b_val);
}

// run ui.html and send it the hex code for the requested color
figma.showUI(__html__, {visible: false});
figma.ui.postMessage(to_request.join(','));

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  //set nodes layer name to color name recieved through msg
  // node.name = msg;
  for (let [key, value] of Object.entries(selection)) {
    let node = selection[key];
    node.name =
      msg.colors[key].name + ' / ' + msg.colors[key].requestedHex.toUpperCase();
  }
  figma.notify('🎨 Updated names for selected layers');
  figma.closePlugin();
};
