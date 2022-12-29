function fibs(n) {

    const first = 0;
    const second = 1;
    let array = [first, second];

    if (n <= 0) return null;
    if (n == 1) return [first];
    if (n == 2) return array;
    else {
        for(let i = 3; i <= n; i++){
            let newNumber = array[i-3] + array[i-2];
            array.push(newNumber);
            
        }
        return array;
    }
}

console.log(fibs(8)); //[0, 1, 1,  2, 3, 5, 8, 13]

function fibsRec(n) {

    const first = 0;
    const second = 1;
    let array = [first, second];

    if (n <= 0) return null;
    if (n == 1) return [first];
    if (n == 2) return array;
    else {

        let array = fibsRec(n-1);
        let newNumber = array[n-3] + array[n-2];
        array.push(newNumber);

        return array;
            
    }

}

console.log(fibsRec(8)); //[0, 1, 1, 2, 3, 5, 8]