###
  Archetype Generator was written by Nathaniel Inman in Coffeescript
  06/25/2014

  Archetype list was created in XML on 02/26/11
  The list was extended for implementation in Exploring The Bleak
  The list was translated to json on 05/05/14
  The list was re-translated to coffeescript on 06/25/2014
  The list is used in Plains of Sedia : Origins, Developed by
  Nathaniel Inman of The Other Experiment Studio found @ www.theoestudio.com
  All contents within are licensed under GPLv3 
  
  GUIDELINES
  The Elemental Point Wheel is the transition of elements in a circle starting
  at fire, and ending right before it in a cycle. The total number is modulus
  5 rotations. Think of it as a star with the main elements on each point in
  the following order and in-between the points are the sub-elements.
  Elemental Point Wheel :              AMP     CAUSES    RES      CAUSES
       Fire   = 0      ,------------,  +Fire   -Water    +Fire    -Earth
       Han    = 0.5   LIFE          |  +Han    +Fire     +Han     +Water
       Water  = 1      |           /|\ +Water  -Air      +Water   -Fire
       Cho    = 1.5   TRANSCENDANCE |  +Cho    +Water    +Cho     +Air
       Air    = 2     \|/           |  +Air    -Spirit   +Air     -Water
       Omn    = 2.5   DEATH        /|\ +Omn    +Air      +Omn     +Spirit
       Spirit = 3      |            |  +Spirit -Earth    +Spirit  -Air
       Nu     = 3.5   DISPERSION    |  +Nu     +Spirit   +Nu      +Earth
       Earth  = 4     \|/          /|\ +Earth  -Fire     +Earth   -Spirit
       Khai   = 4.5   REBIRTH ------'  +Khai   +Earth    +Khai    +Fire
  
  Please keep in mind these relationship boundaries when setting resistances
  and amplitudes (Something won't be resistant to fire and amplitude water.)
  
  NOTES : Existence Statuses
  0 : Living
  1 : Dead
  2 : Undead
  3 : Incorporeal
###

# Put the Map Generator class in the window scope (root)
root = exports ? this

# Initialize the Map Mobiles class
class root.archetypeGenerator
  typelist:
    name:"Archetype List"
    type: [
      name: "Standard"
      number: 0
      existence: "Living"
      animated: 0
      enslaved: 0
      physical: 
        resistance: 0
        amplitude: 0
      elemental: 
        fire: 
          resistance: 0
          amplitude: 0
        water: 
          resistance: 0
          amplitude: 0
        earth: 
          resistance: 0
          amplitude: 0
        spirit: 
          resistance: 0
          amplitude: 0
      subelemental: 
        han: 
          resistance: 0
          amplitude: 0
        cho: 
          resistance: 0
          amplitude: 0
        omn: 
          resistance: 0
          amplitude: 0
        nu: 
          resistance: 0
          amplitude: 0
        khai: 
          resistance: 0
          amplitude: 0
    ,
      name: "Zombie"
      number: 1
      existence: "Undead"
      animated: 1
      enslaved: 0
      physical: 
        resistance: 0
        amplitude: 0
      elemental: 
        fire: 
          resistance: -10
          amplitude: 0
        water: 
          resistance: 0
          amplitude: 0
        earth: 
          resistance: 10
          amplitude: 0
        spirit: 
          resistance: 0
          amplitude: 10
      subelemental: 
        han: 
          resistance: 0
          amplitude: 0
        cho: 
          resistance: 1
          amplitude: 0
        omn: 
          resistance: 1
          amplitude: 0
        nu: 
          resistance: 2
          amplitude: 0
        khai: 
          resistance: 0
          amplitude: 0
    ,
      name: "Skeletal"
      number: 2
      existence: "Undead"
      animated: 1
      enslaved: 0
      physical: 
        resistance: 0
        amplitude: 0
      elemental: 
        fire: 
          resistance: 0
          amplitude: 0
        water: 
          resistance: 0
          amplitude: 0
        earth: 
          resistance: -2
          amplitude: 0
        spirit: 
          resistance: 10
          amplitude: 0
      subelemental: 
        han: 
          resistance: 0
          amplitude: 0
        cho: 
          resistance: 0
          amplitude: 0
        omn: 
          resistance: 0
          amplitude: 0
        nu: 
          resistance: 0
          amplitude: 0
        khai: 
          resistance: 0
          amplitude: 0
    ,
      name: "Spirit"
      number: 3
      existence: "Incorporeal"
      animated: 0
      enslaved: 1
      physical: 
        resistance: 100
        amplitude: -100
      elemental: 
        fire: 
          resistance: 0
          amplitude: 0
        water: 
          resistance: 0
          amplitude: 0
        earth: 
          resistance: 0
          amplitude: 0
        spirit: 
          resistance: 30
          amplitude: 0
      subelemental: 
        han: 
          resistance: 0
          amplitude: 0
        cho: 
          resistance: 0
          amplitude: 0
        omn: 
          resistance: 0
          amplitude: 0
        nu: 
          resistance: 0
          amplitude: 0
        khai: 
          resistance: 0
          amplitude: 0
    ,
      name: "Phantom"
      number: 4
      existence: "Incorporeal"
      animated: 0
      enslaved: 0
      physical: 
        resistance: 100
        amplitude: -100
      elemental: 
        fire: 
          resistance: 0
          amplitude: 5
        water: 
          resistance: 0
          amplitude: 5
        earth: 
          resistance: 0
          amplitude: 5
        spirit: 
          resistance: 0
          amplitude: 5
      subelemental: 
        han: 
          resistance: 2
          amplitude: 0
        cho: 
          resistance: 0
          amplitude: 0
        omn: 
          resistance: 0
          amplitude: 0
        nu: 
          resistance: 2
          amplitude: 0
        khai: 
          resistance: 0
          amplitude: 0
    ,
      name: "Wraith"
      number: 5
      existence: "Undead"
      animated: 1
      enslaved: 0
      physical: 
        resistance: 0
        amplitude: 0
      elemental: 
        fire: 
          resistance: 100
          amplitude: 0
        water: 
          resistance: 100
          amplitude: 10
        earth: 
          resistance: 100
          amplitude: 0
        spirit: 
          resistance: 100
          amplitude: 0
      subelemental: 
        han: 
          resistance: 100
          amplitude: 0
        cho: 
          resistance: 100
          amplitude: 0
        omn: 
          resistance: 100
          amplitude: 0
        nu: 
          resistance: 100
          amplitude: 0
        khai: 
          resistance: 100
          amplitude: 0
    ,
      name: "Spectral"
      number: 6
      existence: "Undead"
      animated: 0
      enslaved: 1
      physical: 
        resistance: 0
        amplitude: 0
      elemental: 
        fire: 
          resistance: 50
          amplitude: 20
        water: 
          resistance: 50
          amplitude: 0
        earth: 
          resistance: 50
          amplitude: 0
        spirit: 
          resistance: 50
          amplitude: 4
      subelemental: 
        han: 
          resistance: 50
          amplitude: 0
        cho: 
          resistance: 50
          amplitude: 0
        omn: 
          resistance: 50
          amplitude: 0
        nu: 
          resistance: 50
          amplitude: 0
        khai: 
          resistance: 50
          amplitude: 0
    ,
      name: "Horror"
      number: 7
      existence: "Incorporeal"
      animated: 0
      enslaved: 0
      physical: 
        resistance: 100
        amplitude: 0
      elemental: 
        fire: 
          resistance: 100
          amplitude: 0
        water: 
          resistance: 100
          amplitude: 1
        earth: 
          resistance: 100
          amplitude: 0
        spirit: 
          resistance: 100
          amplitude: 12
      subelemental: 
        han: 
          resistance: 100
          amplitude: 0
        cho: 
          resistance: 100
          amplitude: 0
        omn: 
          resistance: 100
          amplitude: 0
        nu: 
          resistance: 100
          amplitude: 0
        khai: 
          resistance: 100
          amplitude: 0
    ,
      name: "Archon"
      number: 8
      existence: "Living"
      animated: 0
      enslaved: 0
      physical: 
        resistance: 100
        amplitude: -100
      elemental: 
        fire: 
          resistance: 100
          amplitude: -100
        water: 
          resistance: 100
          amplitude: -100
        earth: 
          resistance: 100
          amplitude: -100
        spirit: 
          resistance: 100
          amplitude: -100
      subelemental: 
        han: 
          resistance: 100
          amplitude: -100
        cho: 
          resistance: 100
          amplitude: -100
        omn: 
          resistance: 100
          amplitude: -100
        nu: 
          resistance: 100
          amplitude: -100
        khai: 
          resistance: 100
          amplitude: -100
    ,
      name: "Bugbear"
      number: 9
      existence: "Living"
      animated: 0
      enslaved: 0
      physical: 
        resistance: 0
        amplitude: 0
      elemental: 
        fire: 
          resistance: 0
          amplitude: 0
        water: 
          resistance: 0
          amplitude: 0
        earth: 
          resistance: 0
          amplitude: 0
        spirit: 
          resistance: 0
          amplitude: 0
      subelemental: 
        han: 
          resistance: 5
          amplitude: 0
        cho: 
          resistance: 5
          amplitude: 0
        omn: 
          resistance: 5
          amplitude: 0
        nu: 
          resistance: 14
          amplitude: 0
        khai: 
          resistance: 7
          amplitude: 0
    ,
      name: "Apparition"
      number: 10
      existence: "Incorporeal"
      animated: 0
      enslaved: 0
      physical: 
        resistance: -100
        amplitude: -100
      elemental: 
        fire: 
          resistance: -100
          amplitude: -100
        water: 
          resistance: -100
          amplitude: -100
        earth: 
          resistance: -100
          amplitude: -100
        spirit: 
          resistance: -100
          amplitude: -100
      subelemental: 
        han: 
          resistance: -100
          amplitude: -100
        cho: 
          resistance: -100
          amplitude: -100
        omn: 
          resistance: -100
          amplitude: -100
        nu: 
          resistance: -100
          amplitude: -100
        khai: 
          resistance: -100
          amplitude: -100
    ]
  current: 0
    
  #Produce the constructor for the class
  constructor: (@totalNum) ->
    @current=r(0,@typelist.type.length,false) #choose a random one to display
    @displayAssociated()
    
  displayAssociated: ->
    ctx.fillStyle="#000"
    ctx.fillRect(0,0,v.w,v.h)
    ctx.font="24px Courier new"
    ctx.textAlign="center"

    # Draw title bar
    ctx.fillStyle="#333"
    ctx.fillRect(0,0,v.w,34)
    ctx.fillStyle="#FFF"
    ctx.fillText(@typelist.type[@current].name+' Archetype',v.w/2,24)
    ctx.fillStyle="#F00"
    ctx.fillRect(0,34,v.w,2)

    # Draw status box
    ctx.fillStyle="#100"
    ctx.fillRect(0,36,v.w/2,v.h/4)
    ctx.fillStyle="#FFF"
    ctx.fillText('Status: '+@typelist.type[@current].existence,v.w/4,v.h/16+36)
    if @typelist.type[@current].animated
      ctx.fillText('CAN be Animated',v.w/8,v.h/16+36+v.h/8+4)
    else
      ctx.fillText('Can NOT be Animated',v.w/8,v.h/16+36+v.h/8+4)
    if @typelist.type[@current].enslaved
      ctx.fillText('CAN be Enslaved',v.w/8+v.w/4,v.h/16+36+v.h/8+4)
    else
      ctx.fillText('Can NOT be Enslaved',v.w/8+v.w/4,v.h/16+36+v.h/8+4)
    ctx.fillStyle="#F00"
    ctx.fillRect(0,v.h/4+36,v.w/2,2)
    ctx.fillRect(0,v.h/8+36,v.w/2,2)
    ctx.fillRect(v.w/4,v.h/8+36,2,v.h/8)

    # Draw Physical Title
    ctx.fillStyle="#222"
    ctx.fillRect(v.w/2+2,36,v.w/2,36)
    ctx.fillStyle="#FFF"
    ctx.fillText("Physical",v.w/4*3,60)
    ctx.fillStyle="#500"
    ctx.fillRect(v.w/2+2,72,v.w/2,2)
    ctx.fillRect(v.w/2+2,(v.h/4+36)/2+36,v.w/2,2)
    ctx.fillStyle="#F00"
    ctx.fillRect(v.w/2+2,v.h/4+36,v.w/2,2)

    # Draw Elemental Title
    ctx.fillStyle="#222"
    ctx.fillRect(0,v.h/4+38,v.w,36)
    ctx.fillStyle="#FFF"
    ctx.fillText("Elemental",v.w/4,v.h/4+62)
    ctx.fillStyle="#500"
    ctx.fillRect(0,v.h/4+74,v.w,2)
    ctx.fillStyle="#F00"
    ctx.fillRect(v.w/2,36,2,v.h)

    # Draw Sub-elementalTitle
    ctx.fillStyle="#FFF"
    ctx.fillText("Sub-elemental",v.w/4*3,v.h/4+62)
    ctx.fillStyle="#300"
    ctx.fillRect(v.w/2+2,74,v.w/2*((@typelist.type[@current].physical.resistance+102)/200),((v.h/4+36)/2-38))
    ctx.fillStyle="#F00"
    ctx.fillText("Resistance : "+@typelist.type[@current].physical.resistance,v.w/4*3,72+(((v.h/4+36)/2-36)/2+8))
    ctx.fillStyle="#300"
    ctx.fillRect(v.w/2+2,(v.h/4+36)/2+38,v.w/2*((@typelist.type[@current].physical.amplitude+102)/200),(v.h/4+36)/2-38)
    ctx.fillStyle="#F00"
    ctx.fillText("Amplitude : "+@typelist.type[@current].physical.amplitude,v.w/4*3,v.h/4+42-((v.h/4+36)/2-38)/2)

    # Draw elementals
    ctx.fillStyle='rgba(200,200,0,0.3)'
    botTop=v.h/4+76
    botHeight=v.h-botTop
    botFrameHeight=botHeight/12-2
    ctx.fillStyle="#500"
    ctx.fillRect(0,botTop+botFrameHeight,v.w/2,2) #fire title
    ctx.fillRect(0,botTop+botFrameHeight*2+2,v.w/2,2) #fire resistance
    ctx.fillRect(0,botTop+botFrameHeight*3+4,v.w/2,2) #fire amplitude
    ctx.fillRect(0,botTop+botFrameHeight*4+6,v.w/2,2) #water title
    ctx.fillRect(0,botTop+botFrameHeight*5+8,v.w/2,2) #water resistance
    ctx.fillRect(0,botTop+botFrameHeight*6+10,v.w/2,2) #water amplitude
    ctx.fillRect(0,botTop+botFrameHeight*7+12,v.w/2,2) #earth title
    ctx.fillRect(0,botTop+botFrameHeight*8+14,v.w/2,2) #earth resistance
    ctx.fillRect(0,botTop+botFrameHeight*9+16,v.w/2,2) #earth amplitude
    ctx.fillRect(0,botTop+botFrameHeight*10+18,v.w/2,2) #spirit title
    ctx.fillRect(0,botTop+botFrameHeight*11+20,v.w/2,2) #spirit resistance
    ctx.fillRect(0,botTop+botFrameHeight*12+22,v.w/2,2) #spirit amplitude
    ctx.fillStyle="#111"
    ctx.fillRect(0,botTop,v.w/2,botFrameHeight) #fire title
    ctx.fillRect(0,botTop+botFrameHeight*3+6,v.w/2,botFrameHeight) #water title
    ctx.fillRect(0,botTop+botFrameHeight*6+12,v.w/2,botFrameHeight) #earth title
    ctx.fillRect(0,botTop+botFrameHeight*9+18,v.w/2,botFrameHeight) #spirit title
    ctx.fillStyle='#200'
    ctx.fillRect(0,botTop+botFrameHeight+2,v.w/2*(@typelist.type[@current].elemental.fire.resistance+100)/200,botFrameHeight)
    ctx.fillRect(0,botTop+botFrameHeight*2+4,v.w/2*(@typelist.type[@current].elemental.fire.amplitude+100)/200,botFrameHeight)
    ctx.fillRect(0,botTop+botFrameHeight*4+8,v.w/2*(@typelist.type[@current].elemental.water.resistance+100)/200,botFrameHeight)
    ctx.fillRect(0,botTop+botFrameHeight*5+10,v.w/2*(@typelist.type[@current].elemental.water.amplitude+100)/200,botFrameHeight)
    ctx.fillRect(0,botTop+botFrameHeight*7+14,v.w/2*(@typelist.type[@current].elemental.earth.resistance+100)/200,botFrameHeight)
    ctx.fillRect(0,botTop+botFrameHeight*8+16,v.w/2*(@typelist.type[@current].elemental.earth.amplitude+100)/200,botFrameHeight)
    ctx.fillRect(0,botTop+botFrameHeight*10+20,v.w/2*(@typelist.type[@current].elemental.spirit.resistance+100)/200,botFrameHeight)
    ctx.fillRect(0,botTop+botFrameHeight*11+22,v.w/2*(@typelist.type[@current].elemental.spirit.amplitude+100)/200,botFrameHeight)
    ctx.fillStyle="#F00"
    ctx.fillText('Fire',v.w/4,botTop+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].elemental.fire.resistance,v.w/4,botTop+botFrameHeight+2+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].elemental.fire.amplitude,v.w/4,botTop+botFrameHeight*2+4+botFrameHeight/2+8)
    ctx.fillText('Water',v.w/4,botTop+botFrameHeight*3+6+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].elemental.water.resistance,v.w/4,botTop+botFrameHeight*4+8+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].elemental.water.amplitude,v.w/4,botTop+botFrameHeight*5+10+botFrameHeight/2+8)
    ctx.fillText('Earth',v.w/4,botTop+botFrameHeight*6+12+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].elemental.earth.resistance,v.w/4,botTop+botFrameHeight*7+14+2+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].elemental.earth.amplitude,v.w/4,botTop+botFrameHeight*8+16+botFrameHeight/2+8)
    ctx.fillText('Spirit',v.w/4,botTop+botFrameHeight*9+18+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].elemental.spirit.resistance,v.w/4,botTop+botFrameHeight*10+20+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].elemental.spirit.amplitude,v.w/4,botTop+botFrameHeight*11+22+botFrameHeight/2+8)

    # Draw Sub-elementals
    botFrameHeight=botHeight/15-2
    ctx.fillStyle="#500"
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight,v.w/2,2) #han title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*2+2,v.w/2,2) #han resistance
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*3+4,v.w/2,2) #han amplitude
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*4+6,v.w/2,2) #cho title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*5+8,v.w/2,2) #cho resistance
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*6+10,v.w/2,2) #cho amplitude
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*7+12,v.w/2,2) #omn title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*8+14,v.w/2,2) #omn resistance
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*9+16,v.w/2,2) #omn amplitude
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*10+18,v.w/2,2) #nu title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*11+20,v.w/2,2) #nu resistance
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*12+22,v.w/2,2) #nu amplitude
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*13+24,v.w/2,2) #khai title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*14+26,v.w/2,2) #khai resistance
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*15+28,v.w/2,2) #khai amplitude
    ctx.fillStyle="#111"
    ctx.fillRect(v.w/2+2,botTop,v.w/2,botFrameHeight) #han title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*3+6,v.w/2,botFrameHeight) #cho title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*6+12,v.w/2,botFrameHeight) #omn title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*9+18,v.w/2,botFrameHeight) #nu title
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*12+24,v.w/2,botFrameHeight) #khai title
    ctx.fillStyle="#200"
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight+2,v.w/2*(@typelist.type[@current].subelemental.han.resistance+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*2+4,v.w/2*(@typelist.type[@current].subelemental.han.amplitude+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*4+8,v.w/2*(@typelist.type[@current].subelemental.cho.resistance+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*5+10,v.w/2*(@typelist.type[@current].subelemental.cho.amplitude+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*7+14,v.w/2*(@typelist.type[@current].subelemental.omn.resistance+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*8+16,v.w/2*(@typelist.type[@current].subelemental.omn.amplitude+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*10+20,v.w/2*(@typelist.type[@current].subelemental.nu.resistance+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*11+22,v.w/2*(@typelist.type[@current].subelemental.nu.amplitude+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*13+26,v.w/2*(@typelist.type[@current].subelemental.nu.resistance+100)/200,botFrameHeight)
    ctx.fillRect(v.w/2+2,botTop+botFrameHeight*14+28,v.w/2*(@typelist.type[@current].subelemental.nu.amplitude+100)/200,botFrameHeight)
    ctx.fillStyle="#F00"
    ctx.fillText('Han',v.w/4*3,botTop+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].subelemental.han.resistance,v.w/4*3,botTop+botFrameHeight+2+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].subelemental.han.amplitude,v.w/4*3,botTop+botFrameHeight*2+4+botFrameHeight/2+8)
    ctx.fillText('Cho',v.w/4*3,botTop+botFrameHeight*3+6+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].subelemental.cho.resistance,v.w/4*3,botTop+botFrameHeight*4+8+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].subelemental.cho.amplitude,v.w/4*3,botTop+botFrameHeight*5+10+botFrameHeight/2+8)
    ctx.fillText('Omn',v.w/4*3,botTop+botFrameHeight*6+12+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].subelemental.omn.resistance,v.w/4*3,botTop+botFrameHeight*7+14+2+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].subelemental.omn.amplitude,v.w/4*3,botTop+botFrameHeight*8+16+botFrameHeight/2+8)
    ctx.fillText('Nu',v.w/4*3,botTop+botFrameHeight*9+18+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].subelemental.nu.resistance,v.w/4*3,botTop+botFrameHeight*10+20+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].subelemental.nu.amplitude,v.w/4*3,botTop+botFrameHeight*11+22+botFrameHeight/2+8)
    ctx.fillText('Khai',v.w/4*3,botTop+botFrameHeight*12+24+botFrameHeight/2+8)
    ctx.fillText('Resistance : '+@typelist.type[@current].subelemental.khai.resistance,v.w/4*3,botTop+botFrameHeight*13+26+botFrameHeight/2+8)
    ctx.fillText('Amplitude : '+@typelist.type[@current].subelemental.khai.amplitude,v.w/4*3,botTop+botFrameHeight*14+28+botFrameHeight/2+8)
    @current=r(0,@typelist.type.length,false) #choose a random one to display
    setTimeout("window.main.displayAssociated();",1000)
root.main = new archetypeGenerator() #initialize the program
