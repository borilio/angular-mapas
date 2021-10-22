import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/mapas/interfaces/menu-item.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //Array de elementos para generar el menú desde código
  menuItems: MenuItem[] = [
    {
      ruta: '/mapas/fullscreen',
      nombre: 'Full Screen',
      icon: 'bi bi-fullscreen'
    },
    {
      ruta: '/mapas/zoom-range',
      nombre: 'Zoom Range',
      icon: 'bi bi-zoom-in'
    },
    {
      ruta: '/mapas/marcadores',
      nombre: 'Marcadores',
      icon: 'bi bi-bookmarks'
    },
    {
      ruta: '/mapas/propiedades',
      nombre: 'Propiedades',
      icon: 'bi bi-sliders'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
