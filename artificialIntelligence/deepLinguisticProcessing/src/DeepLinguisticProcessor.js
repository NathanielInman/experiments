import {types} from './grammerTypes';
import {lexicon} from './grammerLexicon/';
import {dictionary} from './dictionary/';

export class DeepLinguisticProcessor{
  constructor(){
    this.types = types;
    this.lexicon = lexicon;
    this.dictionary = dictionary;
  }
  process(data){
    const words = [];

    data
      .replace(/[,\.;']+/g,c=> ` ${c} `)
      .trim()
      .split(/[\s]+/)
      .forEach((word,index,splitData)=>{
        let typeIds = this.types.find(t=>t.name==='Unknown').id,
            color = '#003f5c';

        if(!isNaN(+word)){
          typeIds = this.dictionary.$[word];
          color = '#374c80';
        }else if(!word.substring(0,1).toLowerCase().match(/[a-zA-Z]/g)){
          typeIds = this.dictionary._[word];
          color = '#7a5195';
        }else if(this.dictionary[word.substring(0,1).toLowerCase()][word]){
          typeIds = this.dictionary[word.substring(0,1).toLowerCase()][word];
          color = '#bc5090';
        }else if(this.dictionary[word.substring(0,1).toLowerCase()][word.toLowerCase()]){
          typeIds = this.dictionary[word.substring(0,1).toLowerCase()][word.toLowerCase()];
          color = '#ef5675';
        } //end if
        words.push({
          word,
          color: Array.isArray(typeIds)?'#ff764a':color,
          types: Array.isArray(typeIds)?
            typeIds.map(id=>this.types.find(type=>type.id===id).name).join():
            this.types.find(type=>type.id===typeIds).name,
        });

        if(index>1&&splitData[index-1]==='\''){
          const attempt = this.types.find(t=> t.name==='Contraction')
            .fn(splitData[index-2],splitData[index]);

          if(!attempt) return;
          words.pop(); words.pop(); words.pop();
          words.push({
            types: 'Contraction',
            color:'#ffa600',
            word:`${splitData[index-2]}'${splitData[index]}`
          });
        } //end if
      });
    return words;
  }
}
