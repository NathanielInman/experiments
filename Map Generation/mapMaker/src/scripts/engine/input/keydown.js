import { map } from 'engine/map/collection';
import { draw } from 'engine/draw/main';
import { sizes } from 'engine/draw/sizes';

export function keydown(e){
  var sector = map.getActiveSector();
  console.log(e);
  if(e.keyIdentifier=='Down'&&sector.y<sizes.number-1){
    if(this.toggledLink){
      map.linkSector(sector.x,sector.y,sector.x,sector.y+1);
    }else{
      map.setActiveSector(sector.x,sector.y+1);
    } //end if
  }else if(e.keyIdentifier=='Right'&&sector.x<sizes.number-1){
    if(this.toggledLink){
      map.linkSector(sector.x,sector.y,sector.x+1,sector.y);
    }else{
      map.setActiveSector(sector.x+1,sector.y);
    } //end if
  }else if(e.keyIdentifier=='Left'&&sector.x>0){
    if(this.toggledLink){
      map.linkSector(sector.x,sector.y,sector.x-1,sector.y);
    }else{
      map.setActiveSector(sector.x-1,sector.y);
    } //end if
  }else if(e.keyIdentifier=='Up'&&sector.y>0){
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
