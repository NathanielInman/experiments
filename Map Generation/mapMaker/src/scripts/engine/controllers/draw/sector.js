import { hex2rgba } from 'engine/controllers/draw/hex2rgba';
import { sizes    } from 'engine/controllers/draw/sizes';
import { map      } from 'engine/controllers/map/collection';
import { floor    } from 'engine/data-model/floor';
import { wall     } from 'engine/data-model/wall';

export var sector = {
  base:function(sector){
    ctx.fillStyle=floor[sector.floor].background;
    ctx.fillRect(sector.x*sizes.sector,sector.y*sizes.sector,sizes.sector,sizes.sector);
    ctx.fillStyle=hex2rgba(map.environment.background.value,map.environment.background.strength);
    ctx.fillRect(sector.x*sizes.sector,sector.y*sizes.sector,sizes.sector,sizes.sector);
  },
  vnum:function(sector){
    ctx.fillStyle=wall[sector.wall].color;
    ctx.fillText(sector.vnum,3+sector.x*sizes.sector,(1+sector.y)*sizes.sector-3);
  },
  outline:function(sector){
    ctx.strokeStyle='#000';
    ctx.beginPath();
    ctx.rect(sector.x*sizes.sector,sector.y*sizes.sector,sizes.sector,sizes.sector);
    ctx.stroke();
  },
  arrow:{
    west:function(sector){
      ctx.strokeStyle = wall[sector.wall].color;
      ctx.beginPath();
      ctx.moveTo(sector.x*sizes.sector+sizes.sector/2,sector.y*sizes.sector+sizes.sector/2            );
      ctx.lineTo(sector.x*sizes.sector+             sizes.padding,sector.y*sizes.sector+sizes.sector/2            );
      ctx.lineTo(sector.x*sizes.sector+sizes.arrow+ sizes.padding,sector.y*sizes.sector+sizes.sector/2-sizes.arrow);
      ctx.moveTo(sector.x*sizes.sector+             sizes.padding,sector.y*sizes.sector+sizes.sector/2            );
      ctx.lineTo(sector.x*sizes.sector+sizes.arrow+ sizes.padding,sector.y*sizes.sector+sizes.sector/2+sizes.arrow);
      ctx.stroke();
    },
    east:function(sector){
      ctx.strokeStyle = wall[sector.wall].color;
      ctx.beginPath();
      ctx.moveTo(sector.x*sizes.sector+sizes.sector/2,sector.y*sizes.sector+sizes.sector/2);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector-sizes.padding,sector.y*sizes.sector+sizes.sector/2);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector-sizes.padding-sizes.arrow,sector.y*sizes.sector+sizes.sector/2-sizes.arrow);
      ctx.moveTo(sector.x*sizes.sector+sizes.sector-sizes.padding,sector.y*sizes.sector+sizes.sector/2);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector-sizes.padding-sizes.arrow,sector.y*sizes.sector+sizes.sector/2+sizes.arrow);
      ctx.stroke();
    },
    north:function(sector){
      ctx.strokeStyle = wall[sector.wall].color;
      ctx.beginPath();
      ctx.moveTo(sector.x*sizes.sector+sizes.sector/2,sector.y*sizes.sector+sizes.sector/2);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector/2,sector.y*sizes.sector+ sizes.padding);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector/2-sizes.arrow,sector.y*sizes.sector+sizes.arrow+sizes.padding);
      ctx.moveTo(sector.x*sizes.sector+sizes.sector/2,sector.y*sizes.sector+ sizes.padding);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector/2+sizes.arrow,sector.y*sizes.sector+sizes.arrow+sizes.padding);
      ctx.stroke();
    },
    south:function(sector){
      ctx.strokeStyle = wall[sector.wall].color;
      ctx.beginPath();
      ctx.moveTo(sector.x*sizes.sector+sizes.sector/2,sector.y*sizes.sector+sizes.sector/2);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector/2,sector.y*sizes.sector+sizes.sector-sizes.padding);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector/2-sizes.arrow,sector.y*sizes.sector+sizes.sector-sizes.padding-sizes.arrow);
      ctx.moveTo(sector.x*sizes.sector+sizes.sector/2,sector.y*sizes.sector+sizes.sector-sizes.padding);
      ctx.lineTo(sector.x*sizes.sector+sizes.sector/2+sizes.arrow,sector.y*sizes.sector+sizes.sector-sizes.padding-sizes.arrow);
      ctx.stroke();
    }
  }
};
