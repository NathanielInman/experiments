// Begin the actual imports and module
import { environment } from 'engine/data-model/environment';
import { loader      } from 'engine/controllers/components/loader';
import { testMap     } from 'engine/data-model/ingestion';

// Notate the loading of the module and declare its imports
$('.debug').append('<br/>loading object-model/Map.js [::environment]');

// Export the main map class
export class Map{
  constructor(){
    $('.debug').append('<br/>Creating map.');
    this.totalVnums = 0;
    this.sector = { active: {x: 0, y: 0} };
    loader.environments.onLoad = () => {
      this.setEnvironment(0);
      for(index in testMap.sectors){
        let source = testMap.sectors[index],
            key = index.split(':'),
            x = key[0],
            y = key[1],
            sector = this.addSector(x,y);

        sector.north=!!source.exits[0];
        sector.south=!!source.exits[1];
        sector.east =!!source.exits[2];
        sector.west =!!source.exits[3];
      } //end for
    } //end loader.environments.onLoad()
  }
  setEnvironment(index){
    if(index>=0&&index<environment.data.length){
      this.environmentIndex = index;
      this.environment = environment.data[index];
    } //end if
  }
  getEnvironment(){
    return this.environment;
  }
  getEnvironmentIndex(){
    return this.environmentIndex;
  }
  setActiveSector(x,y){
    this.sector.active = {x:x,y:y};
  }
  getActiveSector(x,y){
    return this.sector.active;
  }
  getSector(x,y){
    return this.sector[this.getKey(x,y)];
  }
  getKey(x,y){
    return x+":"+y;
  }
  addSector(x,y){
    // Variable initialization
    var sector = this.getSector(x,y);

    // Remove linked sectors if disabling or add sector / re-enable it
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
        this.sector[this.getKey(x,y)]=sector={
          x: x,
          y: y,
          floor: this.environment.floors[Math.floor(this.environment.floors.length*Math.random())],
          wall: this.environment.walls[Math.floor(this.environment.walls.length*Math.random())],
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

    // Now set active sector to the toggled one and return it
    this.setActiveSector(x,y);
    return sector;
  }
  linkSector(x1,y1,x2,y2){
    // Variable initialization
    var sector1 = this.getSector(x1,y1);
    var sector2 = this.getSector(x2,y2);

    // Ensure that both sectors are created and enabled
    if(!sector1)sector1=this.addSector(x1,y1);
    if(!sector2)sector2=this.addSector(x2,y2);
    if(!sector1.enabled)sector1.enabled=true;
    if(!sector2.enabled)sector2.enabled=true;

    // Link the sectors
    if(y2 > y1 && x1 == x2){
      if(sector1.south||sector2.north){ //link up
        sector1.south=false;sector2.north=false;
      }else{ //de-link
        sector1.south=true;sector2.north=true;
      } //end if
    }else if(y1 > y2 && x1 == x2){
      if(sector1.north||sector2.south){
        sector1.north=false;sector2.south=false;
      }else{ //de-link
        sector1.north=true;sector2.south=true;
      } //end if
    }else if(x2 > x1 && y1 == y2){
      if(sector1.east||sector2.west){
        sector1.east=false;sector2.west=false;
      }else{
        sector1.east=true;sector2.west=true;
      } //end if
    }else if(x1 > x2 && y1 == y2){
      if(sector1.west||sector2.east){
        sector1.west=false;sector2.east=false;
      }else{
        sector1.west=true;sector2.east=true;
      } //end if
    } //end if

    // Now set active sector to the last touched
    this.setActiveSector(x2,y2);
  }
}
