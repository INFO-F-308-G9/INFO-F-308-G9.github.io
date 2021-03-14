
let table;
let gen_pop
let gen_patch_pop;
let nbr_pop
let myChart;
let patch_pop = [];
let fem_off= ["off.fem.p1","off.fem.p2","off.fem.p3","off.fem.p4","off.fem.p5","off.fem.p6","off.fem.p7","off.fem.p8","off.fem.p9"]
let fem_adlt= ["adlt.fem.p1","adlt.fem.p2","adlt.fem.p3","adlt.fem.p4","adlt.fem.p5","adlt.fem.p6","adlt.fem.p7","adlt.fem.p8","adlt.fem.p9"]
let mal_off= ["off.mal.p1","off.mal.p2","off.mal.p3","off.mal.p4","off.mal.p5","off.mal.p6","off.mal.p7","off.mal.p8","off.mal.p9"]
let mal_adlt = ["adlt.mal.p1","adlt.mal.p2","adlt.mal.p3","adlt.mal.p4","adlt.mal.p5","adlt.mal.p6","adlt.mal.p7","adlt.mal.p8","adlt.mal.p9"];

function preload() {
 table = loadTable('../csv/disp1400_extinct210_moyenne.csv', 'csv', 'header');
 //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
 //                  "csv", "header");
 table_1 = loadTable('../csv/patch.csv','csv','header');
}

function setup() {
 const toNumbers = arr => arr.map(Number);
 var off_pop = toNumbers(table.getColumn("off.nbr"));
 var adlt_pop = toNumbers(table.getColumn("adlt.nbr"));
 nbr_pop =(off_pop.map(function (num, idx) {
 return num + adlt_pop[idx];}))
 gen_pop =(table.getColumn("generation"));
 gen_patch_pop =table_1.getColumn("generation");

 var ctx = document.getElementById('line-chart');
  myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: gen_pop,
      datasets: [              { 
          data: nbr_pop,
          label: "Populations",
          borderColor: "#83c5be",
          backgroundColor : "#83c5be ",
          fill: false
          },
          { 
          data: off_pop,
          label: "Nombre d'enfants",
          borderColor: "#006d77",
          backgroundColor : "#006d77",
          fill: false}
                ]
          },            

    options: {
      title: {
        display: true,
        text: "Nombre d'individus par génération d'une population"
      }
    }
  }
);}
