function generateBoard(){
  const $body = $('body');
  let alphaIndex = ['a','b','c','d','e','f','g','h'];
  let color;
  for(let ni=8; ni>=1;ni--){

    for(let ai = 0; ai<8;ai++){

      if(ni%2==0&&ai%2==0){
        color = 'brown';
      }else if (ni%2==1&&ai%2==1){
        color = 'brown';
      }else{
        color = 'darkred'
      }


      $('#boardZone').append(`<div class="square" id="${alphaIndex[ai]}${ni}" style="background-color:${color}"></div>`);
    }

  }
  // colorBoard();
}


generateBoard();
// $('.square').css()
