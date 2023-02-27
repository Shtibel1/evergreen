export class Category {
    constructor (
        public name: string,
        public childrens?: Category[],
        public fathers?: Category[]
    ) {}
}