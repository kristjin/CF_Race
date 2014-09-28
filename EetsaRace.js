//**
//-Functions-
//**

function getRandomInt(min, max) {   //Makes getting a random integer in a range much easier (stackoverflow.com)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//**
//-Constructor-
//**

function Racer(name,speed,agility,focus){

  this.name=name;                           //racer's name

  this.speed=speed;                         //number of places out of 100 racer moves each focused move

  this.agility=agility;                     //if random roll is higher than agility, racer will be eaten and lose

  this.focus=focus;                         //if focus<1 then the animlal will piss off

  this.refocusValue=focus;                  //stores the original focus value for resets

  this.position=0;                          //First to exceed 100 winzies

  this.isStillRacing = true;                //And when someone exceeds 100, this gets set to dentures (falsies)

  this.hasWon = function(){                 //returns true if the racer is >100 in position, else false
    return (this.position>100);
  };

  this.pissOff = function(){                //it's like the advance function but without the advancement
    this.focus = --this.focus;
  };

  this.advance=function (){                 //Reduces focus by one and advances by speed variable
    this.focus = --this.focus;
    this.position += this.speed;
  };

  this.refocus = function (){               //resets the focus value for the animal to the original value
    this.focus = this.refocusValue;
    this.advance();
  };
}
                                            //*********************************
$(document).ready(function(){               //***** BEGIN READY FUNCTION ******
                                            //*********************************

  //**
  //-Variables-
  //**

  var name = "";                            //racer names will be various
  var rabbit = [];                          //there will be a bunch of rabbits, of course
  var tortoise;                             //there will eventually be a tortoise
  var hare;
  var vpHeight = $('#background>img')
      .height();                            //viewport height
  var vpWidth = $('#background>img')
      .width();                             //viewport width

  var startingX = (vpWidth *.05);           //Race Starting X
  var finishX = (vpWidth *.95);             //Race Finish Line X
  var raceY =  (vpHeight *.60);             //Race Y

  var picLetter = ['A','B','C','D','E'];    //Because my pics were named this way

  //**
  //-Build Racers-
  //**

  for (var i=0; i<5; i++) {                 //builds an array of random rabbits
    switch (i) {                            //Selects the correct name for this rabbit
      case 0:
        name = "Adolf";
        break;
      case 1:
        name = "Buckwheat";
        break;
      case 2:
        name = "Carrot";
        break;
      case 3:
        name = "Damien";
        break;
      case 4:
        name = "Eminem";
        break;
    }
    rabbit[i] = new Racer (
        name,                               //name - set by the switch
        getRandomInt(5, 10),                //speed - # of spaces moved per focused turn
        getRandomInt(95, 100),              //agility - for rabbits, 95-100, against 0-99 random roll
        getRandomInt(4, 7)                  //focus - # of turns before loses focus and waits until tortoise catches up
    );

    rabbit[i].pic =
        "img/hare"
        + picLetter[i]
        + ".png";                           //location of this rabbit's awake pic

    rabbit[i].sleepingPic =
        "img/hare"
        + picLetter[i]
        + "Zzz.png";                        ///location of this rabbit's sleeping pic

    rabbit[i].eatenPic =
        "img/cooked"
        +picLetter[i]
        +".png";                            //location of this rabbit's eaten pic

    $("#" + i + 'Speed').html('Speed: '
        + rabbit[i].speed);                 //Update this rabbit's speed on the menu
    $("#" + i + 'Focus').html('Focus: '
        + rabbit[i].focus);                 //Update this rabbit's focus on the menu
    $("#" + i + 'Agility').html('Agility: '
        + rabbit[i].agility);               //Update this rabbit's agility on the menu

  }             //bunnies!

  tortoise = new Racer (
      "Gurgle",                             //name - one turtle, named Gurgle
      getRandomInt(3, 5),                   //speed - 3-5 spaces per turn
      getRandomInt(85,100),                 //agility - less agile than rabbits, easier to catch and eat
      33                                    //focus - always 33, so only a speed 3 tortoise will wait, and only 1 turn
  );

  tortoise.pic1 =
      "img/turtle1.png";                    //location of turtle's awake pic 1

  tortoise.pic2 =
      "img/turtle2.png";                    //location of turtle's awake pic 2

  tortoise.sleepingPic =
      "img/turtleZzz.png";                  //location of turtle's sleeping pic

  tortoise.eatenPic =
      "img/cookedT.png";                    //location of turtle's eaten pic


  $('#tSpeed').html('Speed: '
      + tortoise.speed);                    //Update tortoise speed on the menu
  $('#tFocus').html('Focus: '
      + tortoise.focus);                    //Update tortoise focus on the menu
  $('#tAgility').html('Agility: '
      + tortoise.agility);                  //Update tortoise agility on the menu


  //**
  //-The Menu-
  //**

  $('.bunnyBox')
      .mouseenter(function(event){              //Whenever we put the mouse into a bunnybox div
        var moused = event.target.id;           //Gives the id of the div into which we've moused (conveniently 0-4)
        if (picLetter[moused] !== undefined){   //Sometimes I get an undefined value here, so whatever
          $('#' + moused)
              .attr('src',
              rabbit[moused].pic);              //apply image src
        }
      })     //Wake up Bunny!
      .mouseleave(function(event) {             //Whenever we move the mouse out of a bunnybox
        var moused = event.target.id;           //Gives the id of the div out of which we've moused (conveniently 0-4)
        if (picLetter[moused] !== undefined) {  //Sometimes I get an undefined value here, so whatever
          $('#' + moused)
              .attr('src',
              rabbit[moused].sleepingPic);      //apply image src
        }
      });   //Sleepy time Bunny!


  //**
  //-The Game-
  //**

  $('.wabbit')                              //When we cwick on da wabbit, we pway.
      .click(function(event){
        var picked = event.target.id;       //Tells us the rabbit we picked, 0-4
        hare = rabbit[picked];              //Uses that number to select the right object

        $("#menu")                          //Selects menu objects
            .hide("slow");                  //Hides the menu objects

        $('#game')                          //Selects the game objects
            .delay(500)                     //Waits 1/2 second
            .show("slow");                  //Show's the game objects



      });






                                            //*********************************
});                                         //***** END OF READY FUNCTION *****
                                            //*********************************




/*
 $('#path')
 .width(vpWidth+'px')
 .height(vpHeight+'px')
 .css('display','inline');

 $('#grass')
 .width(vpWidth+'px')
 .height((vpHeight*.3)+'px');

 $('#hare')
 .width(rWidth)
 .height(rHeight)
 .css('left', rPosX + 'px')
 .css('bottom', rPosY + 'px')
 .css('display','inline');


bunnyReport += ( (i+1) + " - " + rabbit[i].name +
      "  | Speed: " + rabbit[i].speed +
      "  | Agility: " + rabbit[i].agility +
      "  | Focus: " + rabbit[i].focus + "\n")
}


//Let the player pick a rabbit

var selection = prompt("The Tortoise you are racing is named " + tortoise.name + "\n" +
    "  His stats are as follows: \n" +
    "Speed: " + tortoise.speed +
    "  | Agility: " + tortoise.agility +
    "  | Focus: " + tortoise.focus + "\n" +
    "You may select from the following racers:\n" +
    bunnyReport + "Please enter 1-5 to make your selection:");

if (typeof (selection) === 'string'){selection=parseInt(selection);} //Thank you, Sam.
var hare = rabbit[selection-1]; //because array

//Race the tortoise and the hare

var raceStatus = "The race continues!";
while(tortoise.isStillRacing && hare.isStillRacing){

  //When the tortoise loses focus, he pisses off for only one click
  //Tortoise focus always starts @33, so only a speed 3 can lose focus, and it's his last turn before winning
  //So Tortoise with speed 3 idles 1 turn at 99.
  //The hare would have to be idling @ hare.position of 100-hare.speed to win b/c of hare.speed=3 idle
  //But a Speed 3 Tortoise will lose to a hare who gets distracted within 1 move of winning.

  if (tortoise.focus > 0) {
    tortoise.advance();
  } else if (tortoise.focus === 0) {
    tortoise.pissOff();
  } else {
    tortoise.refocus();
  }

  //For the hare, he advances until hitting 0 focus
  //He then continues to piss off until the tortoise.position>=hare.position (the tortoise catches up to him)

  if (hare.focus>0){
    hare.advance();
  } else if ((hare.focus<0) && (tortoise.position>=hare.position)) {
    hare.refocus();
  } else {
    hare.pissOff();
  }

  //After they move check to see if either or both will have passed the finish line if they don't get injured.

  if (hare.hasWon() && tortoise.hasWon()){
    raceStatus = "It's a tie!";
    hare.isStillRacing = false;
  } else if (hare.hasWon()){
    raceStatus = hare.name + " has won the race!  Congratulations!!";
    hare.isStillRacing = false;
  } else if (tortoise.hasWon()){
    raceStatus = "Gurgle has won the race!  Better luck next time!  Fortunately rabbits breed like... well, rabbits.\n" +
        "You'll have a whole new batch to choose from next time.";
    tortoise.isStillRacing = false;
  }

  //The last thing to check is whether one of the racers is dropping out due to injury.
  //(This will override current move.)

  if (getRandomInt(0,99)>tortoise.agility){
    tortoise.statusMessage = "Gurgle was captured by Timothy Anderson and turned into turtle soup.\n";
    raceStatus = hare.name + " wins!";
    tortoise.isStillRacing = false;
  } else if (getRandomInt(0,99)>hare.agility) {
    hare.statusMessage = hare.name + " was eaten by Hank, Peggy and Bobby.  Rednecks will eat anything.\n";
    raceStatus = "Gurgle wins!";
    hare.isStillRacing = false;
  }

  //Finally, build an alert to notify the status of the round.

  var report = hare.statusMessage + "\n" + tortoise.statusMessage + "\n" + raceStatus;

  //and report the results

  alert(report);

}
*/

/**
 * Created by evilOlive on 9/20/2014.
 */
