 class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.ctx.strokeStyle = '#FF7315';
        this.ctx.lineWidth = 3;
        this.draw = false;
        this.mousePosition = {
            x: 0,
            y: 0
        };
        this.lastPosition = this.mousePosition;
        this.clearButton = document.getElementById("clear");
        this.canvas.width = 200;
        this.canvas.height = 150;
    }
    canvasEvents() {
        sessionStorage.setItem('canvas', 'vide');
        this.canvas.addEventListener("mousedown", (e) => {
            this.draw = true;
            this.lastPosition = this.getMousePosition(e);
            sessionStorage.setItem('canvas', 'remplis');
        });

        this.canvas.addEventListener("mousemove", (e) => {
            this.mousePosition = this.getMousePosition(e);
            this.canvasResult();
        });

        this.canvas.addEventListener("mouseup", (e) => {
             this.draw = false;
         });
       this.canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
        });

        this.canvas.addEventListener("touchend", (e) => {
            e.preventDefault();
        });

       this.canvas.addEventListener("touchmove", (e) => {
            e.preventDefault();
        });
        this.canvas.addEventListener("touchstart", (e) => {
            this.draw = true;
            this.mousePosition = this.getTouchPosition(e);
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener("touchmove", (e) => {
            let touch = e.touches[0];
            let mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            this.canvas.dispatchEvent(mouseEvent);
        });

        this.canvas.addEventListener("touchend", (e) => {
            this.draw = false;
            let mouseEvent = new MouseEvent("mouseup", {});
            this.canvas.dispatchEvent(mouseEvent);
        });
        this.clearButton.addEventListener("click", (e) => {
            this.draw = false;
            this.clearCanvas()
            sessionStorage.setItem('canvas', 'vide');
        });
    } 
    getMousePosition(mouseEvent) {
        if (this.draw) {
            let oRect = this.canvas.getBoundingClientRect();
            return {
                x: mouseEvent.clientX - oRect.left,
                y: mouseEvent.clientY - oRect.top
            };
        }
    }
    getTouchPosition(touchEvent) {
        let oRect = this.canvas.getBoundingClientRect();
        return {
            x: touchEvent.touches[0].clientX - oRect.left,
            y: touchEvent.touches[0].clientY - oRect.top
        };
    }
    canvasResult() {
        if (this.draw) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastPosition.x, this.lastPosition.y);
            this.ctx.lineTo(this.mousePosition.x, this.mousePosition.y);
            this.ctx.stroke();
            this.lastPosition = this.mousePosition;
        }
    }
    clearCanvas() {
        this.canvas.width = this.canvas.width;
        sessionStorage.setItem('canvas', 'vide');
    }

}
