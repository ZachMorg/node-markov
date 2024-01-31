/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    console.log(this.words);
    this.chains = {};
    let prevWords = [];
    for(let i = 0; i < this.words.length-1; i++){
      if(prevWords.includes(this.words[i])){
        let newValue = this.chains[this.words[i]];
        newValue.push(this.words[i+1]);
        this.chains[this.words[i]] = newValue;
      }
      else{
        this.chains[this.words[i]] = this.words[i+1].split();
        prevWords.push(this.words[i]);
      }
    }
    this.chains[this.words[this.words.length-1]] = null;
    console.log(this.chains)
  }


  /** return random text from chains */
  static ranChoice(range){
    return Math.floor(Math.random() * range)
  }

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    console.log(keys);
    let key = keys[MarkovMachine.ranChoice(keys.length)];
    console.log(key);
    let out = [];
    let sen = true;

    out.push(key);
    while(out.length<numWords && sen){
      let values = this.chains[key];
      if(values !== null && values.length > 1){
        let value = values[MarkovMachine.ranChoice(values.length)];
        out.push(value);
        key = value;
      }
      else if(values !== null){
        let value = values[0]
        out.push(value);
        key = value;
      }
      else{
        sen = false;
      }
    }
    return out.join(' ');
  }
}

module.exports = {
  MarkovMachine,
};