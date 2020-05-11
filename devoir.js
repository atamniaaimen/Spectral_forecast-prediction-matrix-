"use strict";

var ins = 0;

var matrix_Aji = [];
var matrix_Bji = [];
var maxA = 0;
var maxB = 0;
var max_d = 100;
var d = process.argv[2];
var Mjid = [];

var fs = require('fs');
try {
    var dataA = fs.readFileSync('matrixA.txt').toString();
    var dataB = fs.readFileSync('matrixB.txt').toString();
} catch (err) {
    console.error(err);
}
var regex = /\r?\n|\r|\t/;
dataA = dataA.split(regex);
dataB = dataB.split(regex);



for (let i = 0; i < 10; i++) {
    matrix_Aji[i] = [];
    matrix_Bji[i] = [];
    for (let j = 0; j < 20; j++) {
        matrix_Aji[i][j] = parseFloat(dataA[j + ins].replace(/,/g, '.'));
        matrix_Bji[i][j] = parseFloat(dataB[j + ins].replace(/,/g, '.'));
    }
    ins += 20;
}


for (let i = 0; i < 10; i++) {

    if (maxA < Math.max(...matrix_Aji[i])) {
        maxA = Math.max(...matrix_Aji[i]);
    }
    if (maxB < Math.max(...matrix_Bji[i])) {
        maxB = Math.max(...matrix_Bji[i]);
    }

}

var mul_A = d / maxA;
var mul_B = (max_d - d) / maxB;

for (let i = 0; i < 10; i++) {
    Mjid[i] = [];
    for (let j = 0; j < 20; j++) {
        Mjid[i][j] = (mul_A * matrix_Aji[i][j]) + (mul_B * matrix_Bji[i][j])
        //la formule de l'equation(1) par rapport au chaque element de matrice.

    }
    ins += 20;
}


var matrix_output = fs.createWriteStream("Matrix_Mjid.txt");
matrix_output.once('open', function (fd) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 20; j++) {

            matrix_output.write(Mjid[i][j] + '\t');

        }
        matrix_output.write('\n');
    }
    matrix_output.end();
});

var matrix_output_r = fs.createWriteStream("Matrix_Mjid_round.txt");
matrix_output_r.once('open', function (fd) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 20; j++) {
            matrix_output_r.write(Math.round(Mjid[i][j]) + '\t');
        }
        matrix_output_r.write('\n');
    }
    matrix_output_r.end();
});
