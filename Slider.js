class Slider{
    constructor(){
       this.next = document.getElementById('next');
       this.previous = document.getElementById('prev');
       this.pause = document.getElementById('pause'); 
       this.play = document.getElementById('play');
       this.slideIndex = 0;
       this.slide = document.getElementsByClassName("slide");
       this.status = "stop";
    }
    
    slideNext() {
       let i;
       for(i = 0; i < this.slide.length; i++){
          this.slide[i].style.display = "none";
       }
       this.slideIndex++;
       if (this.slideIndex > this.slide.length){this.slideIndex = 1}
       this.slide[this.slideIndex-1].style.display = "block";
    }
    
    slideRun(){
        this.play.style.display = 'none';
        this.pause.style.display = 'block';
        this.interval = setInterval(this.slideNext.bind(this), 5000);
        this.status = "play";
    }
    
    slidePrev(){
        let i;
        for(i = 0; i < this.slide.length; i++){
        this.slide[i].style.display =  "none";
        }
        this.slideIndex--;
        if (this.slideIndex < 1) {
            this.slideIndex = this.slide.length
        }
        this.slide[this.slideIndex-1].style.display = "block";
    }
    slideStop(){
        this.play.style.display = 'block';
        this.pause.style.display = 'none';
        clearInterval(this.interval);
        this.status = "stop";
    }
    
    slideKeyboard(event){ 
        switch(event.code){
            case "ArrowRight":
                this.slideNext();
                break;
            case "ArrowLeft":
                this.slidePrev();
                break;
            case "Space":
                if(this.status == "stop"){
                   this.slideRun(); 
                }else{
                  this.slideStop();  
                }
                break;
        }
    }
    
    slideEvent() {
        this.previous.addEventListener('click', (e) => this.slidePrev());
        this.next.addEventListener('click', (e) => this.slideNext());
        this.pause.addEventListener('click', (e) => this.slideStop());
        this.play.addEventListener('click', (e) => this.slideRun());
        document.addEventListener('keydown', (e) => this.slideKeyboard(e));
    }
}












