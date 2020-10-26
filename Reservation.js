class Reservation
{
    constructor(mycanva) 
    {
        this.nom = document.getElementById('nom');
        this.canva = document.getElementById('canvas');
        this.canvas = mycanva;
        this.alert = document.getElementById('alert');
        this.prenom = document.getElementById('prenom');
        this.form = document.querySelector('#form');
        this.reserver = document.getElementById('reserve');
        this.timer = document.querySelector('#compte');
        this.confirm = document.getElementById('confirm');
        this.alertchamp = document.getElementById('alert2');
        if(sessionStorage.getItem('time') === null){
            sessionStorage.setItem('time', 1200);
        }
        else{
          sessionStorage.getItem('time');  
        }
        console.log(sessionStorage.getItem('time'));
        this.expiration = document.getElementById('expiration');
        this.annulation = document.getElementById('annulation');
        this.boutton = document.getElementById('boutton_canvas');
        this.infos = document.getElementById('infos');
        this.clear = document.getElementById('clear');
        this.text = document.getElementById('textres');
        this.paint = document.getElementById('paint');
        this.valider = document.getElementById('valider');
        this.annuler = document.getElementById('annuler');
        this.velo = document.getElementById("velo");
        this.choix = document.getElementById('choix');
    }
    
    delaiReservation(){
       let time = parseInt(sessionStorage.getItem('time'));
       time--;
       let min = Math.floor(time/60);
       let sec = time - min * 60;
       if(min<10) min = '0' + min;
       if(sec<10) sec = '0' + sec;
       this.timer.textContent = min + ":" + sec;
        sessionStorage.setItem('minute', min);
        sessionStorage.setItem('seconde', sec);
        sessionStorage.setItem('time', time);
       if (time <= 0) {
          this.finDelai()
       }   
    }
    finDelai(){
        this.annuler.style.display = 'none';
        clearInterval(this.interval);
        this.text.style.display = 'none';
        this.timer.style.display = 'none';
        sessionStorage.clear();
        sessionStorage.setItem('time', 1200);
        this.canvas.ctx.clearRect(0, 0, 300, 150);
        this.infos.style.display = 'none';
        this.choix.style.display = 'block';
        this.expiration.style.display = "block";
// Disparition du message d'expiration
        setTimeout(() => {
            this.expiration.style.display = "none";
        }, 3000);
    }
    storeReservation(){
        localStorage.setItem('nom', this.nom.value);
        localStorage.setItem('prenom', this.prenom.value);
        sessionStorage.setItem('text', this.text.textContent);
    }
    showReservation() {
        this.text.textContent = "Vélo réservé à la station: " 
        + sessionStorage.getItem('adressStation') + " " + "par: " + localStorage.getItem('prenom', prenom.value) + " " + localStorage.getItem('nom', nom.value)
         + "" + " . La réservation expire dans: ";
        sessionStorage.setItem('reservation', this.text.textContent);
        this.interval = setInterval(e =>this.delaiReservation(), 1000);
        return true;
    }
    resteVelo() {
        let nbVelo = parseInt(sessionStorage.getItem('velo'));
        let reste = nbVelo - 1;
        this.velo.textContent = 'Il reste ' + reste + ' vélos';
        nbVelo--;
    }
    eventReservation() {
        this.valider.style.display = 'none';
        this.clear.style.display = 'none';
        this.expiration.style.display ='none';
        this.annulation.style.display ='none';
        this.canva.style.display = 'none';
        this.annuler.style.display = "none";
        this.choix.style.display = 'none';
        this.alert.style.display = "none";
        this.alertchamp.style.display = "none";
        this.form.addEventListener('submit', (e) =>
            e.preventDefault());
        this.reserver.addEventListener('click', () => {
            if(this.nom.value !== "" && this.prenom.value !== ""){
                this.canva.style.display = 'block';
                this.valider.style.display = 'block';
                this.clear.style.display = 'block';
            }else{
                this.alertchamp.style.display = "block";
                setTimeout(() => {
                    this.alertchamp.style.display = "none";
                }, 3000);
            }
        });
        this.valider.addEventListener('click', () =>{
            if(sessionStorage.getItem('canvas') == 'remplis')
            {
                  if (sessionStorage.getItem('reservation'))
                  {  
                          if ( confirm( "attention, cette réservation remplace la précédente!!" ) ) {

                              sessionStorage.removeItem('reservation');
                              clearInterval(this.interval);
                              sessionStorage.setItem('time', 1200);
                              this.showReservation();

                          } else {
                             this.text.textContent = sessionStorage.getItem('reservation');
                          }
                  }else{
                        this.annuler.style.display = 'block';
                        this.text.style.display = 'block';
                        this.timer.style.display = 'block';
                        this.infos.style.display = 'none';
                        this.storeReservation()
                        this.showReservation()
                        this.resteVelo()
                        this.annuler.style.display = 'block'; 
                  }
                this.canvas.ctx.clearRect(0, 0, 300, 150);
            }else
            {
                this.alert.style.display = "block";
                setTimeout(() => {
                    this.alert.style.display = "none";
                }, 3000);     
            }
        }); 
    }
    annulationReservation(){
         this.annuler.addEventListener('click', () => {
              sessionStorage.removeItem('reservation');
                this.annuler.style.display = 'none';
                clearInterval(this.interval);
                this.text.style.display = 'none';
                this.timer.style.display = 'none';
                //sessionStorage.clear();
                sessionStorage.setItem('time', 1200);
                this.canvas.ctx.clearRect(0, 0, 300, 150);
                this.infos.style.display = 'none';
                this.choix.style.display = 'block';
                this.annulation.style.display = "block";
        // Disparition du message d'annulation
                setTimeout(() => {
                    this.annulation.style.display = "none";
                }, 3000);
         });
    }
    loadPage() {
            if (sessionStorage.getItem('reservation') && sessionStorage.getItem('time') > 0 ) {
                  this.time = sessionStorage.getItem('time');
                  this.confirm.style.display = 'block';
                  this.annuler.style.display = 'block';
                  this.text.textContent = sessionStorage.getItem('reservation');
                  this.interval = setInterval(e => this.delaiReservation(), 1000);
                  this.choix.style.display = 'none';
            } else{
                this.annuler.style.display = 'none';
                clearInterval(this.interval);
                this.text.style.display = 'none';
                this.timer.style.display = 'none';
                sessionStorage.setItem('time', 1200);
                this.infos.style.display = 'none';
                this.choix.style.display = 'block';
            }
    }
    
}
 

