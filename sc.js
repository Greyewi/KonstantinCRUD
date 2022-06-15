function add(getX, getY, cb) {
  let x, y;
  getX( function(xVal){
    x = xVal;
    // оба значения готовы?
    if (y != undefined) {
      console.log('inside getX')
      cb( x + y ); // сложить значения
    }
  } );
  getY( function(yVal){
    y = yVal;
    // оба значения готовы?
    if (x != undefined) {
      console.log('inside getY')
      cb( x + y ); // сложить значения
    }
  } );
}

// `fetchX()` и`fetchY()` могут быть синхронными или асинхронными
// functions

const fetchX = (cb) =>{

  setTimeout(() => {
    cb(5)
  }, 3000)
}

const fetchY = (cb) =>{
  setTimeout(() => {
    cb(7)
  }, 3000)

}

add( fetchX, fetchY, function(sum){
  console.log( sum ); // это было просто, да?
} );