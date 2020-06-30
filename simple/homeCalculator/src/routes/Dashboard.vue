<template lang="pug">
section.section(style='padding-top: 0')
  .hero.is-primary.mb-2.mx-r
    .hero-body: .container
      .title Diamonds: {{diamonds}}
      .subtitle Gold: {{gold}}
  .hero.is-danger.mb-2.mx-r(v-if='errors.length')
    .hero-body: .container
      .subtitle(v-for='error in errors') {{error}}
  .container
    .columns.is-desktop
      .column
        .card.mb
          .card-header: .card-header-title Basic
          .card-content
            b-switch.mb(v-model='locationType',true-value='house',
              false-value='manor',@input='updateCost') {{locationType}}
            br
            b-checkbox.mb(v-model='isPublic',@input='updateCost') is public
            b-checkbox.mb(v-model='hasPortal',@input='updateCost') has portal
            b-field.mb(label='Healing Rate')
              b-slider(v-model='healingRate',:min='100',:max='400',:step='10',
                @input='updateCost')
      .column(v-if='locationType=="house"')
        .card.mb
          .card-header: .card-header-title Door
          .card-content
            b-select.mb(v-model='doorType',@input='updateCost',:disabled="locationType=='manor'")
              option(value='0') wood door
              option(value='50') stone door
              option(value='100') metal door
            b-select.mb(v-model='doorLock',@input='updateCost',:disabled="locationType=='manor'")
              option(value='0') easy difficulty lock
              option(value='200') regular difficulty lock
              option(value='400') hard difficulty lock
              option(value='600') implausible difficulty lock
              option(value='800') improbable difficulty lock
              option(value='1000') impossible difficulty lock
            b-field.mb(label='Lock Level',:disabled="locationType=='manor'")
              b-slider(v-model='lockLevel',:min='50',:max='100',:step='1'
                @input='updateCost')
    .columns(v-if='locationType=="manor"&&!isPublic'): .column: .card.mb
      .card-header: .card-header-title Henchmen
      .card-content
        b-switch.mb(v-model='henchmenAll',@input='upgradeHenchmenAll') Toggle All
        p.mb.
          Starting abilities: dark vision, regeneration, detect invisibility, detect hidden, dodge, parry, kick. Weapons are free.
        .columns.is-desktop
          .column
            .title General Upgrades
            b-checkbox.mb.mr(v-model='sanctuary',@input='updateCost') Sanctuary
            b-checkbox.mb.mr(v-model='haste',@input='updateCost') Haste
            b-checkbox.mb.mr(v-model='phase',@input='updateCost') Phase
            b-checkbox.mb.mr(v-model='protection',@input='updateCost') Protection (either evil or good)
            b-checkbox.mb.mr(v-model='sneak',@input='updateCost') Sneak
            b-checkbox.mb.mr(v-model='fly',@input='updateCost') Fly
            b-checkbox.mb(v-model='invisibility',@input='updateCost') Invisibility
          .column
            .title Offensive Abilities
            b-checkbox.mb.mr(v-model='criticalStrike',@input='updateCost') Critical Strike
            b-checkbox.mb.mr(v-model='counter',@input='updateCost') Counter
            b-checkbox.mb.mr(v-model='dirtKick',@input='updateCost') Dirt Kick
            b-checkbox.mb.mr(v-model='disarm',@input='updateCost') Disarm
            b-checkbox.mb.mr(v-model='berserk',@input='updateCost') Berserk
            b-checkbox.mb.mr(v-model='bash',@input='updateCost') Bash
            b-checkbox.mb(v-model='trip',@input='updateCost') Trip
        .columns.is-desktop
          .column
            .title Major Resistances
            b-checkbox.mb.mr(v-model='resistMonk',@input='updateCost') Monk
            b-checkbox.mb.mr(v-model='resistMagic',@input='updateCost') Magic
            b-checkbox.mb.mr(v-model='resistPierce',@input='updateCost') Pierce
            b-checkbox.mb.mr(v-model='resistSlash',@input='updateCost') Slash
            b-checkbox.mb.mr(v-model='resistBash',@input='updateCost') Bash
          .column
            .title Minor Resistances
            b-checkbox.mb.mr(v-model='resistWood',@input='updateCost') Wood
            b-checkbox.mb.mr(v-model='resistSilver',@input='updateCost') Silver
            b-checkbox.mb.mr(v-model='resistIron',@input='updateCost') Iron
            b-checkbox.mb.mr(v-model='resistLight',@input='updateCost') Light
            b-checkbox.mb.mr(v-model='resistPoison',@input='updateCost') Poison
            b-checkbox.mb.mr(v-model='resistHoly',@input='updateCost') Holy
            b-checkbox.mb.mr(v-model='resistEnergy',@input='updateCost') Energy
            b-checkbox.mb.mr(v-model='resistDisease',@input='updateCost') Disease
            b-checkbox.mb.mr(v-model='resistFire',@input='updateCost') Fire
            b-checkbox.mb.mr(v-model='resistCold',@input='updateCost') Cold
            b-checkbox.mb.mr(v-model='resistLightning',@input='updateCost') Lightning
            b-checkbox.mb(v-model='resistAcid',@input='updateCost') Acid
    .columns.is-desktop
      .column
        .card.mb
          .card-header: .card-header-title Basic Furniture
          .card-content
            b-field.mb(label='Furniture Pieces')
              b-numberinput(v-model='furnitureItems',:min='0',:max='10',
                @input='updateCost')
            b-field.mb(label='Fireplaces')
              b-numberinput(v-model='fireplaceItems',:min='0',:max='10',
                @input='updateCost')
            b-field.mb(label='Fountains')
              b-numberinput(v-model='fountainItems',:min='0',:max='10',
                @input='updateCost')
      .column
        .card.mb
          .card-header: .card-header-title Tradesguild Furniture
          .card-content
            b-field.mb(label='Tradesguild Troughs')
              b-numberinput(v-model='troughItems',:min='0',:max='10',
                @input='updateCost')
            b-field.mb(label='Tradesguild Crucibles')
              b-numberinput(v-model='crucibleItems',:min='0',:max='10',
                @input='updateCost')
            b-field.mb(label='Tradesguild Anvils')
              b-numberinput(v-model='anvilItems',:min='0',:max='10',
                @input='updateCost')
            b-field.mb(label='Tradesguild Workbenches')
              b-numberinput(v-model='workbenchItems',:min='0',:max='10',
                @input='updateCost')
            b-field.mb(label='Tradesguild Forges')
              b-numberinput(v-model='forgeItems',:min='0',:max='10',
                @input='updateCost')
