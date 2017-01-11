/*
 * Unit tests for javascript/comscan.js
 *
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

    it('The iterator, loaded with test values, shoudl have an initial highlight value of 4', function() {
        iterator = testiteratorA();
        expect(iterator.getHighlightedNodeID()).toBe(4);
    });


    it('The html table has the word animals in it', function() {
        iterator = testiteratorA();
        iterator.refreshHTML();
        hope = document.getElementById('listtable')
        expect(hope.innerHTML.includes("Animals")).toBe(true)
    });

    it('The highlight can be moved twice and the value there is 43', function() {
        iterator = testiteratorA();
        iterator.move()
        iterator.move()
        hope = document.getElementById('listtable')
        expect(iterator.getHighlightedNodeID()).toBe(43)
    });


    it('The highlight can be moved six and the value there is 43 because it wraps around', function() {
        iterator = testiteratorA();
        iterator.move()
        iterator.move()
        iterator.move()
        iterator.move()
        iterator.move()
        iterator.move()
        hope = document.getElementById('listtable')
        expect(iterator.getHighlightedNodeID()).toBe(43)
    });



    it('the highlight calls a speech function each time it is moved', function() {
        iterator = testiteratorA();
        spyOn(window, "say");
        iterator.move()
        expect(say).toHaveBeenCalled();
        //learned this at http://www.htmlgoodies.com/html5/javascript/spy-on-javascript-methods-using-the-jasmine-testing-framework.html#fbid=KJtVgELupgs
    });



    it('calls the speech function with the right argument each time it is moved', function() {
        iterator = testiteratorA();
        spyOn(window, "say");
        iterator.move()
        expect(say).toHaveBeenCalledWith("Happy");
    });


    it('activating the third button takes us to a new page starting with 99', function() {
        iterator = testiteratorA();
        iterator.move()
        iterator.move()
        iterator.activate()
        expect(iterator.getHighlightedNodeID()).toBe(99)
    });


   it('The back button takes us to the start from the second level', function() {
        iterator = testiteratorA();
        iterator.move()
        iterator.move()
        iterator.activate()
        iterator.move()
        iterator.move()
        iterator.move()
        iterator.activate()
        expect(iterator.getHighlightedNodeID()).toBe(4)
    });


    it('sucessfully deals with three level graphs', function() {
        iterator = testiteratorA();
        iterator.move()
        iterator.move()
        iterator.activate()
	iterator.move()
	iterator.move()
	iterator.activate()
        expect(iterator.getHighlightedNodeID()).toBe(29)
    });

 it('The back button takes us to the second level from the third', function() {
        iterator = testiteratorA();
        iterator.move()
        iterator.move()
        iterator.activate()
        iterator.move()
        iterator.move()
        iterator.activate()
        iterator.move()
        iterator.move()
        iterator.move()
	iterator.activate()
        expect(iterator.getHighlightedNodeID()).toBe(99)
    });


////////////////////////////////////////////////////////////////////////////////
///CK12 tests////////////////////////////////////////////////////////////   
//////////////////////////////////////////////////////////////////////////////////
 it('The iterator, loaded with test values, shoudl have an initial highlight value of 4', function() {
        iterator = getCK12iterator();
        expect(iterator.getHighlightedNode().utterance).toBe("Yes");
    });



 it('The CK12 iterator has been loaded in a raw state', function() {
        expect("Grid" in CK12Raw).toBe(true);
    });


    //here

    it('The html table has -care- in it', function() {
        iterator = getCK12iterator();
        iterator.refreshHTML();
        hope = document.getElementById('listtable')
	console.log(hope.innerHTML)
        expect(hope.innerHTML.includes("Care")).toBe(true)
    });

    it('The highlight can be moved twice and the value there is ActionWords', function() {
        iterator = getCK12iterator();
        iterator.move()
        iterator.move()
        hope = document.getElementById('listtable')
        expect(iterator.getHighlightedNodeLabel()).toBe("Action words")
    });


    it('The highlight can be wrapped around for CK12', function() {
        iterator = getCK12iterator();
	for(j=0;j<14;j++){
        iterator.move()
	}
        hope = document.getElementById('listtable')
        expect(iterator.getHighlightedNodeLabel()).toBe("Yes")
    });



   it('the highlight calls a speech function each time it is moved', function() {
       iterator = getCK12iterator();
       spyOn(window, "say");
       iterator.move()
       expect(say).toHaveBeenCalled();
       //learned this at http://www.htmlgoodies.com/html5/javascript/spy-on-javascript-methods-using-the-jasmine-testing-framework.html#fbid=KJtVgELupgs
   });


    it('Testing CK12 link to action words', function() {
        iterator = getCK12iterator();
        iterator.move()
        iterator.move()
        iterator.activate()
        iterator.move()
        iterator.move()
        expect(iterator.getHighlightedNodeLabel()).toBe("do")
    });


 it('The back button takes us to the start from the second level', function() {
      iterator = getCK12iterator();
        iterator.move()
        iterator.move()
        iterator.activate()//go to action words
		for(j=0;j<15;j++){
        iterator.move()
	}

      iterator.activate()//go back
      iterator.move()//move to somewhere we can tell where we are
      iterator.move()
      expect(iterator.getHighlightedNodeLabel()).toBe("Action words")
  });




it('sucessfully takes us from the third level to the second.', function() {
      iterator = getCK12iterator();
      iterator.move()
      iterator.move()
      iterator.activate()//go to action words
      for(j=0;j<15;j++){
      iterator.move()
      }

      iterator.activate()//more action words
     // expect(iterator.getHighlightedNodeLabel()).toBe("come")//which is on the third level.
      for(j=0;j<16;j++){
	      iterator.move()
      }
      iterator.activate()//back
      iterator.move()
      iterator.move()
      iterator.move()
      expect(iterator.getHighlightedNodeLabel()).toBe("have")

  });


   it('has NO gaps in the dictionary.', function() {
        iterator = getCK12iterator();
	pagesGraph=iterator.graph;
	gap=false
	for (pageID in pagesGraph){
	//	console.log("Key is "+pageID)
		//console.log(pagesGraph[pageID])
		for (item in pagesGraph[pageID]){
//		console.log(pagesGraph[pageID][item].label)
		if (pagesGraph[pageID][item].label==""){
			console.log("XXXXXXXXXXXXXXXXXXXX")
			gap=true	
		}
	} 
}
        expect(gap).toBe(false)
    });


});

function testiteratorA() {
    pagesGraph = {
        0: [new MenuItem(4, "Bashful", "", "Bashful"), new MenuItem(5, "Happy", "", "Happy"), new MenuItem(43,"Animals", "A" , "Animals"), new MenuItem(8, "Frederick", "", "Frederick")],
        "A": [new MenuItem(99, "Apple", "", "Apple"), new MenuItem(2, "Ant", "", "Ant"), new MenuItem(6, "B page","B" , "B page"), new MenuItem(22, "Back","ovf(back())", "")],
        "B": [new MenuItem(29, "Baby", "", "Baby"), new MenuItem(22, "Bot", "", "Bot"), new MenuItem(26, "Boat", "", "Boat"), new MenuItem(21,"Back","ovf(back())", "")]
    }
    return new PagesIterator(pagesGraph);
}

function getCK12iterator(){
//console.log("Enter CK12 parse function")
//starting with CK12Raw, we're going to build outselves a iterator. 
pagesGraph={}
console.log(Object.keys(CK12Raw['Grid']).length)
singlepage=CK12Raw['Grid']["0"]
pagename=singlepage[0]
pagesGraph[pagename]=parseOVFPage(singlepage)
for (i =1;i<Object.keys(CK12Raw['Grid']).length;i++){
	singlepage=CK12Raw['Grid'][""+i]
	pagename=singlepage[0]
	thing=parseOVFPage(singlepage)
	thing.push(new MenuItem(21,"back","ovf(back())",""))
	pagesGraph[pagename]=thing 
}

iterator=new PagesIterator(pagesGraph)
iterator.rootNodeID="toppage"
iterator.currentNode = iterator.graph["toppage"] 
return iterator

}

function parseOVFPage(singlePage){
//console.log("in single page parse")
itemList=[];
var i=0
var j=0
for(i=0;i<4;i++){
	for(j=0;j<4;j++){
		if(singlePage[1][i][j]=="")
			continue
		itemList.push(new MenuItem(i+j,singlePage[1][i][j],singlePage[3][i][j],singlePage[1][i][j]))

	}
}
return itemList

}




