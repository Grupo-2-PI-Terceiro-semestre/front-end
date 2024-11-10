export class Pilha {

    private pilha: any[];
    private topo: number;

    constructor() {
        this.pilha = [];
        this.topo = -1;
    }

    push(element) {
        this.pilha.push(element);
        this.topo++;
    }

    pop() {
        const element = this.pilha[this.topo];
        this.pilha.splice(this.topo, 1);
        this.topo--;
        return element;
    }

    peek() {
        return this.pilha[this.pilha.length - 1];
    }

    isEmpty() {
        return this.topo == -1;
    }

    isFull() {
        return this.pilha.length == this.topo;
    }

    getTopo() {
        return this.topo;
    }

    clear() {
        this.pilha = [];
    }
}