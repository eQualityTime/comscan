/*
 * Unit tests for javascript/comscan.js
 */
describe('Comscan', function() {

    // inject the HTML fixture for the tests
    beforeEach(function() {
        var fixture = '<table id=listtable></table><script language="javascript" src="tests/CK12.js"></script>';
        document.body.insertAdjacentHTML(
            'afterbegin',
            fixture);
    });


    // call the init function of calculator to register DOM elements

    it('The board, loaded with test values, shoudl have an initial highlight value of 4', function() {
        board = testBoardA();
        expect(board.getHighlightedNodeID()).toBe(4);
    });


    it('The html table has the word animals in it', function() {
        board = testBoardA();
        board.refreshHTML();
        hope = document.getElementById('listtable')
        expect(hope.innerHTML.includes("Animals")).toBe(true)
    });

    it('The highlight can be moved twice and the value there is 43', function() {
        board = testBoardA();
        board.move()
        board.move()
        hope = document.getElementById('listtable')
        expect(board.getHighlightedNodeID()).toBe(43)
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
        expect(board.getHighlightedNodeID()).toBe(43)
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
        expect(board.getHighlightedNodeID()).toBe(99)
    });


   it('The back button takes us to the start from the second level', function() {
        board = testBoardA();
        board.move()
        board.move()
        board.activate()
        board.move()
        board.move()
        board.move()
        board.activate()
        expect(board.getHighlightedNodeID()).toBe(4)
    });


    it('sucessfully deals with three level graphs', function() {
        board = testBoardA();
        board.move()
        board.move()
        board.activate()
	board.move()
	board.move()
	board.activate()
        expect(board.getHighlightedNodeID()).toBe(29)
    });

 it('The back button takes us to the second level from the third', function() {
        board = testBoardA();
        board.move()
        board.move()
        board.activate()
        board.move()
        board.move()
        board.activate()
        board.move()
        board.move()
        board.move()
	board.activate()
        expect(board.getHighlightedNodeID()).toBe(99)
    });


////////////////////////////////////////////////////////////////////////////////
///CK12 tests////////////////////////////////////////////////////////////   
//////////////////////////////////////////////////////////////////////////////////
 it('The board, loaded with test values, shoudl have an initial highlight value of 4', function() {
        board = getCK12Board();
        expect(board.getHighlightedNode().utterance).toBe("Yes");
    });



 it('The CK12 board has been loaded in a raw state', function() {
        expect("Grid" in CK12Raw).toBe(true);
    });


    //here

    it('The html table has -care- in it', function() {
        board = getCK12Board();
        board.refreshHTML();
        hope = document.getElementById('listtable')
	console.log(hope.innerHTML)
        expect(hope.innerHTML.includes("Care")).toBe(true)
    });
//
//    it('The highlight can be moved twice and the value there is 43', function() {
//        board = getCK12Board();
//        board.move()
//        board.move()
//        hope = document.getElementById('listtable')
//        expect(board.getHighlightedNodeID()).toBe(43)
//    });
//
//
//    it('The highlight can be moved six and the value there is 43 because it wraps around', function() {
//        board = getCK12Board();
//        board.move()
//        board.move()
//        board.move()
//        board.move()
//        board.move()
//        board.move()
//        hope = document.getElementById('listtable')
//        expect(board.getHighlightedNodeID()).toBe(43)
//    });
//
//
//
//    it('the highlight calls a speech function each time it is moved', function() {
//        board = getCK12Board();
//        spyOn(window, "say");
//        board.move()
//        expect(say).toHaveBeenCalled();
//        //learned this at http://www.htmlgoodies.com/html5/javascript/spy-on-javascript-methods-using-the-jasmine-testing-framework.html#fbid=KJtVgELupgs
//    });
//
//
//
//    it('calls the speech function with the right argument each time it is moved', function() {
//        board = getCK12Board();
//        spyOn(window, "say");
//        board.move()
//        expect(say).toHaveBeenCalledWith("Happy");
//    });
//
//
//    it('activating the third button takes us to a new page starting with 99', function() {
//        board = getCK12Board();
//        board.move()
//        board.move()
//        board.activate()
//        expect(board.getHighlightedNodeID()).toBe(99)
//    });
//
//
//   it('The back button takes us to the start from the second level', function() {
//        board = getCK12Board();
//        board.move()
//        board.move()
//        board.activate()
//        board.move()
//        board.move()
//        board.move()
//        board.activate()
//        expect(board.getHighlightedNodeID()).toBe(4)
//    });
//
//
//    it('sucessfully deals with three level graphs', function() {
//        board = getCK12Board();
//        board.move()
//        board.move()
//        board.activate()
//	board.move()
//	board.move()
//	board.activate()
//        expect(board.getHighlightedNodeID()).toBe(29)
//    });
//
// it('The back button takes us to the second level from the third', function() {
//        board = getCK12Board();
//        board.move()
//        board.move()
//        board.activate()
//        board.move()
//        board.move()
//        board.activate()
//        board.move()
//        board.move()
//        board.move()
//	board.activate()
//        expect(board.getHighlightedNodeID()).toBe(99)
//    });
//
//


});

function testBoardA() {
    pagesGraph = {
        0: [new MenuItem(4, "Bashful", "", "Bashful"), new MenuItem(5, "Happy", "", "Happy"), new MenuItem(43,"Animals", "A" , "Animals"), new MenuItem(8, "Frederick", "", "Frederick")],
        "A": [new MenuItem(99, "Apple", "", "Apple"), new MenuItem(2, "Ant", "", "Ant"), new MenuItem(6, "B page","B" , "B page"), new MenuItem(22, "Back","ovf(back())", "")],
        "B": [new MenuItem(29, "Baby", "", "Baby"), new MenuItem(22, "Bot", "", "Bot"), new MenuItem(26, "Boat", "", "Boat"), new MenuItem(21,"Back","ovf(back())", "")]
    }
    return new Board(pagesGraph);
}

function getCK12Board(){

//starting with CK12Raw, we're going to build outselves a board. 

pagesGraph={0: parseOVFPage(CK12Raw['Grid']['0'])}
return new Board(pagesGraph)

}

function parseOVFPage(singlePage){
itemList=[];
for(i=0;i<4;i++){
	for(j=0;j<4;j++){
		itemList.push(new MenuItem(i+j,singlePage[1][i][j],singlePage[3][i][j],singlePage[1][i][j]))

	}
}
return itemList

}




