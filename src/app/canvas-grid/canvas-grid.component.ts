import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CellsNumbTabModel} from ".././cells-numb-tab-model";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-canvas-grid',
  templateUrl: './canvas-grid.component.html',
  styleUrls: ['./canvas-grid.component.sass']
})
export class CanvasGridComponent implements OnInit {

  @ViewChild('gameOfLife') canvasRef: ElementRef;
  @ViewChild("canvasContainer") canvascontainer;
  
  private containRef;
  private ctx;
  private width;
  private height;
  private cellsNumb: number;
  private cellsNumbTabModelsPrevious: CellsNumbTabModel[] = [];  //TOFIX faire un tableau à deux dimensions plutot
  private cellsNumbTabModelsNext: CellsNumbTabModel[] = [];
  private count: any = 0 //TOFIX trouver une autre solution pour numéroter les cases
  private comptage: any;
  
  private defineDimensions(): void{  // redefinition de la taille du canva pour le responsive, en le liant à la taille d'un conteneur;

  this.width = parseInt(this.canvascontainer.nativeElement.offsetHeight) ;
    this.height = parseInt(this.canvascontainer.nativeElement.offsetWidth);
    this.canvasRef.nativeElement.width =  this.width;
    this.canvasRef.nativeElement.height = this.height
  }

  private drawInit(){ //prépare la grille
    this.ctx = this.canvasRef.nativeElement.getContext("2d");
    this.cellsNumb = 52; //nombre magique en attendant de décider si oui on non on peut configurer le nombre de cellules.
    this.buildGrid(true); // remplacement d'une variable de classe par un argument pour check sir la config de base est ok
  }
   
  ngOnInit() {
    this.init();
    };

  init() { 
    this.defineDimensions();
    this.drawInit();
  }

  getHeight() {
    return this.height;
    }

  getWidth() {
    return this.width;
    }
  private buildGrid(init) {
       this.comptage = -1; 
       //TOFIX se debarasser de cette var comptage qui en plus recourt à un nombre magique
       //une double boucle for qui déssine une case se décale de la hauteur de la case et ainsi de suite, colonne par colonne(la première boucle for change de colonne)
      for (var i = this.width/this.cellsNumb; i < this.width-(this.width/this.cellsNumb); i+= this.width/this.cellsNumb) {
        for (var n = this.height/this.cellsNumb; n < this.height-(this.height/this.cellsNumb); n+= this.width/this.cellsNumb) {
          if (init == true) {
          this.setColorsBuild(i,n);
          }
          else {
          this.comptage ++;
          this.cellsNumbTabModelsNext = [];
          this.isAlive(i,n);
          this.cell(i,n,"yellow");
          }
        }
        
      }
      init = false;
      this.comptage = 0;
    }
  private cell(i,n,color: string) {
    this.ctx.strokeRect((n-(this.height/this.cellsNumb)),i,(this.height/this.cellsNumb),(this.height/this.cellsNumb));
    this.ctx.strokeStyle= "black" 
    this.ctx.fillStyle= color
    this.ctx.fillRect((n-(this.height/this.cellsNumb)),i,(this.height/this.cellsNumb),(this.height/this.cellsNumb));
    
  }
 
  private setColorsBuild(i,n) {
    var c: number = Math.random() // TODO: gerer ça avec la classe config.
      if (c < 0.5) {
            this.cell(i,n,"black");
            this.cellsNumbTabModelsPrevious.push({order: this.count , state:"black"})
            this.count ++;
      }
      else if (c >= 0.5) {
            this.cell(i,n, "red")
            this.cellsNumbTabModelsPrevious.push({order: this.count , state: "white"})
            this.count ++
      }
     console.log(this.cellsNumbTabModelsPrevious) ;
  }
  private isAlive(i,n) {
       if (this.cellsNumbTabModelsPrevious[this.comptage].state == "black") {
        var alive = 0;
        if ((this.cellsNumbTabModelsPrevious[this.comptage+1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage+1].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage-1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage-1].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage+this.cellsNumb].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage+this.cellsNumb].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage-this.cellsNumb].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage-this.cellsNumb].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage+(this.cellsNumb+1)].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage+(this.cellsNumb+1)].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage-(this.cellsNumb)+1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage-(this.cellsNumb)+1].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage+(this.cellsNumb)-1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage+(this.cellsNumb)-1].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage-(this.cellsNumb)-1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage-(this.cellsNumb)-1].state!= undefined)){alive ++}
        if ((alive == 2 || alive == 3)) {
        this.cellsNumbTabModelsNext.push(this.cellsNumbTabModelsPrevious[this.comptage].order)
        this.cellsNumbTabModelsNext[this.comptage].state == "black";
      }
  }
      if (this.cellsNumbTabModelsPrevious[this.comptage].state == "black") {
        var alive = 0;
        if ((this.cellsNumbTabModelsPrevious[this.comptage+1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage+1].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage-1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage-1].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage+this.cellsNumb].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage+this.cellsNumb].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage-this.cellsNumb].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage-this.cellsNumb].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage+(this.cellsNumb+1)].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage+(this.cellsNumb+1)].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage-(this.cellsNumb)+1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage-(this.cellsNumb)+1].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage+(this.cellsNumb)-1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage+(this.cellsNumb)-1].state!= undefined)){alive ++}
        if ((this.cellsNumbTabModelsPrevious[this.comptage-(this.cellsNumb)-1].state == "black") && (this.cellsNumbTabModelsPrevious[this.comptage-(this.cellsNumb)-1].state!= undefined)){alive ++}
        if (alive == 3 ) {
        this.cellsNumbTabModelsNext.push(this.cellsNumbTabModelsPrevious[this.comptage].state)
        this.cellsNumbTabModelsNext[this.comptage].state == "black";
      }
    }
  
  console.log(this.cellsNumbTabModelsNext);
  
  
  
  
  }
}

  


