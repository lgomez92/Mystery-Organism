// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate() {  // Returns new dna strand changing one randomly base
      let randomIndex = Math.floor(Math.random() * this.dna.length);  
      console.log(`base to mutate: ${randomIndex}`);
      let newDna = this.dna;  
      let newBase = returnRandBase();   
      do {
        newBase = returnRandBase();
      } while (this.dna[randomIndex] === newBase)  
      newDna[randomIndex] = newBase;
      return newDna;
    },
    compareDNA(strand2) {  // Compares two strands and find how much % they have in common
      let sameElementCount = 0;
      let finalPercentage;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === strand2.dna[i]) {
          sameElementCount++;
        }
      }
      console.log(`Amount of the same bases at the same locations: ${sameElementCount}`);
      finalPercentage = Math.round((sameElementCount / this.dna.length) * 100);
      console.log(`Specimen ${this.specimenNum} and Specimen ${strand2.specimenNum} have ${finalPercentage}% DNA in common\n`);
    },
    willLikelySurvive() { // Checks to see if the strand have at least 60% of C or G bases if it does it will survive
      let count = 0;
      let survivePerc;
      for(let i = 0; i < this.dna.length; i++) {
        if(this.dna[i] === 'C' || this.dna[i] === 'G') {
          count++;
        }
      }
      survivePerc = Math.round((count / this.dna.length) * 100);
      return survivePerc >= 60 ? true : false;
    },
    complementStrand() {  //Returns complementary DNA strands
      let completementaryStrand = [];
      for(i = 0; i < this.dna.length; i++) {
        switch(this.dna[i]) {
          case 'A':
            completementaryStrand[i] = 'T';
            break;
          case 'T':
            completementaryStrand[i] = 'A';
            break;
          case 'C':
            completementaryStrand[i] = 'G';
            break;
          case 'G':
            completementaryStrand[i] = 'C';
            break;
          default:
            console.log( `Error`);
            break;
        }
      }
      return completementaryStrand;
    },
  };
}

// Creates 30 strands and test make sure they all survived
  let survivedDNA = [];
  let specimenNumber = 0;
  let newDNA;
  while (survivedDNA.length < 5) {
    newDNA = pAequorFactory(specimenNumber + 1, mockUpStrand());
    if(newDNA.willLikelySurvive()) {
      survivedDNA.push(newDNA);
      specimenNumber++;
    }
  }
  
  let strand1 = pAequorFactory(1, mockUpStrand());  
  console.log(`Specimen ${strand1.specimenNum}: ${strand1.dna}`);
  let mutatedStrand1 = strand1.mutate(); 
  console.log(`Mutated Specimen ${strand1.specimenNum}: ${mutatedStrand1}\n`);
  
  let strand2 = pAequorFactory(2, mockUpStrand());
  console.log(`Specimen ${strand2.specimenNum}: ${strand2.dna}\n`);
  strand1.compareDNA(strand2);
  
  console.log(`Specimen ${strand1.specimenNum}: ${strand1.dna}`);
  let compStrand = strand1.complementStrand();
  console.log(`Complementary: ${compStrand}`);
   