#! /usr/bin/node

let obj = {A : 1, B : 2, C : 3, D : 4};

let swap = (o,r={})=> Object.keys(o).map(x=>r[o[x]]=x)&&r;

console.log(swap(obj));
