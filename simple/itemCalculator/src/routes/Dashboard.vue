<template lang="pug">
section.section(style='padding-top: 0')
  .hero.is-primary.mb-2.mx-r
    .hero-body: .container
      .columns
        .column
          .title Item Calculator
          .code
            span.gray short string 
            span.green-bold (
            span.green SCORE
            span.green-bold ) 
            span.red-bold (
            span.red LEVEL
            span.red-bold )
  .columns
    .column
      b-field(label='Armor Filter')
        b-select.mb-1(placeholder='Filter By Armor Slot',v-model='armorFilter',
          @input='change()')
          option(v-for='option in armorSlotOptions',:value='option') {{option}}
      b-field(label='Pill Filter')
        b-select.mb-1(placeholder='Filter By Magic Type',v-model='pillFilter',
          @input='change()')
          option(v-for='option in pillTypeOptions',:value='option') {{option}}
      b-field(label='Wand Filter')
        b-select.mb-1(placeholder='Filter By Magic Type',v-model='wandFilter',
          @input='change()')
          option(v-for='option in wandTypeOptions',:value='option') {{option}}
    .column
      b-field(label='Weapon Filter')
        b-select.mb-1(placeholder='Filter By Weapon Type',v-model='weaponFilter',
          @input='change()')
          option(v-for='option in weaponTypeOptions',:value='option') {{option}}
      b-field(label='Potions Filter')
        b-select.mb-1(placeholder='Filter By Magic Type',v-model='potionFilter',
          @input='change()')
          option(v-for='option in potionTypeOptions',:value='option') {{option}}
      b-field(label='Area Filter')
        b-select.mb-1(placeholder='Filter By Area',v-model='areaFilter',
          @input='change()')
          option(v-for='option in areaOptions',:value='option') {{option}}
    .column
      b-field(label='Other Filter')
        b-select.mb-1(placeholder='Filter By Other Type',v-model='otherFilter',
          @input='change()')
          option(v-for='option in otherTypeOptions',:value='option') {{option}}
      b-field(label='Scroll Filter')
        b-select.mb-1(placeholder='Filter By Magic Type',v-model='scrollFilter',
          @input='change()')
          option(v-for='option in scrollTypeOptions',:value='option') {{option}}
      b-field(label='Stave Filter')
        b-select.mb-1(placeholder='Filter By Magic Type',v-model='staffFilter',
          @input='change()')
          option(v-for='option in staffTypeOptions',:value='option') {{option}}
  .level
    .level-item
      b-checkbox(v-model='showPills',@input='change()') Show Pills
      b-checkbox(v-model='showScrolls',@input='change()') Show Scrolls
      b-checkbox(v-model='showPotions',@input='change()') Show Potions
      b-checkbox(v-model='showStaffs',@input='change()') Show Staves
      b-checkbox(v-model='showWands',@input='change()') Show Wands
      b-checkbox(v-model='showArmor',@input='change()') Show Armor
      b-checkbox(v-model='showWeapons',@input='change()') Show Weapons
      b-checkbox(v-model='showOther',@input='change()') Show Other
  b-field.has-text-centered(label='Level Restriction')
    b-slider(v-model='levelRestriction',:min='0',:max='105',@input='change()')
  .code.has-text-left(v-if='output&&output.length')
    .has-text-right: b-button.top-button(icon-left='arrow-left-bold',
       type='is-primary',inverted,@click='change()',
       style='position:absolute;margin-top:-0.4rem;right:2.2rem;',
       :disabled='!$router.currentRoute.query.vnum') Return
    template(v-for='line in output')
      .cursor(v-if='line.item',@click='change(line.item.vnum)')
        .line
          span(v-for='word in line',:class='word.class') {{word.text}}
      .line(v-if='!line.item')
        span(v-for='word in line',:class='word.class') {{word.text}}
</template>
<script>

import Vuex from 'vuex';
import * as colors from '../colors';
import {items} from '../items/';

const {mapActions,mapGetters,mapMutations,mapState} = Vuex;