</template>
<script>
import Vuex from 'vuex';

const {mapActions,mapGetters,mapMutations,mapState} = Vuex;

// Prepare the main template
export default {
  name: 'Dashboard',
  computed: {
    ...mapState('user',['name'])
  },
  created(){
    const {query} = this.$router.currentRoute;

    this.locationType = query.locationType;
    this.healingRate = +query.healingRate;
    this.hasPortal = query.hasPortal==='true';
    this.isPublic = query.isPublic==='true';
    this.doorLock = +query.doorLock;
    this.doorType = +query.doorType;
    this.lockLevel = +query.lockLevel;
    this.furnitureItems = +query.furnitureItems;
    this.fireplaceItems = +query.fireplaceItems;
    this.fountainItems = +query.fountainItems;
    this.troughItems = +query.troughItems;
    this.crucibleItems = +query.crucibleItems;
    this.anvilItems = +query.anvilItems;
    this.workbenchItems = +query.workbenchItems;
    this.forgeItems = +query.forgeItems;
    this.sanctuary = query.sanctuary==='true';
    this.haste = query.haste==='true';
    this.phase = query.phase==='true';
    this.protection = query.protection==='true';
    this.sneak = query.sneak==='true';
    this.fly = query.fly==='true';
    this.invisibility = query.invisibility==='true';
    this.criticalStrike = query.criticalStrike==='true';
    this.counter = query.counter==='true';
    this.dirtKick = query.dirtKick==='true';
    this.disarm = query.disarm==='true';
    this.berserk = query.berserk==='true';
    this.bash = query.bash==='true';
    this.trip = query.trip==='true';
    this.resistMonk = query.resistMonk==='true';
    this.resistMagic = query.resistMagic==='true';
    this.resistPierce = query.resistPierce==='true';
    this.resistSlash = query.resistSlash==='true';
    this.resistBash = query.resistBash==='true';
    this.resistWood = query.resistWood==='true';
    this.resistSilver = query.resistSilver==='true';
    this.resistIron = query.resistIron==='true';
    this.resistLight = query.resistLight==='true';
    this.resistPoison = query.resistPoison==='true';
    this.resistHoly = query.resistHoly==='true';
    this.resistEnergy = query.resistEnergy==='true';
    this.resistDisease = query.resistDisease==='true';
    this.resistFire = query.resistFire==='true';
    this.resistCold = query.resistCold==='true';
    this.resistLightning = query.resistLightning==='true';
    this.resistAcid = query.resistAcid==='true';
  },
  data(){
    return {
      locationType: 'manor',
      diamonds: 0,
      gold: 0,
      healingRate: 150,
      hasPortal: false,
      isPublic: false,
      doorLock: 0,
      doorType: 0,
      lockLevel: 50,
      furnitureItems: 0,
      fireplaceItems: 0,
      fountainItems: 0,
      troughItems: 0,
      crucibleItems: 0,
      anvilItems: 0,
      workbenchItems: 0,
      forgeItems: 0,
      henchmenAll: false,
      sanctuary: false,
      haste: false,
      phase: false,
      protection: false,
      sneak: false,
      fly: false,
      invisibility: false,
      criticalStrike: false,
      counter: false,
      dirtKick: false,
      disarm: false,
      berserk: false,
      bash: false,
      trip: false,
      resistMonk: false,
      resistMagic: false,
      resistPierce: false,
      resistSlash: false,
      resistBash: false,
      resistWood: false,
      resistSilver: false,
      resistIron: false,
      resistLight: false,
      resistPoison: false,
      resistHoly: false,
      resistEnergy: false,
      resistDisease: false,
      resistFire: false,
      resistCold: false,
      resistLightning: false,
      resistAcid: false,
      errors: []
    };
  },
  methods: {
    acquireHenchmenStatus(){
      this.sanctuary = this.henchmenAll;
      this.haste = this.henchmenAll;
      this.phase = this.henchmenAll;
      this.protection = this.henchmenAll;
      this.sneak = this.henchmenAll;
      this.fly = this.henchmenAll;
      this.invisibility = this.henchmenAll;
      this.criticalStrike = this.henchmenAll;
      this.counter = this.henchmenAll;
      this.dirtKick = this.henchmenAll;
      this.disarm = this.henchmenAll;
      this.berserk = this.henchmenAll;
      this.bash = this.henchmenAll;
      this.trip = this.henchmenAll;
      this.resistMonk = this.henchmenAll;
      this.resistMagic = this.henchmenAll;
      this.resistPierce = this.henchmenAll;
      this.resistSlash = this.henchmenAll;
      this.resistBash = this.henchmenAll;
      this.resistWood = this.henchmenAll;
      this.resistSilver = this.henchmenAll;
      this.resistIron = this.henchmenAll;
      this.resistLight = this.henchmenAll;
      this.resistPoison = this.henchmenAll;
      this.resistHoly = this.henchmenAll;
      this.resistEnergy = this.henchmenAll;
      this.resistDisease = this.henchmenAll;
      this.resistFire = this.henchmenAll;
      this.resistCold = this.henchmenAll;
      this.resistLightning = this.henchmenAll;
      this.resistAcid = this.henchmenAll;
    },
    upgradeHenchmenAll(){
      this.henchmenAll = !!this.henchmenAll;
      this.acquireHenchmenStatus();
      this.$forceUpdate();
      this.updateCost();
    },
    updateCost(){
      let items = 0;

      this.errors.length = 0;
      this.diamonds = 0;
      if(this.locationType==='house'){
        this.diamonds += (this.healingRate - 100)/10*125;
        this.henchmenAll = false;
        this.acquireHenchmenStatus();
      }else{
        if(this.healingRate<150){
          this.errors.push('Default healing rate for manor is 150');
        }else{
          this.diamonds += (this.healingRate - 150)/10*125;
        } //end if
        this.doorLock = 0;
        this.doorType = 0;
        this.lockLevel = 50;
      } //end if
      if(this.healingRate>300&&this.isPublic) this.errors.push('Public location may not have healing rate above 300%');
      if(this.healingRate>300&&this.locationType==='house') this.errors.push('House location may not have healing rate above 300%');
      if(this.hasPortal) this.diamonds += 400;
      this.diamonds += +this.doorLock;
      this.diamonds += +this.doorType;
      this.diamonds += (this.lockLevel - 50) * 10;
      this.diamonds += this.furnitureItems * 25;
      items += this.furnitureItems;
      this.diamonds += this.fireplaceItems * 50;
      items += this.fireplaceItems;
      this.diamonds += this.fountainItems * 150;
      items += this.fountainItems;
      this.diamonds += this.troughItems * 50;
      items += this.troughItems;
      this.diamonds += this.crucibleItems * 100;
      items += this.crucibleItems;
      this.diamonds += this.anvilItems * 250;
      items += this.anvilItems;
      this.diamonds += this.workbenchItems * 250;
      items += this.workbenchItems;
      this.diamonds += this.forgeItems * 500;
      items += this.forgeItems;
      if(!this.isPublic){
        if(this.sanctuary) this.diamonds += 125;
        if(this.haste) this.diamonds += 100;
        if(this.phase) this.diamonds += 100;
        if(this.protection) this.diamonds += 50;
        if(this.sneak) this.diamonds += 25;
        if(this.fly) this.diamonds += 25;
        if(this.invisibility) this.diamonds += 25;
        if(this.criticalStrike) this.diamonds += 100;
        if(this.counter) this.diamonds += 100;
        if(this.dirtKick) this.diamonds += 75;
        if(this.disarm) this.diamonds += 75;
        if(this.berserk) this.diamonds += 50;
        if(this.bash) this.diamonds += 25;
        if(this.trip) this.diamonds += 10;
        if(this.resistMonk) this.diamonds += 100;
        if(this.resistMagic) this.diamonds += 100;
        if(this.resistPierce) this.diamonds += 50;
        if(this.resistSlash) this.diamonds += 50;
        if(this.resistBash) this.diamonds += 50;
        if(this.resistWood) this.diamonds += 25;
        if(this.resistSilver) this.diamonds += 25;
        if(this.resistIron) this.diamonds += 25;
        if(this.resistLight) this.diamonds += 25;
        if(this.resistPoison) this.diamonds += 25;
        if(this.resistHoly) this.diamonds += 25;
        if(this.resistEnergy) this.diamonds += 25;
        if(this.resistDisease) this.diamonds += 25;
        if(this.resistFire) this.diamonds += 25;
        if(this.resistCold) this.diamonds += 25;
        if(this.resistLightning) this.diamonds += 25;
        if(this.resistAcid) this.diamonds += 25;
      } //end if
      this.gold = this.diamonds * 110;
      if(this.locationType==='house'&&items > 10) this.errors.push(`Total items (${items}) exceeds 10 for houses`);
      if(this.locationType==='manor'&&items > 15) this.errors.push(`Total items (${items}) exceeds 15 for manors`);
      this.$router.push({query: {
        locationType: this.locationType,
        healingRate: this.healingRate,
        hasPortal: this.hasPortal,
        isPublic: this.isPublic,
        doorLock: this.doorLock,
        doorType: this.doorType,
        lockLevel: this.lockLevel,
        furnitureItems: this.furnitureItems,
        fireplaceItems: this.fireplaceItems,
        fountainItems: this.fountainItems,
        troughItems: this.troughItems,
        crucibleItems: this.crucibleItems,
        anvilItems: this.anvilItems,
        workbenchItems: this.workbenchItems,
        forgeItems: this.forgeItems,
        sanctuary: this.sanctuary,
        haste: this.haste,
        phase: this.phase,
        protection: this.protection,
        sneak: this.sneak,
        fly: this.fly,
        invisibility: this.invisibility,
        criticalStrike: this.criticalStrike,
        counter: this.counter,
        dirtKick: this.dirtKick,
        disarm: this.disarm,
        berserk: this.berserk,
        bash: this.bash,
        trip: this.trip,
        resistMonk: this.resistMonk,
        resistMagic: this.resistMagic,
        resistPierce: this.resistPierce,
        resistSlash: this.resistSlash,
        resistBash: this.resistBash,
        resistWood: this.resistWood,
        resistSilver: this.resistSilver,
        resistIron: this.resistIron,
        resistLight: this.resistLight,
        resistPoison: this.resistPoison,
        resistHoly: this.resistHoly,
        resistEnergy: this.resistEnergy,
        resistDisease: this.resistDisease,
        resistFire: this.resistFire,
        resistCold: this.resistCold,
        resistLightning: this.resistLightning,
        resistAcid: this.resistAcid
      }});
    }
  }
};
</script>
<style lang="stylus" scoped>
.bold
  font-weight bold
.mb
  margin-bottom 1rem
.mr
  margin-right 1rem
.mb-2
  margin-bottom 2rem
.mx-r
  margin-left -1.5rem
  margin-right -1.5rem
.b-slider
  padding 0 1rem
</style>
