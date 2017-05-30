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
  // colorBoard();
}
function addPiece(pieceType, color, location){
  $(`#${location}`).html(`<img src="pieces/${color}${pieceType}.png" class="piece ${pieceType}">`);

}
function removePiece(location){
  $(`#${location}`).html('')
}
function movePiece(from, to){
  $('.active').removeClass('active');
  $(`#${to}`).html($(`#${from}`).html());
  $(`#${from}`).html('');
  let newPiece = $(`#${to}`).children()[0];
  console.log(newPiece);
  $(newPiece).on('click', addListener);
}
function setPieces(){
  for(let i=0; i<8;i++){
    let letters = ['a','b','c','d','e','f','g','h'];
    addPiece('pawn','black',`${letters[i]}7`);
    addPiece('pawn','white',`${letters[i]}2`);
  }
  addPiece('rook', 'white', 'a1');
  addPiece('rook', 'white', 'h1');
  addPiece('rook', 'black', 'a8');
  addPiece('rook', 'black', 'h8');
  addPiece('knight', 'white', 'b1');
  addPiece('knight', 'white', 'g1');
  addPiece('knight', 'black', 'b8');
  addPiece('knight', 'black', 'g8');
  addPiece('king', 'white', 'e1');
  addPiece('king', 'black', 'e8');
  addPiece('bishop', 'white', 'c1');
  addPiece('bishop', 'white', 'f1');
  addPiece('bishop', 'black', 'c8');
  addPiece('bishop', 'black', 'f8');
  addPiece('queen', 'white', 'd1');
  addPiece('queen', 'black', 'd8');
  $('.piece').on('click', addListener);

}
function addListener(){
  console.log(event.target.className.split(' ')[1]);
  let square = $(event.target).parent()[0];
  $('.active').removeClass('active');
  $(square).addClass('active');
}

$(window).resize(function(){
    // console.log($('#a1').css('width'));
    $('.square').css('height', $('#a1').css('width'));

});
$(document).ready(()=>{
  generateBoard();
  $('.square').css('height', $('#a1').css('width'));
  setPieces();
})


// $('.square').css()
