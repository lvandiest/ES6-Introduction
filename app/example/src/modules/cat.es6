import * as dateutils from "modules/dateutils";

export class Cat extends Pet {

   constructor(name, breed, color, birthdate) {
      super(name);
      this.breed = breed;
      this.color = color;
      this.birthdate = birthdate;
   }
   
   getInfo() {
   		return `${this.name} is ${dateutils.birthdateToAge(this.birthdate)} a ${this.color} ${this.breed}!`;
   }
   
}