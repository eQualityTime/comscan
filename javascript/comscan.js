window.comscan = window.comscan || {};

function say(message) {
    //alert("say what you want!")//stup

}

function Board(inGraph, links) {
    //This is a spider that walks thought the pages digraph
    this.childIndex = 0;
    this.graph = inGraph;
    this.currentNode = this.graph[0] //default

    this.getHighlightedNode= function() {
	    return this.currentNode[this.childIndex];
    }
    this.getHighlightedNodeLabel = function() {
        return this.getHighlightedNode().label;
    };


    this.refreshHTML = function() {
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
	console.log("pressed!")
        this.childIndex++;
        if (this.childIndex == this.currentNode.length) {
            this.childIndex = 0;
        }
        say(this.currentNode[this.childIndex].utterance);
        //needs to speak here as well. 
        this.refreshHTML()
    }

    this.activate = function() {
	dest=this.getHighlightedNode().link 
	alert(dest)
	if(dest in this.graph){
		this.currentNode=this.graph[dest]
		this.childIndex=0;//start the new page at the begining
		this.refreshHTML()//new page
	}	
	else if(dest.indexOf("ovf(")!=-1){
	    if(dest.indexOf("back")!=-1){
		this.currentNode=this.graph[0]
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


function MenuItem(inlabel, inlink, inUtterance){
this.label=inlabel
this.link=inlink
this.utterance=inUtterance||inlabel

}
