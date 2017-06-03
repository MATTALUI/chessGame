$(document).ready(()=>{
  generateBoard();
  $('.square').css('height', $('#a1').css('width'));
  $('#boardZone').on('click','.piece', handlePieceClick);
  $('#boardZone').on('click','.square', handleSquareClick);
  $('#newGame').on('click', ()=>{
    $.ajax({
    url: 'http://54.241.184.191/board/0',
    type: 'DELETE',
    success: function(result) {
        setGameState(result);
      }
    });
  });
  $.get('http://54.241.184.191/board/0', (data)=>{
    setGameState(data);
  })

});
$(window).resize(()=>{
    $('.square').css('height', $('#a1').css('width'));
});


function movePiece(from, to){
  let move = {
    'to': to,
    'from': from
  }
  $.ajax({
    type: "POST",
    url: "http://54.241.184.191/board/0",
    data: JSON.stringify(move),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data){
      console.log(move);
      setGameState(data);
      $('.active').removeClass('active');
    },
    failure: function(errMsg) {
        console.log('meow');
    },
    error: function(response){
      console.log('ruff');
      console.log(response);
    }});

}
function handlePieceClick(){
  let squareOn = $(event.target).parent();
  let isThereAnActiveSquare = ($('.active').length !== 0);
  if ($(event.target).parent().hasClass('active')){
    $(squareOn).toggleClass('active');
    return;
  }
  if(isThereAnActiveSquare){
    let selectedTeam = $('.active').children()[0].dataset.team;
    if(event.target.dataset.team != selectedTeam){
      let from = $('.active').attr('id')
      let to = $(event.target).parent().attr('id')
      movePiece(from,to);
    }else{
      $('.active').toggleClass('active');
      $(squareOn).toggleClass('active');
    }
  }else{
    $('.active').toggleClass('active');
    $(squareOn).toggleClass('active');
  }

}
function handleSquareClick(){
  let $squareClicked = $(event.path.reverse()[5]);
  let isThereAnActiveSquare = ($('.active').length !== 0);
  if ($squareClicked.children().length === 0 && isThereAnActiveSquare){
    let to = event.target.id;
    let from = $('.active').attr('id');
    movePiece(from, to);
  }
}
function addPiece(pieceType, color, location){
  $(`#${location}`).html(`<img src="pieces/${color}${pieceType}.png" class="piece" data-team="${color}" data-piece="${pieceType}">`);
}
function setGameState(state){
  if (validateGameState(state)){
    clearBoard();
    // console.log('das some good data');
    let numberOfSquares = $('.square').length
    let squareIndex = 0;
    for (let row = 0; row< 8; row++){
      for (let col =0; col<8; col++){
        if(state[row][col] !== ''){
          let parsed = parseShorthand(state[row][col][0], state[row][col][1]);
          let color = parsed.split('-')[0];
          let type = parsed.split('-')[1];
          addPiece(type, color, $('.square')[squareIndex].id);
          squareIndex++;
        }else{
          squareIndex++;
        }
      }
    }
  }
}
function validateGameState(state){
  if (state.length != 8){
    return false;
  }
  for (let i = 0; i<state.length;i++){
    if (state[i].length != 8){
      return false;
    }
  }
  return true;
}
function clearBoard(){
  $('.square').empty();
}
function generateBoard(){
  const $body = $('body');
  let alphaIndex = ['a','b','c','d','e','f','g','h'];
  let color;
  for(let ni=8; ni>=1;ni--){

    for(let ai = 0; ai<8;ai++){

      if(ni%2==0&&ai%2==0){
        color = 'light';
      }else if (ni%2==1&&ai%2==1){
        color = 'light';
      }else{
        color = 'dark'
      }


      $('#boardZone').append(`<div class="square ${color}" id="${alphaIndex[ai]}${ni}"></div>`);
    }

  }
}
function parseShorthand(c, p){
  let color;
  let piece;
  switch (c){
    case 'b':
      color = 'black';
      break;
    case 'w':
      color = 'white';
      break;
  }
  switch (p){
    case 'p':
      piece = 'pawn';
      break;
    case 'r':
      piece = 'rook';
      break;
    case 'n':
      piece = 'knight';
      break;
    case 'b':
      piece = 'bishop';
      break;
    case 'q':
      piece = 'queen';
      break;
    case 'k':
      piece = 'king';
      break;
  }
  return `${color}-${piece}`;
}
// deletable functions...
// function setPieces(){
//   for(let i=0; i<8;i++){
//     let letters = ['a','b','c','d','e','f','g','h'];
//     addPiece('pawn','black',`${letters[i]}7`);
//     addPiece('pawn','white',`${letters[i]}2`);
//   }
//   addPiece('rook', 'white', 'a1');
//   addPiece('rook', 'white', 'h1');
//   addPiece('rook', 'black', 'a8');
//   addPiece('rook', 'black', 'h8');
//   addPiece('knight', 'white', 'b1');
//   addPiece('knight', 'white', 'g1');
//   addPiece('knight', 'black', 'b8');
//   addPiece('knight', 'black', 'g8');
//   addPiece('king', 'white', 'e1');
//   addPiece('king', 'black', 'e8');
//   addPiece('bishop', 'white', 'c1');
//   addPiece('bishop', 'white', 'f1');
//   addPiece('bishop', 'black', 'c8');
//   addPiece('bishop', 'black', 'f8');
//   addPiece('queen', 'white', 'd1');
//   addPiece('queen', 'black', 'd8');
// }
// function removePiece(location){
//   $(`#${location}`).html('')
// }
// function getGameState(){
//   let board = [];
//   let currentRow = [];
//   let numberOfSquares = $('.square').length;
//   for (let i =0; i<numberOfSquares;i++){
//     let currentSquare = $('.square')[i];
//     if($(currentSquare).children().length === 0){
//       currentRow.push('');
//     }else{
//       let type;
//       let thePiece = $(currentSquare).children();
//       if ($(thePiece).data().piece === 'knight'){
//         type = 'n';
//       }else{
//         type = $(thePiece).data().piece[0];
//       }
//       let color = $(thePiece).data().team[0];
//       currentRow.push(`${color}${type}`);
//       // [color, type]
//     }
//     if(currentRow.length === 8){
//       board.push(currentRow);
//       currentRow = [];
//     }
//   }
//   return board;
// }
