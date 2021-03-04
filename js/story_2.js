
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
 table = loadTable('../csv/second_story_moyenne.csv', 'csv', 'header');
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
          borderColor: "#3e95cd",
          backgroundColor : "#3e95cd ",
          fill: false
          },
          { 
          data: off_pop,
          label: "Nombre d'enfants",
          borderColor: "#8e5ea2",
          backgroundColor : "#8e5ea2",
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
);
  var ctx_1 = document.getElementById('pie-chart');
  extrate = table_1.getColumn("extrate")
  print(extrate[ extrate.length-1])
  myChart = new Chart(ctx_1, {
    type: 'pie',
    data: {
      label:"Proportions de Patchs ",
      datasets: [
          { 
          data: [extrate[ extrate.length-1],1-extrate[ extrate.length-1]],
          backgroundColor : ["#c45850","#3cba9f"],
          borderColor: ["#c45850","#3cba9f"],
          fill: false
        }],
      labels: ["Eteints","Vivant"]
   },            

    options: {
      title: {
        display: true,
        text: "Proportion de Patchs"
      }
    }
  });
print(fem_adlt[1]);
// code pour la somme des off et adlt des différents patchs
for (i = 0, len = mal_adlt.length; i < len; i++){
var f_off = toNumbers(table_1.getColumn(fem_off[i]));
var m_off = toNumbers(table_1.getColumn(mal_off[i]))
var f_adlt = toNumbers(table_1.getColumn(fem_adlt[i]));
var m_adlt = toNumbers(table_1.getColumn(mal_adlt[i]));
patch_pop.push((f_adlt.map(function (num, idx) {
return num + m_adlt[idx]   + f_off[idx] + m_off[idx];}))) }
print(patch_pop[0][0]);


var ctx1 = document.getElementById('line1-chart');
  myChart = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: gen_pop,
      datasets: [              {
          data: patch_pop[0],
          label: "Patch 1",
          borderColor: "#3e95cd",
          backgroundColor : "#3e95cd ",
          fill: false
          },
          {
          data: patch_pop[1],
          label: "Patch 2",
          borderColor: "#8e5ea2",
          backgroundColor : "#8e5ea2",
          fill: false},
          {
          data: patch_pop[2],
          label: "Patch 3",
          borderColor: "#c45850",
          backgroundColor : "#8e5ea2",
          fill: false},
          {
          data: patch_pop[3],
          label: "Patch 4",
          borderColor: "#e8c3b9",
          backgroundColor : "#8e5ea2",
          fill: false},
          {
          data:patch_pop[4],
          label: "Patch 5",
          borderColor: "#3cba9f",
          backgroundColor : "#8e5ea2",
          fill: false},
          {
          data: patch_pop[5],
          label: "Patch 6",
          borderColor: "#e8c3b9",
          backgroundColor : "#8e5ea2",
          fill: false},
          {
          data: patch_pop[6],
          label: "Patch 7",
          borderColor: "#8e5ea2",
          backgroundColor : "#e8c3b9",
          fill: false},
          {
          data: patch_pop[7],
          label: "Patch 8",
          borderColor: "#8e5ea2",
          backgroundColor : "#8e5ea2",
          fill: false},
          {
          data: patch_pop[8],
          label: "Patch 9",
          borderColor: "#8e5ea2",
          backgroundColor : "#8e5ea2",
          fill: false},

                ]
          },

    options: {
      title: {
        display: true,
        text: "Nombre d'individus par génération d'une population"
      }
    }
  }
);

};