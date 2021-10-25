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

  constructor() {}
  
  ngOnInit():void {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-4.554049212537303, 36.73842272092004],
      zoom: this.zoomLevel
    });
  }

  zoomIn():void {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
  }
  
  zoomOut():void {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }



}
