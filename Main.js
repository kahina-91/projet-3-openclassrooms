const slide = new Slider();
slide.slideNext();
slide.slideRun();
slide.slideEvent();

const mymap = new Carte();
mymap.creatMap();
mymap.creatMarker();

const mycanva = new Canvas();
mycanva.canvasEvents();
mycanva.canvasResult();

const myreservation = new Reservation(mycanva);
myreservation.eventReservation();
myreservation.loadPage();
myreservation.annulationReservation();





