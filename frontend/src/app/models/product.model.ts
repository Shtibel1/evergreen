export class Product {
    constructor(
        public _id: string,
        public name: string, 
        public description: string,
        public photoUrl: string[],
        public price: number,
        public category: string,
        ){}
}