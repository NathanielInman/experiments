import { map } from 'engine/map/collection';
import { draw } from 'engine/draw/main';

export function keydown(e){
  var sector = map.getActiveSector();
  console.log(e);
  if(e.keyIdentifier=='Down'){
    if(this.toggledLink){
      map.linkSector(sector.x,sector.y,sector.x,sector.y+1);
    }else{
      map.setActiveSector(sector.x,sector.y+1);
    } //end if
  }else if(e.keyIdentifier=='Right'){
    if(this.toggledLink){
      map.linkSector(sector.x,sector.y,sector.x+1,sector.y);
    }else{
      map.setActiveSector(sector.x+1,sector.y);
    } //end if
  }else if(e.keyIdentifier=='Left'){
    if(this.toggledLink){
      map.linkSector(sector.x,sector.y,sector.x-1,sector.y);
    }else{
      map.setActiveSector(sector.x-1,sector.y);
    } //end if
  }else if(e.keyIdentifier=='Up'){
    if(this.toggledLink){
      map.linkSector(sector.x,sector.y,sector.x,sector.y-1);
    }else{
      map.setActiveSector(sector.x,sector.y-1);
    } //end if
  }else if(e.keyIdentifier=='Enter'){
    map.addSector(sector.x,sector.y);
  }else if(e.keyIdentifier=='U+0020'){
    if(!this.toggledLink){
      this.toggledLink=sector;
    }else{
      this.toggledLink=false;
    } //end if
  } //end if
  draw();
} //end if
