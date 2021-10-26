import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements OnInit, AfterViewInit {

  @ViewChild("mapa") divMapa! : ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  zoomLevelMax: number = 18;
  zoomLevelMin: number = 2;

  constructor() {}
  
  ngOnInit():void {}

  ngAfterViewInit(): void {
    // Inicializamos el objeto
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-4.554049212537303, 36.73842272092004],
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


  }

  zoomIn():void {
    this.mapa.zoomIn();
  }
  
  zoomOut():void {
    this.mapa.zoomOut();
  }



}
