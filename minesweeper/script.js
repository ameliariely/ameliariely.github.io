/*global $, jQuery, alert, console*/
var w, h, n, mines, clk, prevent, numflagged, numCleared;

$("document").ready(function () {

    $("form").submit(function (event) {
        event.preventDefault();

        $("#sizeerr").empty();
        $("#game").empty();
        $("#rem").empty();

        var fields = $(":input").serializeArray();
        h = parseInt(fields[0].value);
        w = parseInt(fields[1].value);
        n = parseInt(fields[2].value);
        numflagged = 0;
        numCleared = 0;

        //check for correct inputs
        if(h < 10 || h > 30 || isNaN(h)){
            h = 10;
            $("#sizeerr").append("Invalid value for height. Adjusted to 10.<br>");
        }
        if(w < 10 || w > 40 || isNaN(w)){
            w = 10;
            $("#sizeerr").append("Invalid value for width. Adjusted to 10.<br>");
        }
        if(n < 1 || n > (h*w-1) || isNaN(n)){
            n = Math.round((h*w)/5);
            $("#sizeerr").append("Invalid value for number of mines. Adjusted to " + n +".<br>");
        }

        //create game
        makeGame(h, w, n);

    //triage right vs left clicks
    clk = $("#game").on('mousedown', 'td', function(event) {
        switch (event.which) {
            case 1: //left click
                left(this);
                break;
            case 3: //right click
                right(this);
                break;
            }
        });

    //prevent the context menu on right click
    prevent = $("#game").on("contextmenu", function(event){
        event.preventDefault();
        });
    });

});

var makeGame = function (h, w, n) {

    var i, j, game, id;
    mines = new Array(w*h);

    //make minefield grid string to append to html
    game = '<table>\n';
    for (i = 0; i < h; i++) {
        game += '<tr>\n';
        for (j = 0; j < w; j++) {
            id = i*w+j;
            game += '<td id="' + id + '"> </td>\n';
            mines[id] = new Spot(id, false, false, false, 0);
        }
        game += '</tr>\n';
    }

    //add the mindfield table as html
    $("#game").html(game);

    //function to pass to the neighbors function
    function addMine(x) {
            if(mines[x].mine === false){
                mines[x].nearmines++;
            }
        }

    //plant mines
    for (i = 0; i < n; i++){
        //search until you find an empty space
        do {
            id = Math.floor((Math.random() * w*h));

        } while(mines[id].mine === true);

        //set mine to true and adjust nearmines for neighbors
        mines[id].mine = true;
        mines[id].nearmines = -1;
        neighbors(id, addMine);
    }

	$("#rem").html( "Mines remaining: " + n);
};

//spot prototype
function Spot (id, mine, flagged, revealed, nearmines) {
    this.id = id;
    this.mine = mine;
    this.flagged = flagged;
    this.revealed = revealed;
    this.nearmines = nearmines;
    this.toggleflag = function(){
        if (!this.revealed){
            $("#"+this.id).toggleClass( "flagged" );
            if (this.flagged){
                this.flagged = false;
                numflagged--;
            }else{
                this.flagged = true;
                numflagged++;
            }
        }
    };
}

function left (td) {
    var s = mines[td.id];
    //can't click it if it's flagged
    if (!s.flagged){
            if (s.mine) {
                explode(td.id);
            } else if (s.revealed) {
                revealCheck(s, td.id);
            } else {
                revealRecursive(td.id);
            }
    }
}

function revealCheck(s, id){
    var f = nearflagged(id);
    var m = s.nearmines;
    if(f==m){
        neighbors(id, function(x){
            if (!mines[x].flagged && !mines[x].revealed){
                left(document.getElementById(x));
            }
        });
    }
     $("#rem").html( "revealCheck" );
}

function right (td){
    var s = mines[td.id];
    s.toggleflag();
    $("#rem").html( "Mines remaining: " + (n-numflagged) );
}

function explode (id) {
    for (var i = 0; i<h*w; i++){
        if (mines[i].mine){
            if(mines[i].flagged){
                $("#"+i).addClass( "flaggedMine" ).removeClass( "flagged" );
            }
            else{
                $("#"+i).addClass( "mine" );}
        }
    }
    //mark the mine you clicked as special
    $("#"+id).removeClass( "mine" ).addClass( "theMine" );
    $("#game").off("mousedown");
    $("#rem").html("GAME OVER");
}

function revealRecursive (id) {
    var aSpot = mines[id];
    if (!aSpot.revealed && !aSpot.flagged) {
        if(aSpot.nearmines === 0) {
            aSpot.revealed = true;
            numCleared++;
            neighbors(id, revealRecursive);
            $("#"+id).addClass( "clicked" );
        } else if(aSpot.nearmines > 0) {
            $("#"+id).addClass( "clicked" );
            $("#"+id).html( aSpot.nearmines );
            aSpot.revealed = true;
            numCleared++;
        }
    }
    if (numCleared==h*w-n) {
    	win();
	};
}

function nearflagged (id) {
    var near = neighbors(id, function(x){
        if(mines[x].flagged === true){return 1;}
        else{return 0;}});
    return near;
    }

//the adding is used for finding nearFlagged
function neighbors(id, f){
    id = parseInt(id);
    //if something is returned
    var z = 0;
    //right
    if(id%w != w-1){z += f(id+1);}
    //left
    if(id%w !== 0){
        z += f(id-1);}
    //upper row
    if(id >= w){
        //top
        z += f(id-w);
        //upper left
        if (id%w !== 0){z += f(id-w-1);}
        //upper right
        if(id%w != w-1){z += f(id-w+1);}
    }
    //lower row
    if(id < w*(h-1)){
        //bottom
        z += f(id+w);
        //bottom left
        if (id%w !== 0){z += f(id+w-1);}
        //bottom right
        if(id%w != w-1){z += f(id+w+1);}
    }
    return z;
}

function win(){
	//remove event handlers
    $("#game").off("mousedown");
    $("#rem").html("YOU WON!!");
}
