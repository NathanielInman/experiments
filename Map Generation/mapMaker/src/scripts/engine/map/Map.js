export class Map{
  constructor(){
    this.totalVnums = 0;
    this.sector = {};
  }
  getSector(x,y){
    return this.sector[this.getKey(x,y)];
  }
  getKey(x,y){
    return x+":"+y;
  }
  addSector(x,y){
    var sector = this.getSector(x,y);
    if(sector && sector.enabled){
      sector.enabled=false;
      if(sector.north){
        sector.north=false;
        this.getSector(x,y-1).south=false;
      } //end if
      if(sector.south){
        sector.south=false;
        this.getSector(x,y+1).north=false;
      } //end if
      if(sector.west){
        sector.west=false;
        this.getSector(x-1,y).east=false;
      } //end if
      if(sector.east){
        sector.east=false;
        this.getSector(x+1,y).west=false;
      } //end if
    }else{
      if(!sector){ //not created yet, make it now
        this.totalVnums++;
        this.sector[this.getKey(x,y)]={
          c: x,
          r: y,
          enabled: true,
          north: false,
          south: false,
          east: false,
          west: false,
          vnum: this.totalVnums
        };
      }else{ //created previously but disabled, re-enable it
        sector.enabled=true;
      } //end if
    } //end if
  }
  linkSector(x1,y1,x2,y2){
    var sector1 = this.getSector(x1,y1);
    var sector2 = this.getSector(x2,y2);
    if(sector1 && sector2){
      if(y2 > y1 && x1 == x2){
        if(sector1.south==true||sector2.north==true){ //link up
          sector1.south=false;sector2.north=false;  
        }else{ //de-link
          sector1.south=true;sector2.north=true;
        } //end if
      }else if(y1 > y2 && x1 == x2){
        if(sector1.north==true||sector2.south==true){
          sector1.north=false;sector2.south=false;
        }else{ //de-link
          sector1.north=true;sector2.south=true;
        } //end if
      }else if(x2 > x1 && y1 == y2){
        if(sector1.east==true||sector2.west==true){
          sector1.east=false;sector2.west=false;
        }else{
          sector1.east=true;sector2.west=true;
        } //end if
      }else if(x1 > x2 && y1 == y2){
        if(sector1.west==true||sector2.east==true){
          sector1.west=false;sector2.east=false;
        }else{
          sector1.west=true;sector2.east=true;
        } //end if
      } //end if
    } //end if
  }
}
