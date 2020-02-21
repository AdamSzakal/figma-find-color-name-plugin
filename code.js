// get selected node
const node = figma.currentPage.selection[0];
// get r, g, b values -> convert to hex -> concat to single string
const r_val = Math.floor(node.fills[0].color.r * 255);
const g_val = Math.floor(node.fills[0].color.g * 255);
const b_val = Math.floor(node.fills[0].color.b * 255);
const hex_val = r_val.toString(16) + g_val.toString(16) + b_val.toString(16);
// run ui.html and send it the hex code for the requested color
figma.showUI(__html__, { visible: false });
figma.ui.postMessage(hex_val);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    //set nodes layer name to color name recieved through msg
    node.name = msg;
    //TODO: show toaster, by sending a message of a certain type
    figma.closePlugin();
};
