// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// Factory function for creating objects
// Need to insure specimenNum is different for each specimen
const specimenNumTracker =[];
const pAequorFactory = (specimenNum, dna) => {
  if(specimenNumTracker.some(element =>{
    return element === specimenNum;
  })){
    console.log("This specimen number has already been used");
  }else{
    specimenNumTracker.push(specimenNum);
    return{
      specimenNum: specimenNum,
      dna: dna,
      mutate (){
        //this.dna[Math.floor(Math.random () *15)] = returnRandBase();
        //console.log(dna);
        let randomBase = '';
        let randomIndex = 0;
        while(randomBase !== this.dna[randomIndex]){
          randomBase = returnRandBase();
          randomIndex = Math.floor(Math.random () *15);
          if(this.dna[randomIndex] !== randomBase){
            this.dna[randomIndex] = randomBase;
          };
        };
        return this.dna;
      },
      compareDNA (pObject){
        let counter = 0;
        for(let i = 0; i < this.dna.length; i++){
          if(this.dna[i] === pObject.dna[i]){
            counter++;
          };
        }
        const percentInCommon = (counter/15) * 100;
        console.log(`Specimen ${this.specimenNum} and Specimen ${pObject.specimenNum} have ${percentInCommon.toFixed(2)}% DNA in common.`);
      },
      willLikelySurvive(){
        let counter = 0; 
        for(let i=0; i<this.dna.length; i++){
          if(this.dna[i] === 'C' || this.dna[i] === 'D'){
            counter++;
          }
        };
        return ((counter/15)*100 > 60);
      }
    }
  }
};
  


const petriDish = ()=>{
  const survivors = [];
  let counter = 1;
  do{
  let testSpecimen = pAequorFactory(counter, mockUpStrand());
  if(testSpecimen.willLikelySurvive()){
    survivors.push(testSpecimen);
  }
  counter++; 
  }while(survivors.length < 30);
  return survivors;
}

/*const test = pAequorFactory(1, mockUpStrand());
console.log(test);
console.log(test.mutate());
const da = pAequorFactory(5, mockUpStrand());
console.log(da);
test.compareDNA(da);
console.log(test.willLikelySurvive());*/
console.log(petriDish());