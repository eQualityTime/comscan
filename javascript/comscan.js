window.comscan = window.comscan || {};

function say(message) {
    //alert("say what you want!")//stup
	var utterance = new SpeechSynthesisUtterance(message);
	if (utterance.voice == null){
		utterance.voice=speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Daniel"; })[0];
	}
	window.speechSynthesis.speak(utterance);
    }



function MenuItem(inid, inlabel, inlink, inUtterance) {
    //Holds the information for a single unit that can be activated. 
    this.id = inid
    this.label = inlabel
    this.link = inlink
    this.utterance = inUtterance || inlabel
} //end MenuItem class

function PagesIterator(targetGraph) {
    this.rootNodeID = 0
    this.childIndex = 0; //initialisation
    this.graph = targetGraph; //currently a dictionary of node IDs to MenuItem objects
    this.currentNode = this.graph[this.rootNodeID]
    this.backStack = []; //stores breadcrumbs to work a multi-level 'back' button. 

    this.getHighlightedNode = function() {
        return this.currentNode[this.childIndex]; //returns a list of MenuItem objects
    }
    this.getHighlightedNodeLabel = function() {
        return this.getHighlightedNode().label;
    };

    this.getHighlightedNodeID = function() {
        return this.getHighlightedNode().id;
    };


    this.refreshHTML = function() {
        var listtable = document.getElementById('listtable');
        listtable.innerHTML = ""
        for (child = 0; child < this.currentNode.length; child++) {
            html = "<td>"
            if (child == this.childIndex) {
                html = "<td style= \"color:red\">";
            }
            listtable.innerHTML += "<tr>" + html + this.currentNode[child].label + "</tr></td>";
        }
    }

    this.move = function() {
        this.childIndex++;
        if (this.childIndex == this.currentNode.length) {
            this.childIndex = 0;
        }
        say(this.currentNode[this.childIndex].utterance);
        this.refreshHTML()
    }

    this.jump = function(dest) {
        this.currentNode = this.graph[dest]
        this.childIndex = 0; //start the new page at the begining
        this.refreshHTML() //new page


    }

    this.processOVF = function(dest) {
        if (dest.indexOf("back") != -1) {
            this.backStack.pop() //this will be the current page we pop off
            dest = this.backStack[this.backStack.length - 1] //this the the page below that we peek at:
            if (dest == undefined) {
                dest = this.rootNodeID
            }
            this.jump(dest)
            return
        } //a different OVF command
        alert("stub!");
    }


    this.activate = function() {
        var dest = this.getHighlightedNode().link
        if (dest in this.graph) {
            this.jump(dest)
            this.backStack.push(dest)
        } else if (dest.indexOf("ovf(") != -1) {
            this.processOVF(dest)
        } else { //some failed linkk
            alert("Stub!");
        }

    }

} //end Board class
