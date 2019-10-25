export function contraction(word1,word2){

  //not = *n't
  if(word1[word1.length-1]=='n' && word2=='t'){
    return [word1.substring(0,word1.length-1),'not'];

  //let us = let's
  }else if(word1=='let' && word2=='s'){
    return [word1,'us'];

  //I am = I'm
  }else if(word1=='I' && word2=='m'){
    return [word1,'am'];

  //we are, they are, .. = we're , they're, ..
  }else if(word2=='re'){
    return [word1,'are'];

  //Bob is, Larry does, Jenny has, .. = Bob's, Larry's, Jenny's, ..
  }else if(word2=='s'){
    return [word1,'is'];

  //we have, .. = we've, ..
  }else if(word2=='ve'){
    return [word1,'have'];

  //where had, why did, who would, .. = where'd, why'd, who'd, ..
  }else if(word2=='d'){
    return [word1,'had'];

  //he will, .. = he'll, ..
  }else if(word2=='ll'){ 
    return [word1,'will'];

  //of clock, .. = o'clock, ..
  }else if(word1=='o'){ 
    return [word2];
  } //end if
  return false;
} //end contraction()
