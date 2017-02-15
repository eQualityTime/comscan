window.comscan = window.comscan || {};

var speech_voices;
if ("speechSynthesis" in window) {
    speech_voices = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = function() {
        speech_voices = window.speechSynthesis.getVoices();
    };
}

function think(message) {
    voiceOutput(message, "Fiona");
}

function say(message) {
    voiceOutput(message, "Daniel");
}

function voiceOutput(message, inVoice) {
    var utterance = new SpeechSynthesisUtterance(message);
    if (utterance.voice == null) {
        utterance.voice = speech_voices.filter(function(voice) {
            return voice.name == inVoice;
        })[0];
    }
    window.speechSynthesis.speak(utterance);
}

    //Holds the information for a single unit that can be activated.
function MenuItem(inid, inlabel, inlink, inUtterance) {
    this.id = inid;
    this.label = inlabel;
    this.link = inlink;
    this.utterance = inUtterance || inlabel;
} //end MenuItem class

function PagesIterator(targetGraph) {
    this.rootNodeID = 0;
    this.childIndex = 0; //initialisation
    this.graph = targetGraph; //currently a dictionary of node IDs to MenuItem objects
    this.currentNode = this.graph[this.rootNodeID];
    this.backStack = []; //stores breadcrumbs to work a multi-level 'back' button.

    this.getHighlightedItem = function() {
        return this.currentNode[this.childIndex]; //returns a MenuItem
    }
    this.getHighlightedItemLabel = function() {
        return this.getHighlightedItem().label;
    };

    this.getHighlightedItemID = function() {
        return this.getHighlightedItem().id;
    };


    this.refreshHTML = function() {
        var listtable = document.getElementById("listtable");
        listtable.innerHTML = "";
        for (child = 0; child < this.currentNode.length; child+=1) {
            html = "<td>";
            if (child == this.childIndex) {
                html = "<td style= \"color:red\">";
            }
            listtable.innerHTML += "<tr>" + html + this.currentNode[child].label + "</tr></td>";
        }
    }

    this.next = function() {
        this.childIndex+=1;
        if (this.childIndex == this.currentNode.length) {
            this.childIndex = 0;
        }
        think(this.currentNode[this.childIndex].utterance);
        this.refreshHTML();
    }

    this.jump = function(dest) {
        this.currentNode = this.graph[dest]
        this.childIndex = 0; //start the new page at the begining
        this.refreshHTML(); //new page
    }

    this.processOVF = function(dest) {
        if (dest.indexOf("back") != -1) {
            this.backStack.pop(); //this will be the current page we pop off
            dest = this.backStack[this.backStack.length - 1]; //this the the page below that we peek at:
            if (dest == undefined) {
                dest = this.rootNodeID;
            }
            this.jump(dest);
            return;
        } //a different OVF command
        alert("stub!");
    }


    this.activate = function() {
        var dest = this.getHighlightedItem().link
        if (dest == "") { //then it's a speech activatation
            say(this.getHighlightedItem().utterance)
            this.currentNode = this.graph[this.rootNodeID];
	    this.childIndex=0
            this.backStack = []; 
            return
        }
        if (dest in this.graph) {
            this.jump(dest);
            this.backStack.push(dest);
        } else if (dest.indexOf("ovf(") != -1) {
            this.processOVF(dest);
        } else { //some failed linkk
            alert("Stub!");
        }

    }

} //end PagesItterator class
