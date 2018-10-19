import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'app-canvas-grid',
  templateUrl: './canvas-grid.component.html',
  styleUrls: ['./canvas-grid.component.sass']
})
export class CanvasGridComponent implements OnInit {

  @ViewChild('gameOfLife') canvasRef: ElementRef;

  private ctx;
  private contain;
  private width;
  private height;

  defineDimensions(): void{  // redefinition de la taille du canva pour le responsive, prend en arguments les dimensions de l'élement parent
    this.contain = document.getElementById('canvasContainer');
    this.width = this.contain.nativeElement.offsetHeight ;
    this.height = this.contain.nativeElement.offsetWidth;
    this.canvasRef.nativeElement.width =  this.width;
    this.canvasRef.nativeElement.height = this.height;
  }
   // va initialiser la grille et le remplir par le biais d'autres fonctions.
  ngOnInit() {
    this.defineDimensions();
    this.ctx = this.canvasRef.nativeElement.getContext("2d");
    console.log(this.height);
    };
  }


