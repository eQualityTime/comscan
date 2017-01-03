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
        for (child = 0; child < this.currentNode.length; child++) {
            listtable.innerHTML += "<tr><td>" + this.currentNode[child].label + "</tr></td>";
        }
    }

    this.move = function() {
        this.childIndex++;
        if (this.childIndex == this.currentNode.length) {
            this.childIndex = 0;
        }
        say(this.currentNode[this.childIndex].utterance);
        //needs to speak here as well. 
    }

    this.activate = function() {
	dest=this.getHighlightedNode().link 
	if(dest in this.graph){
		this.currentNode=this.graph[dest]
		this.childIndex=0;//start the new page at the begining
		this.refreshHTML()//new page
	}	
	else
	{
		alert("Stub!");
	}


    }

}//end Board class


function MenuItem(inlabel, inlink, inUtterance){
this.label=inlabel
this.link=inlink
this.utterance=inUtterance||inlabel

}
