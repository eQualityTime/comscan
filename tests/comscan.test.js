/*
 * Unit tests for javascript/comscan.js
 */

describe('Comscan', function() {

  // inject the HTML fixture for the tests
  beforeEach(function() {
    var fixture = '<table id=listtable></table>';
    document.body.insertAdjacentHTML(
      'afterbegin', 
      fixture);
  });


  // call the init function of calculator to register DOM elements

  it('The board, loaded with test values, shoudl have an initial highlight value of 4', function() {
var	board=new Board(testBoardA());
	expect(board.getHighlight()).toBe(4);
  });


it('The html table has the number 43 in it', function(){
	board=new Board(testBoardA());
	board.refreshHTML();
	hope= document.getElementById('listtable')
	expect(hope.innerHTML.includes("43")).toBe(true)
});

it('The highlight can be moved twice and the value there is 43', function(){
	board=new Board(testBoardA());
	board.move()
	board.move()
	hope= document.getElementById('listtable')
	expect(board.getHighlight()).toBe(43)
});
});

function testBoardA()
{
return [4, 5, 43, 8, 3 , 2 ];


}
