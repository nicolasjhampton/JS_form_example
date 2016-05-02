'use strict';

/*
 *  Style the "select" menus (drop down menus) on the form
 *  so they match the styling of the text fields.
 *
 */


var backgroundColor = $('input').css('background-color');
var backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/f/f1/MediaWiki_Vector_skin_action_arrow.svg)";
var selectPadding = ".1em";
var selectDivStyles = {
  "background-image": backgroundImage,
  "background-color": backgroundColor,
  "background-repeat": "no-repeat",
  "padding": selectPadding }
var preventChange = false;
var optionString = '<li class="newOption"></li>';
var selectDivString = '<div class="newSelect"></div>';
var selectListString = '<ul class="newSelectList"></ul>';
var selectListStyles = {'list-style': 'none', 'padding-left': '0px', "padding-right": "50px"};
var optionItemStyles = {'display': 'none', "border-bottom": "solid black 1px", "margin-bottom": "10px", "padding": "5px"};


$.prototype.getVal = function() {
  return this.children(':selected').attr('value');
}

$.prototype.passAttr = function (sender) {
  var that = this;

  Object.keys(sender.attributes).map(function(key) {
    var attrName = $(sender.attributes[key])['0']['name'];
    var attrValue = $(sender.attributes[key])['0']['value'];
    that.attr(attrName, attrValue);
  });

  return that;
}

function optionSelect(e) {
  e.stopPropagation();

  var thisOptionItem = this;
  var selectDiv = $(this).parent().parent();
  var imageOffset = selectDiv.width() - 20;
  var selectBox = selectDiv.prev();
  var optionSelectorString = '[value="' + $(thisOptionItem).attr('value') + '"]';
  var selectBoxOptionSelected = selectBox.children(optionSelectorString);

  $(thisOptionItem).css({'display': ''});
  $(thisOptionItem).siblings().css({'display': 'none'});
  $(thisOptionItem).click(displayOptions);
  selectDiv.css("background-position", imageOffset);
  selectDiv.css(selectDivStyles);
  selectBoxOptionSelected.prop("selected", true);

  if(!preventChange) { selectBox.trigger('change') };
}


function displayOptions(e) {
  e.stopPropagation();
  var parentSelectDiv = $(this).parent().parent();

  $(this).off().siblings().off(); // Important: removes previous event handlers
  $(this).click(optionSelect);
  $(this).siblings().click(optionSelect);
  $(this).siblings().show('slow');
}


$.prototype.convertSelect = function(activeOptionIndex) {
  var newSelect = $(selectDivString);
  var selectList = $(selectListString);

  newSelect.append(selectList);
  selectList.css(selectListStyles);

  this.children().each(function(index) {

    var optionLink = $(optionString);

    selectList.append(optionLink);
    optionLink.css(optionItemStyles);
    optionLink.passAttr(this);
    optionLink.html($(this).html());

    if(index === activeOptionIndex) {
      optionLink.off();
      optionLink.click(displayOptions);
      optionLink.css({'display': ''});
    }
  });

  // Hide the select and append the selectDiv next to it
  this.css({'display': 'none'}).parent().append(newSelect);

  var imageOffset = $(newSelect).width() - 20;
  $(newSelect).css(selectDivStyles);
  $(newSelect).css("background-position", imageOffset);
}


$('select').each(function() {
  $(this).convertSelect(0);
});


/*
 *  For the T-Shirt color menu, only display the options that
 *  match the design selected in the "Design" menu. Also, hide
 *  the color menu until a design has been chosen.
 */

$('#color').next().hide().prev().prev().hide();

$('#design').change(function(e) {
  e.stopPropagation();

  var designSelect = $(this);
  var designDiv = designSelect.next();

  var punsOptions = '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>';
  var heartOptions = '<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>';
  var colorSelect = $('#color');

  var colorChildren = colorSelect.children();
  var selectValue = designSelect.getVal();

  var designOptionIndex;

  designDiv.children().children().off().each(function(index) {
    if($(this).attr('value') === selectValue) {
      designOptionIndex = index;
      return false;
    }
  });


  if(colorChildren.length === 3) {

    if($(colorChildren[0]).val() === "cornflowerblue") {
      colorSelect.append(heartOptions);

    } else {
      colorSelect.append(punsOptions);

    }

  } else if (colorChildren.length === 0) {

    colorSelect.append(punsOptions).append(heartOptions);

  }


  if (selectValue === "") {

    colorSelect.next().hide().prev().prev().hide();

  } else {

    colorSelect.next().show().prev().prev().show();

    var allColorOptions = colorSelect.children().detach();

    allColorOptions.each(function() {

      var option = $(this);

      var optionValue = option.val();

      if(selectValue === "js puns") {

        if(optionValue === "cornflowerblue" || optionValue === "darkslategrey" || optionValue === "gold") {
          colorSelect.append(option);

        }
      } else if (selectValue === "heart js") {

        if(optionValue === "tomato" || optionValue === "steelblue" || optionValue === "dimgrey") {
          colorSelect.append(option);

        }
      }
    });
    colorSelect.next().remove();
    colorSelect.each(function() {
      $(this).convertSelect(0);
    });
  }
  designSelect.next().remove();
  designSelect.each(function() {
    $(this).convertSelect(designOptionIndex);
  });
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
  if($(this).getVal() === "other") {
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
    if(index === 0) {
      var cost = 200;
    } else {
      var cost = 100;
    }
    if($(this).prop('checked') === true) {
      console.log
      totalCost += cost;
    } else {
      totalCost -= cost;
    }
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

$('#payment').change(function() {
  var that = $(this).getVal();
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
 *  Todo: Validation
 *
 */
