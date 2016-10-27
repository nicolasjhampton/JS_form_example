'use strict';

var $ = require('selectchic');

$('select').selectChic().renderChic();

/*
 *  For the T-Shirt color menu, only display the options that
 *  match the design selected in the "Design" menu. Also, hide
 *  the color menu until a design has been chosen.
 */

var colorSelect = $('#color');
var jsPunsValues = ["cornflowerblue", "darkslategrey", "gold"];
var jsHeartValues = ["tomato", "steelblue", "dimgrey"];
var punsOptions = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>';
var heartOptions = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';


/* helper function for design event handler */
function restoreColorOptions() {
  var colorChildren = colorSelect.children();

  // If only three of the six options are left...
  if(colorChildren.length === 3) {
    // check if the first option is still a punOption...
    if($(colorChildren[0]).val() === "cornflowerblue") {
      colorSelect.append(heartOptions);
    } else { // else if the first option is not a punOption...
      colorSelect.append(punsOptions);
    }
  // else if all the options are gone...
  } else if (colorChildren.length === 0) {
    // add all the options back.
    colorSelect.append(punsOptions).append(heartOptions);
  }
}

// Hides the color display initially, as no design has been chosen
colorSelect.next().hide().prev().prev().hide();

// On change listener for the design select
$('#design').change(function(e) {
  e.stopPropagation();

  var designSelect = $(this);
  var designDiv = designSelect.next();
  var designListItems = designDiv.children().children();
  var designValue = designSelect.val() === null ? "" : designSelect.val();
  var colorDiv = colorSelect.next();
  var colorLabel = colorSelect.prev();
  var designOptionIndex;

  // Remove all event handlers from the old designDiv list items
  designListItems.off();
  // Find list item that was selected and store it's array position
  designListItems.each(function(index) {
    if($(this).attr('value') === designValue) {
      designOptionIndex = index;
      return false;
    }
  });

  restoreColorOptions();

  if (designValue === "") {
    // Hide the color options display if there's not a design picked
    colorDiv.hide();
    colorLabel.hide();

  } else {
    // show color options display
    colorDiv.show();
    colorLabel.show();

    // detach and store all the option elements for color select element
    var allColorOptions = colorSelect.children().detach();

    allColorOptions.each(function() { // Go through each option element
      var colorOption = $(this);
      var colorOptionValue = colorOption.val();

      if(designValue === "js puns" &&
         jsPunsValues.indexOf(colorOptionValue) !== -1) {

          colorSelect.append(colorOption);

      } else if
        (designValue === "heart js" &&
         jsHeartValues.indexOf(colorOptionValue) !== -1) {

          colorSelect.append(colorOption);
      }
    });
    // Recreate colorDiv
    if(typeof $.fn.selectChic == "function") {
      colorDiv.remove();
      $(colorSelect).convertSelect(0);
    }
  }
  // Recreate designDiv, show last selected item
  if(typeof $.fn.selectChic == "function") {
    designDiv.remove();
    $(designSelect).convertSelect(designOptionIndex);
  }
});


var payment = $('#payment');

var otherTitle = $('<label for="other-title">Title:</label><input type="text" id="other-title" name="other_title" placeholder="Your Title">');

var jsFrameworks = $(':input[name="js-frameworks"]');
var express = $(':input[name="express"]');
var jsLibs = $(':input[name="js-libs"]');
var node = $(':input[name="node"]');
var activities = $('.activities :input[type="checkbox"]');
var totalCost = 0;

var checkbox = [
  {
    "a":jsFrameworks,
    "b":express
  },
  {
    "a":jsLibs,
    "b":node
  }
];


/*
*  Set focus on the first text field
*/

$('[type="text"]').first().focus();


/*
*  Reveal a text field when the "Other" option is selected
*  from the "Job Role" drop down menu
*/


$('#title').change(function() {
  if($(this).val() === "other") {
    otherTitle.hide();
    $(this).parent().append(otherTitle);
    otherTitle.fadeIn('slow');
  } else {
    var label = $('#other-title').prev();
    $('#other-title').fadeOut('slow', function() {
      $(label).hide(function() {
        $('#other-title').remove();
        $(label).remove();
      });
    });
  }
});


