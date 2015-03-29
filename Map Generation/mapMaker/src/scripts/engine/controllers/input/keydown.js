import { draw  } from 'engine/controllers/draw/main';
import { map   } from 'engine/data-model/map';

export function keydown(e){
  var sector = map.getActiveSector(),
      x = sector.x,
      y = sector.y,
      n = 15;

  if(e.keyIdentifier=='Down'&&y<n-1){
    if(this.toggledLink){
      map.linkSector(x,y,x,y+1);
    }else{
      map.setActiveSector(x,y+1);
    } //end if
  }else if(e.keyIdentifier=='Right'&&x<n-1){
    if(this.toggledLink){
      map.linkSector(x,y,x+1,y);
    }else{
      map.setActiveSector(x+1,y);
    } //end if
  }else if(e.keyIdentifier=='Left'&&x>0){
    if(this.toggledLink){
      map.linkSector(x,y,x-1,y);
    }else{
      map.setActiveSector(x-1,y);
    } //end if
  }else if(e.keyIdentifier=='Up'&&y>0){
    if(this.toggledLink){
      map.linkSector(x,y,x,y-1);
    }else{
      map.setActiveSector(x,y-1);
    } //end if
  }else if(e.keyIdentifier=='Enter'){
    map.addSector(x,y);
  }else if(e.keyIdentifier=='U+0020'){
    if(!this.toggledLink){
      this.toggledLink=sector;
    }else{
      this.toggledLink=false;
    } //end if
  } //end if
  draw();
} //end if
