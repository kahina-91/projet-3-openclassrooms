class Carte{
      constructor(){
               this.macarte = document.getElementById('macarte');
               this.carte = L.map(this.macarte).setView([48.692054, 6.184416999999939], 13);
               this.request = new XMLHttpRequest();
               this.nom = document.getElementById("nomSta");
               this.adresse = document.getElementById("address");
               this.places = document.getElementById("places");
               this.velo = document.getElementById("velo");
               this.statu = document.getElementById("status");
               this.responseElt = document.getElementById("infoStation");
               this.infos = document.getElementById('infos');
               this.choix = document.getElementById('choix');

      }
      creatMap(){
              L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                 attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
                 minZoom: 1,
                 maxZoom: 20
              }).addTo(this.carte);
      }
      creatMarker(){
             document.getElementById('infos').style.display = "none";
             let carte = this.carte;
             this.request.onreadystatechange = function() {
                  if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                      let response = JSON.parse(this.responseText);
                      response.forEach(info => {
                           let myIcon = L.icon({
                                iconUrl: "img/aa.png",
                                iconSize:     [60, 55],
                                shadowSize:   [50, 64],
                                iconAnchor:   [22, 94],
                                shadowAnchor: [4,  62],
                                popupAnchor:  [-3,-76]
                             }); 
                            if(info.satus = 'OPEN' && info.totalStands.availabilities['bikes'] > 10){
                                 myIcon.options.iconUrl = "img/aa.png";
                            }
                             if(info.satus = 'OPEN' && info.totalStands.availabilities['bikes'] < 10){
                                 myIcon.options.iconUrl = "img/bb.png";
                             }
                             if(info.status == 'CLOSED'){
                                myIcon.options.iconUrl = "img/cc.png";
                             }   
                             let latitude = info.position.latitude;
                             let longitude = info.position.longitude;
                             L.marker([latitude, longitude], {icon : myIcon}).addTo(carte).on('click', function(e) {
                                     document.getElementById('choix').style.display = 'none';
                                     document.getElementById('infos').style.display = "block";
                                     document.getElementById('infos').style.visibility = "visible"; 
                                     if(info.totalStands.availabilities['bikes'] > 0 && info.status == 'OPEN') {
                                            document.getElementById("nomSta").textContent = "Station: " + info.name;
                                            document.getElementById("address").textContent = " Adresse: " + info.address;
                                            document.getElementById("status").textContent = " Etat: ouvert ";
                                            document.getElementById("places").textContent =  " Il y'a " + info.totalStands.availabilities['stands'] + " places et " ;
                                            document.getElementById("velo").textContent = info.totalStands.availabilities['bikes'] +" Vélos disponibles" ;
                                            if(localStorage.getItem('nom') && localStorage.getItem('prenom')){
                                                document.getElementById('nom').value = localStorage.getItem('nom');
                                                document.getElementById('prenom').value = localStorage.getItem('prenom');
                                            }
                                      }
                                     if(info.totalStands.availabilities['bikes'] < 0){
                                           document.getElementById('infos').style.height = 50 + "px";
                                           document.getElementById('infos').textContent = "Station fermée, aucun vélo disponible";
                                     } 
                                      sessionStorage.setItem('adressStation', info.address);
                                      sessionStorage.setItem('velo', info.totalStands.availabilities['bikes']);
                             });
                       });
                   }
              };
              this.request.open("Get", "https://api.jcdecaux.com/vls/v3/stations?contract=Nancy&apiKey=ed9be256084dfd00c87a76ac08f74398a0b31215");
              this.request.send();
      } 
}