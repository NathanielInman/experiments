export class Size{
  constructor(sectors){
    this.recalculate(sectors);
  }
  recalculate(sectors){
    this.sector = v.w<v.h?(v.w/this.number):(v.h/this.number);
    this.number = sectors || 15;
    this.padding = 2;
    this.arrow = 5;
    this.sideBar = {
      left: this.number*this.sector+this.padding,
      width: v.w - (this.number*this.sector+this.padding),
      padding: 5,
      borderRadius: 20,
      title:{
        height:40,
        top:5
      }
    };
  }
}
