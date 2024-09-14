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

    for (var i=0; i<state.sections.length; i++) {
        ctx.fillStyle = state.fgcolor;
        ctx.beginPath();
        var x = 10+60*i;
        var y = 80;
        while (x > canvas.width) {
            x -= canvas.width;
            y += 80;
        }
        ctx.roundRect(x, y, 50, 50, 5);
        ctx.fill();

        if (map_location == i) {
            ctx.beginPath();
            x += 25;
            y -= 10;
            ctx.moveTo(x, y);
            ctx.lineTo(x-20, y-20);
            ctx.lineTo(x+20, y-20);
            ctx.lineTo(x, y);
            ctx.fill();
        }
    }
}
