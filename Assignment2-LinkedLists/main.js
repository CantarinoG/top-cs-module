import { Node } from './Node.js';
import { LinkedList } from './LInkedList.js';


const list = new LinkedList();

list.append(1);
list.append(2);
list.append(3);

console.log(list.toString());
console.log('Size: ', list.size());


