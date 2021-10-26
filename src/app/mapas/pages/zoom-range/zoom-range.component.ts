import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements  AfterViewInit, OnDestroy {

  @ViewChild("mapa") divMapa! : ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  zoomLevelMax: number = 18;
  zoomLevelMin: number = 2;
  zoomPasos: number = 0.2;
  lnglat: [number,number] = [-4.554049212537303, 36.73842272092004]; //PTA 

  constructor() {}
  
  ngOnDestroy(): void {
    //Eliminamos los listeners que hemos creado para liberar recursos
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend', ()=>{});
    this.mapa.off('move', ()=>{});
  }
  
  
  ngAfterViewInit(): void {
    // Inicializamos el objeto
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lnglat,
      zoom: this.zoomLevel,
    });

    // Creamos listeners
    // Cuando cambie el zoom...
    this.mapa.on('zoom', (evento)=>{
      this.zoomLevel = this.mapa.getZoom();
    });

    // Cuando termina de hacer zoom...
    this.mapa.on('zoomend', (evento)=>{
      //Comprobamos si nos pasamos de 18, en cuyo caso usamos zoomTo() que 
      //establece un zoom pero con una animación suave y no de golpe, lo que
      //provoca como un efecto rebote más vistoso que si hacemos setZoom().
      //Al cambiar el zoom, llamará al onZoom anterior, y se actualiza zoomLevel
      
      //Prefiero usar zoomMax y zoomMin en la inicialización en lugar de todo ésto ;)
      if (this.mapa.getZoom() > this.zoomLevelMax) {
        this.mapa.zoomTo(this.zoomLevelMax);
      } else{
        if (this.mapa.getZoom() < this.zoomLevelMin) {
          this.mapa.zoomTo(this.zoomLevelMin);
        }
      }
    });

    // Cuando movemos el mapa...
    this.mapa.on("move", (evento)=>{
      //Las coordenadas actuales se pueden sacar del mapa o del evento, pero no se
      //que diferencia hay entre una y otra. FernandoHerrera lo sacó del evento y yo del mapa.
      // const coordenadas = evento.target.getCenter(); 
      const coordenadas = this.mapa.getCenter();
      this.lnglat = [coordenadas.lng, coordenadas.lat];
    });


  }

  zoomIn():void {
    this.mapa.zoomIn();
  }
  
  zoomOut():void {
    this.mapa.zoomOut();
  }

  //Se llama cuando se cambia el input range para cambiar el zoom
  zoomChanges(valor:string):void{
    this.mapa.setZoom(Number(valor));   //Sin animación
    //this.mapa.zoomTo(Number(valor)); //Con transición
    //De un input recibimos siempre un string, y setZoom o zoomTo reciben números
    //La animación/transición de zoomTo tarda en arrancar y queda un poco trabado, prefiero directo con setZoom()
  }



}
