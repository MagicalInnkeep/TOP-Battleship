export class ship {
    constructor(name,size){
        if(size<=0){
            throw new Error("Invalid ship size: Must be bigger then 0")
        }
        this.name   = name;
        this.size   = size;
        this.hits   = 0;

    }

    hit(){
        if(!this.isSunk()){
        this.hits++;
        }
    }

    isSunk(){
        if(this.hits==this.size){
            return true;
        }
        return false;
    }
}