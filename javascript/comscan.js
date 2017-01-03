window.comscan = window.comscan || {};

function say(message) {
    //alert("say what you want!")//stup

}

function Board(inGraph, links) {
    //This is a spider that walks thought the pages digraph
    this.node = 0 //default
    this.childIndex = 0;
    this.graph = inGraph;
    this.getCurrentNode = function() {
        return this.graph[this.node]
    }
    this.getHighlight = function() {
        return this.getCurrentNode()[this.childIndex].label;
    };


    this.refreshHTML = function() {
        listtable = document.getElementById('listtable');
        for (child = 0; child < this.getCurrentNode().length; child++) {
            listtable.innerHTML += "<tr><td>" + this.getCurrentNode()[child].label + "</tr></td>";
        }
    }

    this.move = function() {
        this.childIndex++;
        if (this.childIndex == this.getCurrentNode().length) {
            this.childIndex = 0;
        }
        say(this.getCurrentNode()[this.childIndex].utterance);
        //needs to speak here as well. 
    }

    this.activate = function() {
		


    }

}//end Board class


function MenuItem(inlabel, inlink, inUtterance){
this.label=inlabel
this.link=inlink
this.utterance=inUtterance||inlabel

}
