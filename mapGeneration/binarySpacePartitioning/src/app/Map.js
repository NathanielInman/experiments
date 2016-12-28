import {Sector} from './Sector';

export class Map{
  constructor(w,h){
    this.width=w||10;
    this.height=h||10;
    this.sector=[];
    this.generate();
  }
  generate(){
    for(let i=0;i<this.width;i++){
      this.sector[i]=[];
      for(let j=0;j<this.height;j++){
        this.sector[i][j]=new Sector(i,j);
      } //end for
    } //end for
  }
  redraw(){
    let w=v.w/this.width,h=v.h/this.height;

    console.log('redraw');
    for(let i=0;i<this.width;i++){
      for(let j=0;j<this.height;j++){
        if(this.sector[i][j].active){
          ctx.fillStyle='#099';
        }else if(this.sector[i][j].wall){
          ctx.fillStyle='#888';
        }else if(this.sector[i][j].floor){
          ctx.fillStyle='#030';
        }else if(this.sector[i][j].door){
          ctx.fillStyle='853';
        }else{
          ctx.fillStyle='#300';
        } //end if
        ctx.fillRect(i*w,j*h,w,h);
      } //end for
    } //end for
  }
}
