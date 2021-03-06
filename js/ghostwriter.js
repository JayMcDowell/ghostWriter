$(document).ready(function() {

// **************** scale object ***************

  var scale = {
    degrees: ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"]
  };

  scale.findChromaticScale = function(key) {

    // create empty scale array
    var chromaticScale = new Array();

    // fill variable with index position of key
    for (var i = 0; i < this.degrees.length; i++) {
      if (key == this.degrees[i]) {
        var rootIndex = i;
      };
    };

    // add succeeding degrees to chromatic scale array
    for (var i = rootIndex; i < this.degrees.length; i++) {
      chromaticScale.push(this.degrees[i]);
    };

    // add preceeding degrees to chromatic scale array
    for (var i = 0; i < rootIndex; i++) {
      chromaticScale.push(this.degrees[i]);
    };

    return chromaticScale;

  }; // end findChromaticScale method

  scale.findMajorScale = function(key) {

    // fill variable with chromatic scale array
    var chromaticScale = this.findChromaticScale(key);

    // create empty scale array
    var majorScale = new Array();

    // loop through degrees in chromatic scale array
    for (var i = 0; i < chromaticScale.length; i++) {

      // determine if major scale array is empty
      if (majorScale.length == 0) {

        // fill variable with accidental of tonic
        var accidental = chromaticScale[i].slice(1);

        // determine if tonic is sharp
        if (accidental == "#") {

          // fill variable with equivalent flat scale degree
          var flat = chromaticScale[i + 1] + "b";

          // make current scale degree flat
          chromaticScale[i] = flat;

        }; // end if statement

      } else {

        // fill variable with previous scale degree minus accidental
        var previousDegree = majorScale[majorScale.length - 1].slice(0, 1);

        // fill variable with current scale degree minus accidental
        var currentDegree = chromaticScale[i].slice(0, 1);

        // determine if previous degree and current degree are equal
        if (previousDegree == currentDegree) {

          // fill variable with equivalent flat scale degree
          var flat = chromaticScale[i + 1] + "b";

          // make current scale degree flat
          chromaticScale[i] = flat;

        }; // end if statement

      }; // end if statement

      // add scale degree to major scale array
      majorScale.push(chromaticScale[i]);

      // increment counter again if current degree is not 4th degree in chromatic
      // scale; this sets the scale intervals that define a major scale
      if (i !== 4) {
        i++;
      };

    }; // end for loop

    return majorScale;

  }; // end findMajorScale method

  scale.findMinorScale = function(key) {

    // fill variable with relative major key
    var relativeMajor = scale.findRelativeMajor(key);

    // fill variable with relative major scale array
    var majorScale = scale.findMajorScale(relativeMajor);

    // create empty scale array
    var minorScale = new Array();

    // add succeeding degrees to minor scale array; the index
    // number of the relative minor key within a major scale is 5
    for (var i = 5; i < majorScale.length; i++) {
      minorScale.push(majorScale[i]);
    };

    // add preceeding degrees to minor scale array; the index
    // number of the relative minor key within a major scale is 5
    for (var i = 0; i < 5; i++) {
      minorScale.push(majorScale[i]);
    };

    return minorScale;

  }; // end findMinorScale method

  scale.findRelativeMajor = function(key) {

    // fill variable with chromatic scale array
    var chromaticScale = this.findChromaticScale(key);

    // fill variable with relative major key; the index number
    // of the relative major key within a chromatic scale is 3
    var relativeMajor = chromaticScale[3];

    return relativeMajor;

  }; // end findRelativeMajor method

  scale.findFlatSeven = function(degree) {

    // fill variable with chromatic scale array
    var chromaticScale = scale.findChromaticScale(degree);

    // fill variable with scale degree transposed one half step down
    var transposition = chromaticScale[11];

    // fill variable with accidental of transposed degree
    var accidental = transposition.slice(1);

    // determine if transposed degree is sharp
    if (accidental == "#") {

      // fill variable with flatted scale degree
      var flatSeven = degree + "b";

    } else {

      // fill variable with transposed scale degree
      var flatSeven = transposition;

    }; // end if statement

    return flatSeven;

  }; // end transposeDown method

// **************** chord positions array ***************

  var chordPositions = [
    {
      name: "default",
      nextProbability: [
        {name: "1", tonality: "major", probability: .19},
        {name: "2", tonality: "major", probability: .007},
        {name: "2", tonality: "minor", probability: .05},
        {name: "3", tonality: "major", probability: .01},
        {name: "3", tonality: "minor", probability: .03},
        {name: "4", tonality: "major", probability: .18},
        {name: "5", tonality: "major", probability: .16},
        {name: "6", tonality: "minor", probability: .14},
        {name: "7", tonality: "major", probability: .01},
        {name: "7", tonality: "dim", probability: .002}
      ]
    },
    {
      name: "1",
      tonality: "major",
      nextProbability: [
        {name: "1", tonality: "major", probability: 0},
        {name: "2", tonality: "major", probability: .01},
        {name: "2", tonality: "minor", probability: .04},
        {name: "3", tonality: "major", probability: .008},
        {name: "3", tonality: "minor", probability: .05},
        {name: "4", tonality: "major", probability: .21},
        {name: "5", tonality: "major", probability: .31},
        {name: "6", tonality: "minor", probability: .09},
        {name: "7", tonality: "major", probability: .02},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "2",
      tonality: "major",
      nextProbability: [
        {name: "1", tonality: "major", probability: .03},
        {name: "2", tonality: "major", probability: 0},
        {name: "2", tonality: "minor", probability: 0},
        {name: "3", tonality: "major", probability: .06},
        {name: "3", tonality: "minor", probability: 0},
        {name: "4", tonality: "major", probability: .28},
        {name: "5", tonality: "major", probability: .18},
        {name: "6", tonality: "minor", probability: .13},
        {name: "7", tonality: "major", probability: 0},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "2",
      tonality: "minor",
      nextProbability: [
        {name: "1", tonality: "major", probability: .14},
        {name: "2", tonality: "major", probability: 0},
        {name: "2", tonality: "minor", probability: 0},
        {name: "3", tonality: "major", probability: .02},
        {name: "3", tonality: "minor", probability: .08},
        {name: "4", tonality: "major", probability: .17},
        {name: "5", tonality: "major", probability: .25},
        {name: "6", tonality: "minor", probability: .1},
        {name: "7", tonality: "major", probability: 0},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "3",
      tonality: "major",
      nextProbability: [
        {name: "1", tonality: "major", probability: .01},
        {name: "2", tonality: "major", probability: 0},
        {name: "2", tonality: "minor", probability: .03},
        {name: "3", tonality: "major", probability: 0},
        {name: "3", tonality: "minor", probability: 0},
        {name: "4", tonality: "major", probability: .37},
        {name: "5", tonality: "major", probability: .01},
        {name: "6", tonality: "minor", probability: .41},
        {name: "7", tonality: "major", probability: 0},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "3",
      tonality: "minor",
      nextProbability: [
        {name: "1", tonality: "major", probability: .03},
        {name: "2", tonality: "major", probability: 0},
        {name: "2", tonality: "minor", probability: .1},
        {name: "3", tonality: "major", probability: 0},
        {name: "3", tonality: "minor", probability: 0},
        {name: "4", tonality: "major", probability: .33},
        {name: "5", tonality: "major", probability: .04},
        {name: "6", tonality: "minor", probability: .41},
        {name: "7", tonality: "major", probability: 0},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "4",
      tonality: "major",
      nextProbability: [
        {name: "1", tonality: "major", probability: .34},
        {name: "2", tonality: "major", probability: 0},
        {name: "2", tonality: "minor", probability: .04},
        {name: "3", tonality: "major", probability: .01},
        {name: "3", tonality: "minor", probability: .03},
        {name: "4", tonality: "major", probability: 0},
        {name: "5", tonality: "major", probability: .27},
        {name: "6", tonality: "minor", probability: .09},
        {name: "7", tonality: "major", probability: .01},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "5",
      tonality: "major",
      nextProbability: [
        {name: "1", tonality: "major", probability: .27},
        {name: "2", tonality: "major", probability: .006},
        {name: "2", tonality: "minor", probability: .05},
        {name: "3", tonality: "major", probability: .008},
        {name: "3", tonality: "minor", probability: .04},
        {name: "4", tonality: "major", probability: .22},
        {name: "5", tonality: "major", probability: 0},
        {name: "6", tonality: "minor", probability: .26},
        {name: "7", tonality: "major", probability: .01},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "6",
      tonality: "minor",
      nextProbability: [
        {name: "1", tonality: "major", probability: .11},
        {name: "2", tonality: "major", probability: .01},
        {name: "2", tonality: "minor", probability: .06},
        {name: "3", tonality: "major", probability: .01},
        {name: "3", tonality: "minor", probability: .04},
        {name: "4", tonality: "major", probability: .32},
        {name: "5", tonality: "major", probability: .25},
        {name: "6", tonality: "minor", probability: 0},
        {name: "7", tonality: "major", probability: .02},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "7",
      tonality: "major",
      nextProbability: [
        {name: "1", tonality: "major", probability: .15},
        {name: "2", tonality: "major", probability: 0},
        {name: "2", tonality: "minor", probability: .01},
        {name: "3", tonality: "major", probability: .01},
        {name: "3", tonality: "minor", probability: 0},
        {name: "4", tonality: "major", probability: .25},
        {name: "5", tonality: "major", probability: .04},
        {name: "6", tonality: "minor", probability: .18},
        {name: "7", tonality: "major", probability: 0},
        {name: "7", tonality: "dim", probability: 0}
      ]
    },
    {
      name: "7",
      tonality: "dim",
      nextProbability: [
        {name: "1", tonality: "major", probability: .20},
        {name: "2", tonality: "major", probability: 0},
        {name: "2", tonality: "minor", probability: 0},
        {name: "3", tonality: "major", probability: .07},
        {name: "3", tonality: "minor", probability: 0},
        {name: "4", tonality: "major", probability: 0},
        {name: "5", tonality: "major", probability: 0},
        {name: "6", tonality: "minor", probability: .73},
        {name: "7", tonality: "major", probability: 0},
        {name: "7", tonality: "dim", probability: 0}
      ]
    }
  ]; // end chordPositions array

// **************** write scale on page load ***************

  // assign tonality to scale degrees
  assignTonality();

  // write scale to page
  writeScale();

  // show tonality toggle icons
  showTonalityToggles();

// **************** update scale on select box change ***************

  // change event on key select box
  $(".scaleOption").change(function() {

    // assign tonality to scale degrees
    assignTonality();

    // write scale to page
    writeScale();

    // show tonality toggle icons
    showTonalityToggles();

  }); // end change event

// **************** assign tonality to scale degrees ***************

  function assignTonality() {

    // loop through boxes in scale display
    $(".degreeBox").each(function() {

      // fill variable with position of scale degree
      var scaleDegree = $(this).attr("id").slice(6);

      // fill variable with value of tonality select box
      var tonality = $("#tonalitySelect").val();

      // clear existing tonality classes
      $(this).removeClass("major minor flat dim");

      // add correct tonality class to scale display box
      if (tonality == "major") {
        if (scaleDegree == 1 || scaleDegree == 4 || scaleDegree == 5 ) {
          $(this).addClass("major");
        } else if (scaleDegree == 2 || scaleDegree == 3 || scaleDegree == 6 ) {
          $(this).addClass("minor");
        } else {
          $(this).addClass("dim");
        };
      } else if (tonality == "minor") {
        if (scaleDegree == 3 || scaleDegree == 6 || scaleDegree == 7 ) {
          $(this).addClass("major");
        } else if (scaleDegree == 1 || scaleDegree == 4 || scaleDegree == 5 ) {
          $(this).addClass("minor");
        } else {
          $(this).addClass("dim");
        };
      }; // end if statement

    }); // end each event

  }; // end assignTonality function

// **************** write scale to page ***************

  function writeScale() {

    // fill variable with selected scale array
    var userScale = findScaleFromSelection();

    // loop through degrees in user scale array
    for (var i = 0; i < userScale.length; i++) {

      // fill variable with correct tonality designation
      if ($("#degree" + (i + 1)).hasClass("major")) {
        var tonality = "Major";
      } else if ($("#degree" + (i + 1)).hasClass("minor")) {
        var tonality = "Minor";
      } else if ($("#degree" + (i + 1)).hasClass("flat")) {

        // replace current scale degree with flat seven scale degree
        userScale[i] = scale.findFlatSeven(userScale[i]);

        // fill variable with major tonality class
        var tonality = "Major";

      } else if ($("#degree" + (i + 1)).hasClass("dim")) {
        var tonality = "Dim";
      };

      // write chord name to scale display box; overwrites
      // current contents of scale display box
      $("#degree" + (i + 1)).text(userScale[i] + " " + tonality);

    }; // end for loop

  }; // end writeScale function

// **************** find scale from selection ***************

  function findScaleFromSelection() {

    // fill variables with value of scale options
    var key = $("#keySelect").val();
    var tonality = $("#tonalitySelect").val();

    // fill variable with selected scale array
    if (tonality == "major") {
      var userScale = scale.findMajorScale(key);
    } else if (tonality == "minor") {
      var userScale = scale.findMinorScale(key);
    };

    return userScale;

  }; // end findScaleFromSelection function

// **************** show tonality toggle icons ***************

  function showTonalityToggles(tonality) {

    // hide all tonality toggle icons
    $(".tonalityToggle").hide();

    // fill variable with value of tonality select box
    var tonality = $("#tonalitySelect").val();

    // show correct tonality toggle icons for scale
    if (tonality == "major") {
      $(".majorToggle").show();
    } else if (tonality == "minor") {
      $(".minorToggle").show();
    };

  }; // end showTonalityToggles

// **************** toggle tonality of scale degrees ***************

  $(".tonalityToggle").click(function() {

    // replace existing tonality class with alternative tonality class
    if ($(this).siblings().hasClass("major")) {
      $(this).siblings().removeClass("major").addClass("minor");
    } else if ($(this).siblings().hasClass("minor")) {
      $(this).siblings().removeClass("minor").addClass("major");
    } else if ($(this).siblings().hasClass("dim")) {
      $(this).siblings().removeClass("dim").addClass("flat");
    } else if ($(this).siblings().hasClass("flat")) {
      $(this).siblings().removeClass("flat").addClass("dim");
    };

    // update scale on page
    writeScale();

  }); // end click event

// **************** add chord to progression array ***************

  // create empty array
  var progression = new Array();

  // define maximum number of chords in progression
  var chordMax = 4;

  // click event on scale display boxes
  $("#scaleDisplay").on("click", ".degreeBox", function() {

    // exit function if progression contains maximum number of chords
    if (progression.length == chordMax) {
      return;
    };

    // fill variable with contents of progression display box
    var chord = $(this).text();

    // add chord name to progression array
    progression.push(chord);

    // write progression to page
    writeProgression();

  }); // end click event

// **************** change chord box appearance on hover ***************

  // hover event on chord boxes
  $(".chordBox").hover(

    // if chord box has contents, change cursor type and background gradient
    function () {
      if ($(this).text() !== "") {
        $(this).css("cursor", "pointer").addClass("delete");
      };
    },

    // revert cursor type and background gradient
    function () {
      $(this).css("cursor", "default").removeClass("delete");
    }

  ); // end hover event

// **************** remove chord from progression array ***************

  // click event on progression display boxes
  $("#progressionDisplay").on("click", ".chordBox", function() {

    // fill variable with index of chord in progression array
    var chordIndex = $(this).attr("id").slice(5) - 1;

    // remove chord name from progression array
    progression.splice(chordIndex, 1);

    // write progression to page
    writeProgression();

    // revert cursor type and background gradient
    if ($(this).text() == "") {
      $(this).css("cursor", "default").removeClass("delete");
    };

  }); // end click event

// **************** write progression to page ***************

  function writeProgression() {

    // clear contents of progression display; needed to remove
    // chords that have been deleted from progression display
    $(".chordBox").text("");

    // write chord name to progression display
    for (var i = 0; i < progression.length; i++) {
      $("#chord" + (i + 1)).text(progression[i]);
    };

  }; // end writeProgression function

// **************** activate random chord button ***************

  // click event on generate random chord button
  $("#randomButton").click(function() {

    // fill variable with next chord probability array
    var nextProbability = findNextProbability();

    // generate random chord
    findRandomChord(nextProbability);

  }); // end click event

// **************** find next chord probability ***************

  function findNextProbability() {

    // determine if there are chords in progression array
    if (progression.length == 0) { // if array is empty

      // fill variable with default value
      var previousDegree = "default";

    } else { // if array contains chords

      // fill variable with last chord name in array
      var previousChord = progression[progression.length - 1];

      // fill variable with scale degree by removing tonality designation
      var previousDegree = previousChord.slice(0, 2).replace(/\s/g, "");

      // fill variable with tonality designation by removing scale degree
      var previousTonality = previousChord.slice(2).replace(/\s/g, "").toLowerCase();

    }; // end if statement

    // fill variable with position of previous degree
    var previousPosition = findPositionFromDegree(previousDegree);

    // loop through chord positions array
    for (var i = 0; i < chordPositions.length; i++) {

      // fill variable with next chord probability array
      if (previousPosition == chordPositions[i].name && previousTonality == chordPositions[i].tonality) {
        var nextProbability = chordPositions[i].nextProbability;
      };

    }; // end for loop

    return nextProbability;

  }; // end findNextProbability function

// **************** generate random chord ***************

  function findRandomChord(nextProbability) {

    // inititalize probability max counter at 0
    var probabilityMax = 0;

    // add up probability values in next probability array
    for (var i = 0; i < nextProbability.length; i++) {
      probabilityMax += nextProbability[i].probability;
    };

    // fill variable with random number between 0 and probability max
    var randomNumber = Math.random() * probabilityMax;

    // loop through objects in next chord probability array
    for (var i = 0; i < nextProbability.length; i++) {

      // initialize probability limit counters at 0
      var lowerLimit = 0;
      var upperLimit = 0;

      // loop through objects up through current object
      for (var j = 0; j < (i + 1); j++) {

        // assign lower probability limit
        lowerLimit = upperLimit;

        // increment upper probability limit
        upperLimit += nextProbability[j].probability;

      }; // end for loop

      // determine if random number falls within probability range
      if (randomNumber > lowerLimit && randomNumber < upperLimit) {

        // fill variable with position of random chord
        var randomPosition = nextProbability[i].name;

        // fill variable with scale degree of random chord
        var randomDegree = findDegreeFromPosition(randomPosition);

        // fill variable with tonality of random chord
        var randomTonality = nextProbability[i].tonality;

        // if chord is flat seven, replace random degree with flat seven degree
        if (randomPosition == 7 && randomTonality == "major") {
          randomDegree = scale.findFlatSeven(randomDegree);
        };

        // fill variable with chord name by combining scale degree and tonality
        var randomChord = randomDegree + " " + randomTonality;

        // add random chord to progression array
        progression.push(randomChord);

        // write progression to page
        writeProgression();

      }; // end if statement

    }; // end for loop

  }; // end findRandomChord function

// **************** find position from degree ***************

  function findPositionFromDegree(degree) {

    // determine if previous degree has been selected
    if (degree == "default") {

      // fill variable with default value
      var position = "default";

    } else {

      // fill variable with equivalent major scale array
      var userScale = findMajorScaleFromSelection();

      // fill variable with correct chord position
      for (var i = 0; i < userScale.length; i++) {
        if (degree == userScale[i]) {
          var position = i + 1;
        };
      };

      // if no matches are found, then previous chord
      // is flat seven, and position is set to 7
      if (!position) {
        var position = 7;
      };

    }; // end if statement

    return position;

  }; // end findPositionFromDegree function

// **************** find degree from position ***************

  function findDegreeFromPosition(position) {

    // fill variable with equivalent major scale array
    var userScale = findMajorScaleFromSelection();

    // fill variable with correct scale degree
    var degree = userScale[position - 1];

    return degree;

  }; // end findDegreeFromPosition function

// **************** find major scale from selection ***************
// only returns major scales; if minor tonality is selected, the relative
// major scale is returned instead; used in generating random chords because
// no next probability objects exist for minor scale positions

  function findMajorScaleFromSelection() {

    // fill variables with value of scale options
    var key = $("#keySelect").val();
    var tonality = $("#tonalitySelect").val();

    // determine if scale tonality is major or minor
    if (tonality == "major") {

      // fill variable with major scale array
      var userScale = scale.findMajorScale(key);

    } else if (tonality == "minor") {

      // fill variable with relative major key
      var relativeMajor = scale.findRelativeMajor(key);

      // fill variable with relative major scale array
      var userScale = scale.findMajorScale(relativeMajor);

    }; // end if statement

    return userScale;

  }; // end findMajorScaleFromSelection function

// **************** change play button appearance on hover ***************

  // replace play button image source on hover
  $("#playButton").hover(
    function () {
      $(this).attr("src", "img/inverted_play.png");
    }, function () {
      $(this).attr("src", "img/play.png");
    }
  );

// **************** activate play audio button ***************

  // create empty array
  var playlist = new Array();

  // click event on play audio button
  $("#playButton").click(function() {

    // update playlist array
    updatePlaylist();

    // play audio clips
    playAudio();

  }); // end click event

// **************** loop play audio function ***************

  // play next audio clip in playlst array once current clip has ended
  $("#audioClip").on("ended", function() {
    if (playlist.length !== 0) {
      playAudio();
    };
  }); // end ended event

// **************** update playlist ***************

  function updatePlaylist() {

    // loop through boxes in progression display
    $(".chordBox").each(function() {

      // fill variable with contents of chord box
      var chordName = $(this).text();

      var fileName = findFileName(chordName);

      // add file name to playlist array
      if (fileName.length !== 0) {
        playlist.push(fileName);
      };

    }); // end each method

  }; // end updatePlaylist function

// **************** find file name ***************

  function findFileName(chordName) {

    // fill variable with scale degree by removing tonality designation
    var degree = chordName.slice(0, 2).replace(/\s/g, "");

    // fill variable with tonality designation by removing scale degree
    var tonality = chordName.slice(2).replace(/\s/g, "");

    // fill variable with chromatic scale array
    var chromaticScale = scale.findChromaticScale(degree);

    // fill variable with accidental of scale degree
    var accidental = degree.slice(1);

    // determine if scale degree is sharp; browsers ignore anything after
    // a pound sign in a URL, so sharp scale degrees are converted to
    // equivalent flat scale degrees
    if (accidental == "#") {

      // fill degree variable with equivalent flat scale degree
      degree = chromaticScale[1] + "b";

    }; // end if statement

    // fill variable with file name of audio clip
    var fileName = degree + tonality;

    return fileName;

  }; // end findFileName function

// **************** play audio clip ***************

  function playAudio() {

    // fill variable with first file name in playlist
    var nowPlaying = playlist.shift();

    // replace source attribute of audio element with file name
    $("#audioClip").attr("src", "audio/" + nowPlaying + ".mp3");

    // fill variable with audio element
    var audioClip = document.getElementById("audioClip");

    // play audio clip
    audioClip.play();

  }; // end playAudio function

// **************** initialize scale options popovers ***************

  // scale options information
  $("label").popover({
    html: true,
    placement: "bottom",
    trigger: "hover"
  });

// **************** initialize information modal ***************

  // set information modal options
  $("#infoModal").modal({
    backdrop: false,
    show: false
  });

  // show information modal
  $("#infoIcon").click(function() {
    $("#infoModal").modal('show');
  });

// **************** change skin ***************

  // click event on skin selector buttons
  $("#skinSelector button").click(function() {

    // remove existing skin color classes
    $(".skinElement").removeClass("blueSkin greenSkin orangeSkin");

    // fill variable with skin color
    var skin = $(this).attr("data-skin");

    // add skin color class to skin elements
    $(".skinElement").addClass(skin);

  }); // end click event

// **************** initialize chord chart modal ***************

  // set chord chart modal options
  $("#chordChartModal").modal({
    backdrop: false,
    show: false
  });

  // click event on chord chart icons
  $(".chordChartIcon").click(function() {

    // fill variable with contents of adjacent degree box
    var chordName = $(this).siblings(".degreeBox").text();

    // insert chord name into chord chart modal header
    $("#chordChartTitle").text(chordName);

    // fill variable with file name of chord chart image
    var fileName = findFileName(chordName);

    // replace source attribute of chord chart image with chord name
    $("#chordChartImage").attr("src", "img/charts/" + fileName + ".png");

    // show chord chart modal
    $("#chordChartModal").modal('show');

  }); // end click event

// **************** end script ***************

}); // end ready event