class Particle{
  constructor(x,y){
    this.x = x; // Establish a starting x location for the particle
    this.y = y; // Establish a starting y location for the particle
    this.dx = x; // A destination x coordinate starts as accomplished
    this.dy = y; // A destination y coordinate starts as accomplished
    this.c1 = false; // The particle starts out not connected to particle 1
    this.f1 = -1; // When the particle is connected to p1, it imprints the index here
    this.c2 = false ;// The particle starts out not connected to particle 2
    this.f2 = -1; // When the particle is connected to p2, it imprints the index here
  }
}