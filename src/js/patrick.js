const STATE_UNINIT = 1;
const STATE_MAP = 2;
const STATE_PLAY = 3;
var patrick_state = STATE_UNINIT;
var map_location = 0;

function patrick_redraw_uninit() {
    ctx.fillStyle = state.bgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = state.fgcolor;
    ctx.font = "50px serif";
    ctx.fillText("No game data loaded", 50, 50);
}

function patrick_redraw_map() {
    ctx.fillStyle = state.bgcolor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Sizes of things.
    // Base them on the minimum of the canvas width/height so that they scale appropriately.
    const w = Math.min(canvas.width, canvas.height)*0.15;
    const h = w;
    const visual_w = w*0.8;
    const visual_h = w*0.8;
    const round = w*0.15;
    const ss = w*0.4;

    // Determine camera offset based around the cursor selection
    var camera_x_offset = canvas.width/2  - state.map_nodes[map_location].x * w;
    var camera_y_offset = canvas.height/2 - state.map_nodes[map_location].y * h;

    // Draw everyone (at camera offset)
    for (var i=0; i<state.map_nodes.length; i++) {
        var node = state.map_nodes[i];
        var x = node.x * w + camera_x_offset;
        var y = node.y * h + camera_y_offset;

        ctx.fillStyle = state.fgcolor;
        ctx.beginPath();
        ctx.roundRect(x-visual_w/2, y-visual_h/2, visual_w, visual_h, round);
        ctx.fill();

        // Draw selector
        if (map_location == i) {
            ctx.beginPath();
            ctx.moveTo(x,    y-visual_h/2);
            ctx.lineTo(x-ss, y-visual_h/2-ss);
            ctx.lineTo(x+ss, y-visual_h/2-ss);
            ctx.lineTo(x,    y-visual_h/2);
            ctx.fill();
        }

        // Draw solved indicator
		const solved = (solvedSections.indexOf(state.sections[i].name) >= 0);
        if (solved) {
            ctx.fillStyle = "lime";
            ctx.beginPath();
            ctx.arc(x, y, visual_w*0.25, 0, 2*Math.PI);
            ctx.fill();
        }
    }
}
