window.comscan = window.comscan || {};

function say(message) {
    //alert("say what you want!")//stup

}


function MenuItem(inid,inlabel, inlink, inUtterance){
//Holds the information for a single unit that can be activated. 
	this.id=inid
	this.label=inlabel
	this.link=inlink
	this.utterance=inUtterance||inlabel
}

function PagesIterator(targetGraph) {
    this.rootNodeID=0
    this.childIndex = 0;//initialisation
    this.graph = targetGraph;//currently a dictionary of node IDs to lists of attributes. 
    this.currentNode = this.graph[this.rootNodeID]
    this.backStack=[];//stores breadcrumbs to work a multi-level 'back' button. 

    this.getHighlightedNode= function() {
	    return this.currentNode[this.childIndex];//returns a list of MenuItem objects
    }
    this.getHighlightedNodeLabel = function() {
        return this.getHighlightedNode().label;
    };

    this.getHighlightedNodeID = function() {
        return this.getHighlightedNode().id;
    };



    this.refreshHTML = function() {
	console.log("Entering refreshHTML")
        listtable = document.getElementById('listtable');
	listtable.innerHTML=""
        for (child = 0; child < this.currentNode.length; child++) {
	    if (child==this.childIndex){
            listtable.innerHTML += "<tr><td style= \"color:red\">" + this.currentNode[child].label + "</tr></td>";
	}else{
            listtable.innerHTML += "<tr><td>" + this.currentNode[child].label + "</tr></td>";
	}

	}
    }

    this.move = function() {
	console.log("Move Function Activated")
        this.childIndex++;
        if (this.childIndex == this.currentNode.length) {
            this.childIndex = 0;
        }
	console.log("Now at: "+this.currentNode[this.childIndex].utterance);
        say(this.currentNode[this.childIndex].utterance);
        //needs to speak here as well. 
        this.refreshHTML()
    }

    this.activate = function() {
	dest=this.getHighlightedNode().link 
	console.log("Give this destination: "+dest)
	if(dest in this.graph){
		this.currentNode=this.graph[dest]
		this.childIndex=0;//start the new page at the begining
		this.refreshHTML()//new page
		this.backStack.push(dest)
		console.log("pushed onto the stack: "+dest)
	}	
	else if(dest.indexOf("ovf(")!=-1){
	    if(dest.indexOf("back")!=-1){
		this.backStack.pop()//this will be the current page we pop off
		lastNodeID=this.backStack[this.backStack.length-1]//this the the page below that we peek at:
		if (lastNodeID==undefined)
		{
			lastNodeID=this.rootNodeID
		}	
		console.log("Pulled from stack: "+lastNodeID)
		this.currentNode=this.graph[lastNodeID]
		this.childIndex=0;//start the new page at the begining
		this.refreshHTML()//new page
		return
}

	}
	else {

		alert("Stub!");
	}


    }

}//end Board class