/*
*  Activities:
*  don't allow selection of a workshop at the same date and time
*  disable the checkbox and visually indicate that the workshop
*  in the competing time slot isn't available.
*/

checkbox.map(function(pair) {
  pair.a.change(function() {
    if($(this).prop('checked') === true) {
      $(this).parent().css('color', 'black');
      pair.b
        .prop('checked', false)
        .prop('disabled', true)
        .parent()
        .css('color', 'rgba(0,0,0,.5)');
    } else {
      pair.b.prop('disabled', false).parent().css('color', 'black');
    }
  });

  pair.b.change(function() {
    if($(this).prop('checked') === true) {
      $(this).parent().css('color', 'black');
      pair.a
        .prop('checked', false)
        .prop('disabled', true)
        .parent()
        .css('color', 'rgba(0,0,0,.5)');
    } else {
      pair.a.prop('disabled', false).parent().css('color', 'black');
    }
  });
});


/*
*  Activities Total:
*  As a user selects activities to register for,
*  a running total is listed below the list of checkboxes.
*/

activities.each(function(index) {
  $(this).change(function() {
    var isChecked = $(this).prop('checked');
    var cost = index === 0 ? 200 : 100;
    var change = isChecked ? cost : -cost;
    totalCost += change;
    $('.totalCost').remove();
    if(totalCost !== 0) {
      $('.activities').append('<h2 class="totalCost">Your total cost is currently $' + totalCost + ' dollars.</h2>');
    }
  });
});


/*
*  Payment info:
*  Display payment sections based on chosen payment option
*
*/

$('#credit-card').hide();
$('#paypal').hide();
$('#bitcoin').hide();

payment.change(function() {
  var that = $(this).val();
  if (that === "credit card") {
    $('#credit-card').show();
    $('#paypal').hide();
    $('#bitcoin').hide();
  } else if (that === "paypal"){
    $('#credit-card').hide();
    $('#paypal').show();
    $('#bitcoin').hide();
  } else if (that === "bitcoin"){
    $('#credit-card').hide();
    $('#paypal').hide();
    $('#bitcoin').show();
  }
});


/*
*  Validation
*  Display error messages and don't let the user submit the form
*
*/

var emailPattern = new RegExp(/^[_a-zA-Z0-9]+@[-_a-zA-Z0-9]+\.[-_a-zA-Z0-9]+$/);
var cardNumPattern = new RegExp(/^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{4}$/);
var zipPattern = new RegExp(/^[0-9]{5}$/);
var cvvPattern = new RegExp(/^[0-9]{3}$/);

var errorMessages = [
  "Your name is empty!",
  "Please enter a vaild email: you@who.huh",
  "You must select at least one activity.",
  "Please select a payment option.",
  "Invalid credit card number!",
  "Please enter your 4 digit billing zip code",
  "Invalid security code!"
];

function luhnAlgorithm(input) {
  var ccnumber = input.trim().split(/[-||\s]+/).join('').trim();
  var re = /^[\d]+$/;
  if(!re.test(ccnumber)) return false;
  var ccArray = ccnumber.split('');

  var offset = ccArray.length % 2;
  var checksum = ccArray.map(num => parseInt(num))
                        .map((num, index) => ((index + offset) % 2 == 0) ? num * 2 : num)
                        .map(num => (num < 10) ? num : num - 9)
                        .reduce((acc, next) => acc + next, 0);

  return checksum % 10 == 0;
}


$('form').submit(function(e) {

  var nameFilled = ($('#name').val() !== "");

  var emailMatches = emailPattern.test($('#mail').val());

  var activitiesSelected = ($('input[type="checkbox"]:checked').length !== 0);

  var paymentSelected = ($('#payment').val() !== "select_method");

  var validation = [nameFilled, emailMatches, activitiesSelected, paymentSelected];

  if($('#payment').val() === "credit card") {

   var cardNumValid = luhnAlgorithm($('#cc-num').val());
   var zipVaild = zipPattern.test($('#zip').val());
   var cvvValid = cvvPattern.test($('#cvv').val());

   validation.push(cardNumValid, zipVaild, cvvValid);
  }

  if(validation.includes(false)) {
   e.preventDefault();
   var errors = "";
   validation.map(function(validator, index) {
     if(!validator) {
       errors += errorMessages[index] + '\n';
     }
   });
   alert(errors);
  }
});
