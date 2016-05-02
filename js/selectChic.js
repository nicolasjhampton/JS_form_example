'use strict';

/*
 *  SelectChic Version 0.1.0
 *  Copyright Nicolas James Hampton 2016
 *  Style the "select" menus (drop down menus) on the form
 *  so they match the styling of the text fields.
 *
 */

var backgroundColor = $('input').css('background-color');
var backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/f/f1/MediaWiki_Vector_skin_action_arrow.svg)";
var selectPadding = ".1em";
var imageOffsetPixels = 20;
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

function optionSelect(e) {
  e.stopPropagation();

  var thisOptionItem = this;
  var selectDiv = $(this).parent().parent();
  var imageOffset = selectDiv.width() - imageOffsetPixels;
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

$.prototype.convertSelect = function(activeOptionIndex) {
  var selectElement = this;
  var newSelect = $(selectDivString);
  var selectList = $(selectListString);

  newSelect.append(selectList);
  selectList.css(selectListStyles);

  selectElement.children().each(function(index) {

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

  // Hide the select and append the selectDiv after it
  selectElement.css({'display': 'none'});
  selectElement.after(newSelect);
  // Style the new select div
  var imageOffset = $(newSelect).width() - imageOffsetPixels;
  $(newSelect).css(selectDivStyles);
  $(newSelect).css("background-position", imageOffset);
}

// Convert all the selects into divs
$('select').each(function() {
  $(this).convertSelect(0);
});
