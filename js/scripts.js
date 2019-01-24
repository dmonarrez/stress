var maze = [];


function done() {
  for(let i=0; i<maze.length; ++i) {
    if(maze[i].includes(0)){
      return false;
    }
  }
  return true;
}

function neighbor(row, column){
  let neighbors = [];
  if(row + 1 < maze.length) {
    if(maze[row + 1][column] === 0) {
      neighbors.push([(row + 1).toString(), column.toString(), "bottom"]);
    }
  }
  if(row - 1 >= 0) {
    if(maze[row - 1][column] === 0) {
      neighbors.push([(row - 1).toString(), column.toString(), "top"]);
    }
  }
  if (column + 1 < maze.length) {
    if (maze[row][column + 1] === 0) {
      neighbors.push([(row).toString(), (column+1).toString(), "right"]);
    }
  }
  if (column - 1 >= 0) {
    if (maze[row][column - 1] === 0) {
      neighbors.push([(row).toString(), (column-1).toString(), "left"]);
    }
  }
  return neighbors;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


$(document).ready(function(){

  $("#generate").click(function(){

    // Reset maze array
    maze = [];
    let input = parseInt($("#size").val());
    for(var i = 0; i < input; i++){
      let arr = [];
      for(var j = 0; j < input; j++){
        arr.push(0);
      }
      maze.push(arr);
    }

    //reset HTML table
    $("tr").remove();
    for(var i = 0; i < input; i++){

      let data = '';
      for(var j = 0; j < input; j++) {
        data = data + ("<td id='" + i.toString() + j.toString() + "'></td>");
      }

      $("#maze").append("<tr>" + data + "</tr>");
    }
    $("td").css('width', (1000/input) + "px");
    $("td").css('height', (1000/input) + "px");


    //break down walls
    function x(row, column) {
      maze[row][column] = 1;
      if(done() === true) {
        return;
      }
      let neighborList = neighbor(row, column);
      neighborList = shuffle(neighborList);
      if(neighborList.length !== 0) {
        neighborList.forEach(function (n) {

          let tr = n[0];
          let tc = n[1];

          if(maze[parseInt(tr)][parseInt(tc)] === 0) {
            switch(n[2]) {
              case "right":
                $("#" + row + (column+1)).addClass("no-left");
                break;
              case "left":
                $("#" + row + column).addClass("no-left");
                break;
              case "top":
                $("#" + (row-1) + column).addClass("no-bottom");
                break;
              case "bottom":
                $("#" + row + column).addClass("no-bottom");
                break;
            }
          }

          x(parseInt(tr), parseInt(tc));

        });
        //let n = neighborList[Math.floor(Math.random() * neighborList.length)];  // select random neighbor
        //let tr = n.charAt(0);
        //let tc = n.charAt(1);

        // remove wall between current and chosen wall
      }
      else {

        return;
      }
    }
    x(0, 0);

  });
});
