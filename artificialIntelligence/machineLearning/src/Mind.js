import * as color from './colors';

class Atom{
  constructor({name='Unknown',value=1}={}){
    this.name = name;
    this.value = value;
  }
}
export class Mind{
  constructor(output){
    this.identity = {
      version: '14.05.14',
      self: {
        name: 'Penelopy',
        status: ['happy','alive']
      }
    };
    this.atoms = {};
    this.log = [];
  }
  learn(subject,attributes){
    this.log.push([color.yellow(`Learning (${subject}): `),color.gray(attributes.join())]);
    if(!this.atoms.hasOwnProperty(subject)) this.atoms[subject]={};
    attributes.forEach(attribute=>{
      if(this.atoms[subject].hasOwnProperty(attribute)){
        this.atoms[subject][attribute].value++;
      }else{
        this.atoms[subject][attribute] = new Atom({name: attribute});
      } //end if
    });
  }
  forget(subject,attributes){
    if(!attributes){ //forget subject
      this.log.push([color.yellow('Forgetting Subject: '),color.gray(subject)]);
      delete this.atoms[subject];
    }else if(this.atoms.hasOwnProperty(subject)){
      this.log.push([
        color.yellow('Forgetting: '),
        color.gray(attributes.map(a=>`${subject}:${a}`))
      ]);

      // only remove such attributes that were specified to be removed,
      // nothing else
      this.atoms[subject] = this.atoms[subject].filter(att=>{
        return !attributes.includes(att.name);
      });
    } //end if
  }
  isValid(string){
    if(!string.match(/\+|\-/g)){
      this.log.push([
        color.red('Invalid command. '),
        color.gray('Missing "+" or "-".')
      ]);
    } //end if
    return true;
  }
  process(message){
    if(message==='show'){
      this.printIdentity();
    }else if(!this.isValid(message)){
      this.log.push([color.green('Learning Example: ')]);
      this.log.push([color.gray(' +subject@attribute1 attribute2')]);
      this.log.push([color.green('Forgetting Example: ')]);
      this.log.push([color.gray(' -subject@attribute1 attribute2')]);
    }else if(message.substring(0,1)==='+'){
      const split = message.split('@'),
            subject = split.shift().replace('+',''),
            attributes = split.shift().split(/,|\s/g);

      this.learn(subject,attributes);
    }else if(message.substring(0,1)==='-'&&!message.includes('@')){
      this.forget(message); //forget entire subject
    }else if(message.substring(0,1)==='-'){
      const split = message.split('@'),
            subject = split.shift().replace('-',''),
            attributes = split.shift().split(/,|\s/g);

      this.forget(subject,attributes);
    } //end if
  }
  printIdentity(){
    this.log.push([
      color.magenta('[start] '),
      color.gray('Identity')
    ]);
    this.log.push([
      {class: ['tab'],text:''},
      color.gray('version '),
      color.magentaBold(this.identity.version)
    ]);
    this.log.push([
      {class: ['tab'],text:''},
      color.magenta('[start] '),
      color.gray('Self')
    ]);
    this.log.push([
      {class: ['tab'],text:''},
      {class: ['tab'],text:''},
      color.gray('name '),
      color.magentaBold(this.identity.self.name)
    ]);
    this.log.push([
      {class: ['tab'],text:''},
      {class: ['tab'],text:''},
      color.gray('status '),
      color.magentaBold(this.identity.self.status.join())
    ]);
    this.log.push([
      {class: ['tab'],text:''},
      color.magenta('[end] '),
      color.gray('Self')
    ]);
    this.log.push([
      color.magenta('[end] '),
      color.gray('Identity')
    ]);
    this.log.push([
      color.magenta('[start] '),
      color.gray('Atoms')
    ]);
    Object.keys(this.atoms).forEach(subjectName=>{
      const attributeNames = Object.keys(this.atoms[subjectName]),
            attributeArray = attributeNames.map(attributeName=>{
              const attribute = this.atoms[subjectName][attributeName];

              return [
                color.gray(`${attribute.name}(`),
                color.magentaBold(attribute.value),
                color.gray(') ')
              ];
            }).flat();

      attributeArray.unshift(color.gray(`${subjectName}: `));
      attributeArray.unshift({class: ['tab'],text:''});
      this.log.push(attributeArray);
    })
    this.log.push([
      color.magenta('[end] '),
      color.gray('Atoms')
    ]);
    this.log.push([
      color.yellow('Commands: '),
      color.gray('show, +subject@att1 att2, -subject@att1 att2')
    ]);
  }
}
