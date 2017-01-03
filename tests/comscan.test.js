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
	board=testBoardA();
	expect(board.getHighlight()).toBe(4);
  });


it('The html table has the number 43 in it', function(){
	board=testBoardA();
	board.refreshHTML();
	hope= document.getElementById('listtable')
	expect(hope.innerHTML.includes("43")).toBe(true)
});

it('The highlight can be moved twice and the value there is 43', function(){
	board=testBoardA();
	board.move()
	board.move()
	hope= document.getElementById('listtable')
	expect(board.getHighlight()).toBe(43)
});


it('The highlight can be moved six and the value there is 43 because it wraps around', function(){
	board=testBoardA();
	board.move()
	board.move()
	board.move()
	board.move()
	board.move()
	board.move()
	hope= document.getElementById('listtable')
	expect(board.getHighlight()).toBe(43)
});



it('the highlight calls a speech function each time it is moved', function(){
	board=testBoardA();
	spyOn(window, "say");
	board.move()
	expect(say).toHaveBeenCalled();
//learned this at http://www.htmlgoodies.com/html5/javascript/spy-on-javascript-methods-using-the-jasmine-testing-framework.html#fbid=KJtVgELupgs
});



it('calls the speech function with the right argument each time it is moved', function(){
	board=testBoardA();
	spyOn(window, "say");
	board.move()
	expect(say).toHaveBeenCalledWith("Happy");
});




});

function testBoardA()
{
return new Board([4, 5, 43, 8 ],["Bashful", "Happy", "Leaslal", "Frederick"]);


}