// Prepare the main template
export default {
  name: 'Dashboard',
  computed: {
    ...mapState('user',['name'])
  },
  data(){
    return {
      output: [],
      armorSlotOptions: [
        'none','finger','neck','body','head','legs','feet','hands','arms',
        'shield','about','waist','wrist','wield','hold','float'
      ],
      weaponTypeOptions: [
        'none', 'sword','dagger','spear','mace','axe','flail','whip',
        'polearm','staff'
      ],
      otherTypeOptions: [
        'none','container','drink','food','fountain','furniture','gem','jewelry','key',
        'light','lockpick','map','pole','portal','staff','tool','trash',
        'treasure','warp_stone'
      ],
      pillTypeOptions: ['none'],
      scrollTypeOptions: ['none'],
      potionTypeOptions: ['none'],
      wandTypeOptions: ['none'],
      staffTypeOptions: ['none'],
      areaOptions: ['none'],
      items: items
        .sort((a,b)=> +a.score<+b.score?1:+a.score>+b.score?-1:+a.level<+b.level?1:-1)
        .filter(o=>o.score<5000)
    };
  },
  created(){
    const {query} = this.$router.currentRoute;

    Object.keys(
      this.items
        .reduce((map,item)=>{
          map[item.area]=true;
          return map;
        },{})
    ).forEach(key=> this.areaOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='staff')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.staffTypeOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='wand')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.wandTypeOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='pill')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.pillTypeOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='potion')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.potionTypeOptions.push(key));
    Object.keys(
      this.items
        .filter(i=> i.itemType==='scroll')
        .reduce((map,item)=>{
          item.valueFlags.forEach(rawFlag=>{
            const flag = rawFlag.split(/\(|\)/g)[1];

            if(isNaN(+flag[0])) map[flag] = true;
          });
          return map;
        },{})
    ).forEach(key=> this.scrollTypeOptions.push(key));
    const levelRestriction = +query.levelRestriction;

    if(isNaN(levelRestriction)||levelRestriction<0||levelRestriction>105){
      this.levelRestriction = 100;
    }else{
      this.levelRestriction = levelRestriction;
    } //end if
    if(!query.hasOwnProperty('showStaffs')){
      this.showStaffs = true;
    }else{
      this.showStaffs = query.showStaffs==='true';
    } //end if
    if(!query.hasOwnProperty('showWands')){
      this.showWands = true;
    }else{
      this.showWands = query.showWands==='true';
    } //end if
    if(!query.hasOwnProperty('showPills')){
      this.showPills = true;
    }else{
      this.showPills = query.showPills==='true';
    } //end if
    if(!query.hasOwnProperty('showScrolls')){
      this.showScrolls = true;
    }else{
      this.showScrolls = query.showScrolls==='true';
    } //end if
    if(!query.hasOwnProperty('showPotions')){
      this.showPotions = true;
    }else{
      this.showPotions = query.showPotions==='true';
    } //end if
    if(!query.hasOwnProperty('showArmor')){
      this.showArmor = true;
    }else{
      this.showArmor = query.showArmor==='true';
    } //end if
    if(!query.hasOwnProperty('showWeapons')){
      this.showWeapons = true;
    }else{
      this.showWeapons = query.showWeapons==='true';
    } //end if
    if(!query.hasOwnProperty('showOther')){
      this.showOther = true;
    }else{
      this.showOther = query.showOther==='true';
    } //end if
    this.areaFilter = query.areaFilter || 'none';
    this.potionFilter = query.potionFilter || 'none';
    this.scrollFilter = query.scrollFilter || 'none';
    this.pillFilter = query.pillFilter || 'none';
    this.staffFilter = query.staffFilter || 'none';
    this.wandFilter = query.wandFilter || 'none';
    this.weaponFilter = query.weaponFilter || 'none';
    this.armorFilter = query.armorFilter || 'none';
    this.otherFilter = query.otherFilter || 'none';
    this.load(query&&query.vnum ? query.vnum : null);
  },
  methods: {
    change(vnum){
      this.$router.push({query:{
        vnum,
        levelRestriction: this.levelRestriction,
        showStaffs: this.showStaffs,
        showWands: this.showWands,
        showPills: this.showPills,
        showScrolls: this.showScrolls,
        showPotions: this.showPotions,
        showArmor: this.showArmor,
        showWeapons: this.showWeapons,
        showOther: this.showOther,
        armorFilter: this.armorFilter,
        weaponFilter: this.weaponFilter,
        staffFilter: this.staffFilter,
        wandFilter: this.wandFilter,
        pillFilter: this.pillFilter,
        potionFilter: this.potionFilter,
        scrollFilter: this.scrollFilter,
        areaFilter: this.areaFilter,
        otherFilter: this.otherFilter
      }});
      this.load(vnum);
    },
    load(vnum){
      this.output.length = 0;
      if(vnum){
        const item = this.items.find(item=> item.vnum===vnum);

        let str;

        this.drawString('{c*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
        this.drawString(`       {cName : {C${item.short}`);
        this.drawString(`     {cObject : {C${item.names.join(' ')}`);
        str = `      {cLevel : {C${item.level}`;
        this.drawString(`${str}${`{cArea : {C${item.area}`.padStart(57-str.length)}`);
        str = `       {cType : {C${item.itemType}`;
        this.drawString(`${str}${`{cWeight : {C${item.weight}`.padStart(57-str.length)}`);
        if(item.wearFlags.length){
          str = `       {cWear : {C${item.wearFlags.join(' ')}`;
          this.drawString(`${str}${`{cScore : {C${item.score}`.padStart(57-str.length)}`);
        }else{
          str = `       {cWear : {Cno`;
          this.drawString(`${str}${`{cScore : {C${item.score}`.padStart(57-str.length)}`);
        } //end if
        if(item.extraflags.length){
          this.drawString(`      {cFlags : {C${item.extraflags.join(' ')}`);
        }else{
          this.drawString(`      {cFlags : {Cnone`);
        } //end if
        this.drawString(`      {cValue : {Y${Math.floor(item.cost/100)} gold{c, {x${item.cost%100} silver`);
        this.drawString(' ');
        this.drawString(`   {cMaterial : {x${item.material.join(' ')}`)
        this.drawString(`{cSubmaterial : {x${item.submaterial.join(' ')}`);
        this.drawString(`     {cRarity : {x${item.rarity}`);
        if(item.itemType==='armor'){
          this.drawString(' ');
          this.drawString(`{cArmor Class: {x${item.valueFlags[0].split(/\(|\)/g)[1]} {cpierce`);
          this.drawString(`             {x${item.valueFlags[1].split(/\(|\)/g)[1]} {cbash`);
          this.drawString(`             {x${item.valueFlags[2].split(/\(|\)/g)[1]} {cslash`);
          this.drawString(`             {x${item.valueFlags[3].split(/\(|\)/g)[1]} {cvs magic`);
        }else if(item.itemType==='weapon'){
          this.drawString(' ');
          this.drawString(`{cWeapon Type : {C${item.valueFlags[0].split(/\(|\)/g)[1]}`);
          this.drawString(`{cDamage Type : {C${item.valueFlags[2].split(/\(|\)/g)[1]}`);
          str = item.valueFlags[3].split(/\(|\)/g)[1].split(',').join(' ');
          this.drawString(`      {cFlags : {C${!str.length?'none':str}`);
        }else if(['pill','scroll','potion'].includes(item.itemType)){
          this.drawString(' ');
          const spells = [];

          if(item.valueFlags.length>1){
            const spell = item.valueFlags[1].split(/\(|\)/g)[1];

            if(!spell.includes('reserved')) spells.push(spell);
          } //end if
          if(item.valueFlags.length>2){
            const spell = item.valueFlags[2].split(/\(|\)/g)[1];

            if(!spell.includes('reserved')) spells.push(spell);
          } //end if
          if(item.valueFlags.length>3){
            const spell = item.valueFlags[3].split(/\(|\)/g)[1];

            if(!spell.includes('reserved')) spells.push(spell);
          } //end if
          if(item.valueFlags.length>4){
            const spell = item.valueFlags[4].split(/\(|\)/g)[1];

            if(!spell.includes('reserved')) spells.push(spell);
          } //end if
          this.drawString(`{cLevel {x${item.valueFlags[0].split(/\(|\)/g)[1]} {cspells of: ${spells.join(', ')}`);
        } //end if
        if(item.affects){
          this.drawString(' ');
          item.affects.forEach(affect=>{
            this.drawString(`    {cAffects : {C${affect.name}{c by {C${(affect.amount>0?'+':'')+affect.amount}`);
          });
        } //end if
        this.drawString('{c*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
      }else{
        const items = this.items.filter(item=>{
          const meetsLevel = +item.level<=this.levelRestriction,
                meetsArea = this.areaFilter==='none'||item.area===this.areaFilter,
                meetsOther = this.otherTypeOptions.includes(item.itemType)&&this.showOther&&(
                  this.otherFilter==='none'||
                  item.itemType===this.otherFilter
                ),
                meetsArmor = this.showArmor&&(
                  this.armorFilter==='none'&&item.itemType==='armor'||
                  item.wearFlags.includes(this.armorFilter)
                ),
                meetsWeapon = item.itemType==='weapon'&&this.showWeapons&&(
                  this.weaponFilter==='none'||
                  item.valueFlags[0].includes(this.weaponFilter)
                ),
                meetsWand = item.itemType==='wand'&&this.showWands&&(
                  this.wandFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.wandFilter))
                ),
                meetsStaff = item.itemType==='staff'&&this.showStaffs&&(
                  this.staffFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.staffFilter))
                ),
                meetsPill = item.itemType==='pill'&&this.showPills&&(
                  this.pillFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.pillFilter))
                ),
                meetsScroll = item.itemType==='scroll'&&this.showScrolls&&(
                  this.scrollFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.scrollFilter))
                ),
                meetsPotion = item.itemType==='potion'&&this.showPotions&&(
                  this.potionFilter==='none'||
                  item.valueFlags.find(o=>o.includes(this.potionFilter))
                );

          return meetsLevel&&meetsArea&&(
            meetsOther||meetsArmor||meetsWeapon||meetsPill||meetsScroll||meetsPotion||meetsWand||meetsStaff
          );
        });

        if(!items.length){
          this.drawString('{R---> {xNo Results {R<--');
        }else{
          items
            .sort((a,b)=> +a.score<+b.score?1:+a.score>+b.score?-1:+a.level<+b.level?1:-1)
            .some((item,i)=>{
              this.drawItem(item);
              if(i>20) this.drawString('{R---> {xmore than 20 results {R<--');
              return i>20; //don't render more than 10
            });
        } //end if
      } //end if
    },
    drawItem(item){

      // only need to do this once on an item, for speed
      if(item.stringified) {
        this.output.push(item.stringified);
        return;
      };
      item.stringified = this.drawString(`${item.short} {G({g${item.score}{G) {R({r${item.level}{R)`);
      item.stringified.item = item; //recursive for function pointer
    },
    drawString(string){
      const colorMap = {
          R: colors.redBold,
          r: colors.red,
          G: colors.greenBold,
          g: colors.green,
          B: colors.blueBold,
          b: colors.blue,
          C: colors.cyanBold,
          c: colors.cyan,
          M: colors.magentaBold,
          m: colors.magenta,
          Y: colors.yellowBold,
          y: colors.yellow,
          w: colors.grayBold,
          D: colors.black,
          W: colors.white,
          x: colors.white,
          X: colors.white,
          k: colors.white,
          t: colors.tab,
          '#': colors.red
        },
        line = [];

      let i,str='',char,lastchar,flipbit,
          colorSwitch='W';

      for(i=0;i<string.length;i++){
        lastchar = char;
        char = string[i];
        if(char==='{' && !flipbit){
          flipbit = true;
        }else if(char==='{'&&flipbit){
          flipbit = false;
          str+=char;
        }else if(flipbit){
          flipbit = false;
          if(str.length){
            line.push(colorMap[colorSwitch](str));
            str = '';
            colorSwitch = char;
          }else if(char==='t'){
            line.push(colorMap[char](' '));
          }else{
            colorSwitch = char;
          } //end if
        }else{
          str+=char;
        } //end if
      } //end for
      if(str.length) line.push(colorMap[colorSwitch](str));
      this.output.push(line);
      return line;
    }
  }
};
</script>
<style lang="stylus" scoped>
span
  white-space pre
.cursor
  cursor pointer
.bold
  font-weight bold
.top-button
  margin-bottom 1rem
  margin-top -1rem
.mb-2
  margin-bottom 2rem
.mb-1
  margin-bottom 1rem
.mx-r
  margin-left -1.5rem
  margin-right -1.5rem
.b-slider
  padding 0 1rem
</style>
