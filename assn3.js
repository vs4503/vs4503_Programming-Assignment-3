function myColorTriangle (x0, y0, r0, g0, b0,
                          x1, y1, r1, g1, b1,
                          x2, y2, r2, g2, b2)
{ 
  // insert your code here to draw a triangle with vertices (x0, y0), (x1, y1) and (x2, y2) 
  // with colors (r0, g0, b0), (r1, g1, b1) and (r2, g2, b2) attached to each vertex respectively.
  //
  // Your implementation should interpolate the colors accross the triangle.
  //
  // Only use calls to the function drawColorPoint() which is below the do not edit line
  // This function has the following signature
  
  // your code should be an extension of the myTrangle function from Assignment 2.
  let x = min(x0, x1, x2);
  let y = min(y0, y1, y2);
  let w = max(x0, x1, x2) - x;
  let h = max(y0, y1, y2) - y;

  let y_max = max(y0, y1, y2);
  
  let x_min = min(x0, x1, x2);
  
  for(let j = y_max; j >= y_max - h; j--){
    for(let i = x_min; i <= x_min + w; i++){
      edgeFunction(i,j);  
    }
  }


  function edgeFunction(i,j){
    let e0 = (i - x0) * (y1 - y0) - (j - y0) * (x1 - x0);
    let e1 = (i - x1) * (y2 - y1) - (j - y1) * (x2 - x1);
    let e2 = (i - x2) * (y0 - y2) - (j - y2) * (x0 - x2);

    let w0 = e1;
    let w1 = e2;
    let w2 = e0;

    let area = ((x2 - x0) * (y1 - y0) - (y2 - y0) * (x1 - x0))/2;
    
    if(w0 >= 0 && w1 >= 0 && w2 >= 0){
      w0 /= area;
      w1 /= area;
      w2 /= area;
      
      r = w0*r0 + w1*r1 + w2*r2;
      g = w0*g0 + w1*g1 + w2*g2;
      b = w0*b0 + w1*b1 + w2*b2;

      drawColorPoint(i,j,r,g,b);
    } 
  }
}


function transformTheHouse()
{
  // return a matrix that has all of the transformations of the highest level you reached in the 
  // transformation game of last week's online assignment
  //
  
  // start with the identity matrix
  let identityMatrix = [1, 0, 0, 1, 0, 0];
  
  //Note that in P5.js 2D transformation matrices are represented as (a, b, c, d, e, f) which corresponds to this matrix:
  
//  a c e
//  b d f
//  0 0 1
  
// since the last row is always 0 0 1 it is excluded when specifying the matrices  


  // Using translate(), rotate(), and scale() add your chain of matrices here. Remember the order of operation is from right to left
  
  // Also recall, in P5.js +y is down (in transformation game +y is up)
  // In P5.js +rotation is clockwise (and in radians by default)....in transformation game +rotation is counter-clockwise (and in degrees). 
  
  //angleMode() can be used to change the mode to degrees.
  
// For example, the solution to level 1 which required translating in y by 100, followed by a tranlation in x by 40 would be:
  
//  return translate(40,0) * translate(0,-100) * identityMatrix;

  angleMode(DEGREES);
 
  return translate(0,100) * rotate(225) * identityMatrix;
}

// --------------------------------------------------------------------------------------------
//
//  Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

let doMine;
let scene;
let backgroundColor;

function setup () 
{
  createCanvas (500, 500);
  doMine = true;
  scene = 1;
  backgroundColor = color(150, 150, 150);
  background (backgroundColor);
}

function draw ()
{
  if (scene == 1) doHouse();
  if (scene == 2) doTriangle();
}

//
// fills in the pixel (x, y) with the color (r,g,b)
//
function drawColorPoint (x, y, r, g, b)
{
  stroke (r, g, b);
  point (x,y);
}

function doHouse()
{
  stroke (0,0,0);
  line (0, 250, 500, 250);
  line (250, 0, 250, 500);
  
 
  //resetMatrix();
 translate (250, 250);  
 applyMatrix(transformTheHouse()); 
    
    fill (255, 0, 0);
    stroke (255,0,0);
    triangle (-25, 25, 25, -25, -25, -25);
    triangle (25, 25, 25, -25, -25, 25);
    
    fill (0, 255, 0);
    stroke (0,255,0);
    triangle (-25,-25, 25, -25, 0, -50);
    
    stroke (0,0,255);
    fill (0,0,255);
   triangle (10, 0, 10, 25, 20, 25);
   triangle (10, 0, 20, 25, 20, 0);
}

function doTriangle ()
{
  myColorTriangle (300, 400, 0, 0, 255,
                   400, 100, 0, 255, 0,
                   50, 50, 255, 0, 0);
}

function keyPressed()
{
  if (key == '1') 
  {
    background (backgroundColor);
    scene = 1;
  }
  
  if (key == '2') 
  {
    background (backgroundColor);
    scene = 2;
  }
}