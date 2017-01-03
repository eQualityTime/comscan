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
        board = testBoardA();
        expect(board.getHighlight()).toBe(4);
    });


    it('The html table has the number 43 in it', function() {
        board = testBoardA();
        board.refreshHTML();
        hope = document.getElementById('listtable')
        expect(hope.innerHTML.includes("43")).toBe(true)
    });

    it('The highlight can be moved twice and the value there is 43', function() {
        board = testBoardA();
        board.move()
        board.move()
        hope = document.getElementById('listtable')
        expect(board.getHighlight()).toBe(43)
    });


    it('The highlight can be moved six and the value there is 43 because it wraps around', function() {
        board = testBoardA();
        board.move()
        board.move()
        board.move()
        board.move()
        board.move()
        board.move()
        hope = document.getElementById('listtable')
        expect(board.getHighlight()).toBe(43)
    });



    it('the highlight calls a speech function each time it is moved', function() {
        board = testBoardA();
        spyOn(window, "say");
        board.move()
        expect(say).toHaveBeenCalled();
        //learned this at http://www.htmlgoodies.com/html5/javascript/spy-on-javascript-methods-using-the-jasmine-testing-framework.html#fbid=KJtVgELupgs
    });



    it('calls the speech function with the right argument each time it is moved', function() {
        board = testBoardA();
        spyOn(window, "say");
        board.move()
        expect(say).toHaveBeenCalledWith("Happy");
    });


    it('activating the third button takes us to a new page starting with 99', function() {
        board = testBoardA();
        board.move()
        board.move()
        board.activate()
        expect(board.getHighlight()).toBe(99)
    });

    //here



});

function testBoardA() {

    pagesGraph = {
        0: [new MenuItem(4,"", "Bashful"), new MenuItem(5,"", "Happy"), new MenuItem(43,"A", "Animals"), new MenuItem(8,"", "Frederick")],
        "A": [new MenuItem(99,"", "Apple"), new MenuItem(2,"", "Ant"), new MenuItem(6,"", "Answer"), new MenuItem(-1,"", "")]
    }

    return new Board(pagesGraph);


}
