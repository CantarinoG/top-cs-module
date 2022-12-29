import { Node } from "./Node.js";

export class LinkedList{
    constructor(head = null){
        this.head = head;
    }
    size() {
        let count = 0;
        let node = this.head;
        while(node){
            count++;
            node = node.next;
        }
        return count;
    }
    tail() {
        if(this.head){
        let lastNode = this.head;
        if(lastNode){
            while(lastNode.next){
                lastNode = lastNode.next;
            }
        }
        return lastNode;
    }}
    append(value) {
        let node = new Node(value);
        if(this.head){
        this.tail().next = node;
    } else {
        this.head = node;
    }
}
    prepend(value) {
        if(this.head){
        let node = new Node(value, this.head);
        this.head = node;
    } else {
        this.head = new Node(value);
    }
}
    at(index) {
        if(index < 0 || index > this.size()) return undefined;
        if(this.head){
        let node = this.head; //index 0
        for (let i = 0; i < index; i++){
            
            node = node.next;
        }
        return node;
    }}
    pop() {
        if(this.head){
        let node = this.at(this.size() - 2);
        if(this.size() == 1) this.head = null;
        else node.next = null;
    }}
    contains(value) {
        if(this.head){
        let node = this.head;
        if(node.data == value) return true;
        while(node.next){
            node = node.next;
            if (node.data == value) return true;
        }
        return false;
    } else{
        return false;
    }}
    find(value) {
        if(this.head){
        let index = 0;
        let node = this.head;
        if(node.data == value) return index;
        while(node){
            node = node.next;
            index++;
            if(node && node.data == value) return index;
        }
    }}
    toString() {
        if(this.head){
        let text = "";
        let node = this.head;
        text += `(${node.data}) -> `;
        if(node){
            while(node.next){
                node = node.next;
                text += `(${node.data}) -> `;
            }
        }
        text += "null";
        return text;
    }
}

insertAt(value, index){
    if(this.head){
    if(index > 0  && index <= this.size()){
    let newNode = new Node(value, this.at(index));
    let node = this.at(index - 1);
    node.next = newNode;} else if(index == 0){
        this.prepend(value);
    }
}}

removeAt(index){
    if(this.head){
        if(index > 0 && index < this.size()){
            let node = this.at(index - 1);
            node.next = this.at(index + 1);
    } else if (index == 0){
        this.head = this.at(1);
    }
}

}}