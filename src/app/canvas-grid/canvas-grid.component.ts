import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';




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
  private finalCells;
  private cellsNumb: number;
  private cellsNumbTabModelsPrevious: string[] = [];  //TOFIX faire un tableau à deux dimensions plutot
  private cellsNumbTabModelsNext: string[] = [];      //suppression du model passage a une simple string
  private count: any; //TOFIX trouver une autre solution pour numéroter les cases
  private timeSpeed = 100;
  private timer: any;

  private defineDimensions(): void {  // redefinition de la taille du canva pour le responsive, en le liant à la taille d'un conteneur;
    this.width = this.canvascontainer.nativeElement.offsetHeight;
    this.height = this.canvascontainer.nativeElement.offsetWidth;
    this.canvasRef.nativeElement.width = this.width;
    this.canvasRef.nativeElement.height = this.height
  }

  private drawInit() { //prépare la grille
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
  stop() {
    clearTimeout(this.timer);
  }
  fastForward() {
    this.timeSpeed = this.timeSpeed/2;
  }
  backward() {
    this.timeSpeed = this.timeSpeed*2;
  }
  private buildGrid(init) {
    this.count = -1;
    //TOFIX se debarasser de cette var count qui en plus recourt à un nombre magique
    //une double boucle for qui déssine une case se décale de la hauteur de la case et ainsi de suite, colonne par colonne(la première boucle for change de colonne)
    for (var i = this.width / this.cellsNumb; i < this.width - (this.width / this.cellsNumb); i += this.width / this.cellsNumb) {
      for (var n = this.height / this.cellsNumb; n < this.height - (this.height / this.cellsNumb); n += this.width / this.cellsNumb) {
        if (init == true) {
          this.setColorsBuild(i, n);
        }
        else if (init == false) {
          this.count++;
          this.isAlive(i, n);
        }
      }
    }
    if (init == false) {
      this.count = -1;
      for (var i = this.width / this.cellsNumb; i < this.width - (this.width / this.cellsNumb); i += this.width / this.cellsNumb) {
        for (var n = this.height / this.cellsNumb; n < this.height - (this.height / this.cellsNumb); n += this.width / this.cellsNumb) {
          this.count++;
          this.cell(i, n, this.cellsNumbTabModelsNext[this.count]);
        }
      }
      this.cellsNumbTabModelsPrevious = this.cellsNumbTabModelsNext;
      this.cellsNumbTabModelsNext = [];
       this.timer = setTimeout(()=>this.buildGrid(false),this.timeSpeed);
    }
  }
  private cell(i, n, color) {
    this.ctx.strokeRect((n - (this.height / this.cellsNumb)), i, (this.height / this.cellsNumb), (this.height / this.cellsNumb));
    this.ctx.strokeStyle = "black"
    this.ctx.fillStyle = color;
    this.ctx.fillRect((n - (this.height / this.cellsNumb)), i, (this.height / this.cellsNumb), (this.height / this.cellsNumb));
  }
  private setColorsBuild(i, n) {
    var c: number = Math.random() // TODO: gerer ça avec la classe config.
    if (c < 0.5) {
      this.cell(i, n, "black");
      this.cellsNumbTabModelsPrevious.push("black" )
      this.count++;
    }
    else if (c >= 0.5) {
      this.cell(i, n, "white")
      this.cellsNumbTabModelsPrevious.push( "white" )
      this.count++
    }
  }
  private isDefined() {
    this.finalCells = [];
    if (this.cellsNumbTabModelsPrevious[this.count - 1] !== undefined) { this.finalCells.push(this.cellsNumbTabModelsPrevious[this.count - 1]) }
    if (this.cellsNumbTabModelsPrevious[this.count + 1] !== undefined) { this.finalCells.push(this.cellsNumbTabModelsPrevious[this.count + 1]) }
    if (this.cellsNumbTabModelsPrevious[this.count+ this.cellsNumb] !== undefined) { this.finalCells.push(this.cellsNumbTabModelsPrevious[this.count + this.cellsNumb]) }
    if (this.cellsNumbTabModelsPrevious[this.count- this.cellsNumb] !== undefined) { this.finalCells.push(this.cellsNumbTabModelsPrevious[this.count - this.cellsNumb]) }
    if (this.cellsNumbTabModelsPrevious[this.count- (this.cellsNumb) - 1] !== undefined) { this.finalCells.push(this.cellsNumbTabModelsPrevious[this.count - (this.cellsNumb) - 1]) }
    if (this.cellsNumbTabModelsPrevious[this.count- (this.cellsNumb) + 1] !== undefined) { this.finalCells.push(this.cellsNumbTabModelsPrevious[this.count - (this.cellsNumb )+ 1]) }
    if (this.cellsNumbTabModelsPrevious[this.count + (this.cellsNumb - 1)] !== undefined) { this.finalCells.push(this.cellsNumbTabModelsPrevious[(this.count + this.cellsNumb - 1)]) }
    if (this.cellsNumbTabModelsPrevious[this.count + (this.cellsNumb + 1)] !== undefined) { this.finalCells.push(this.cellsNumbTabModelsPrevious[this.count + (this.cellsNumb) + 1]) }
  }
  private isAlive(i, n) {
    this.isDefined()
    if (this.cellsNumbTabModelsPrevious[this.count] == "black" ) {
      var alive = 0;
      this.finalCells.map(function (x) { if (x == "black" ) { alive++ } });
      if (alive == 2 || alive == 3) {
        this.cellsNumbTabModelsNext.push( "black" )
      }
      else  {
        this.cellsNumbTabModelsNext.push( "white" )
      }
    }

    else if (this.cellsNumbTabModelsPrevious[this.count] ===  "white" ) {
      var alive = 0;
      this.finalCells.map(function (x) { if (x ===  "black" ) { alive++ } });

      if (alive == 3) {
        this.cellsNumbTabModelsNext.push( "black" )
      }
      else {
        this.cellsNumbTabModelsNext.push( "white" );
      }
    }

  }
}







