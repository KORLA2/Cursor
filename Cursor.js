let can = document.getElementById('can');
let ctx = can.getContext('2d');
can.height = 500;
can.width = window.innerWidth
let x1, y1;

// ctx.globalCompositeOperation = "source-atop"
window.addEventListener('mousemove', (e) => {
    h = Math.random() * 360;
    x1 = e.x, y1 = e.y;

})
class part {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5
        this.prx = this.x;
        this.pry = this.y;

    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgb(58, 220, 226)"
        ctx.stroke()
        ctx.fill();
        // ctx.closePath()
        ctx.beginPath();
        ctx.arc(this.x - 1, this.y - 1, 2, 0, Math.PI * 2);
        ctx.arc(this.x + 3, this.y + 3, 2, 0, Math.PI * 2);
        // ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.fill();

    }

    update() {

        let dist = Math.sqrt((this.x - x1) * (this.x - x1) + (this.y - y1) * (this.y - y1));
        if (dist < 100) {
            this.x += this.x - x1;
            this.y += this.y - y1;

        } else {
            let dx = this.x - this.prx;
            let dy = this.y - this.pry;
            this.x -= dx / 20;
            this.y -= dy / 20;
        }
    }
}
let clicked=()=>{
let input = document.querySelector("input").value;
ctx.clearRect(0, 0, can.width, can.height);

ctx.font = "20px times"

ctx.fillText(input,0,20);

let f = (ctx.getImageData(0, 0,(can.width), 500));
let parti = [];
for (let i = 0; i < f.height; ++i) {
    for (let j = 0; j < f.width; ++j) {
        if (f.data[i * 4 * f.width + j * 4 + 3] > 128)
            parti.push(new part(j * 10, i * 10))

    }

}

let h=0;


function ani() {
    ctx.clearRect(0, 0, can.width, 500)
    for (let i = 0; i < parti.length; ++i) {
        parti[i].draw();
        parti[i].update();


    }
    con();
    requestAnimationFrame(ani)
}
ani()


function con() {


         
    
    for (let i = 0; i < parti.length; ++i) {
h+=.1
        for (let j = 0; j < parti.length; ++j) {
            let dist = Math.sqrt((parti[i].x - parti[j].x) * (parti[i].x - parti[j].x) + (parti[i].y - parti[j].y) * (parti[i].y - parti[j].y));

            if (dist <50) {
              ctx.beginPath();
              ctx.moveTo(parti[i].x, parti[i].y);
              ctx.lineTo(parti[j].x, parti[j].y);
              ctx.strokeStyle = `hsl(${h},100%,50%)`;
              ctx.stroke();

              ctx.closePath()
            }
        }

    }
}
}