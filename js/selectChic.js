var SelectChic = (function($, window, document) {
'use strict';

/*
 *  SelectChic Version 1.1.0
 *  Copyright Nicolas James Hampton 2016
 *  Style the "select" menus (drop down menus) on the form
 *  so they match the styling of the text fields.
 *
 */

  var selectElement;
  var backgroundColor;
  var backgroundImage;
  var selectPadding;
  var imageOffsetPixels;
  var selectDivString;
  var selectListString;
  var optionString;
  var selectListStyles;
  var optionItemStyles;
  var selectDivStyles;

  var defaults = {
    "backgroundColor": $('input').css('background-color'),
    "backgroundImage": "url(https://upload.wikimedia.org/wikipedia/commons/f/f1/MediaWiki_Vector_skin_action_arrow.svg)",
    "selectPadding": ".1em",
    "imageOffsetPixels": 20,
    "selectDivString": '<div class="newSelect"></div>',
    "selectListString": '<ul class="newSelectList"></ul>',
    "optionString": '<li class="newOption"></li>',
    "selectListStyles": {
      "list-style": "none",
      "padding-left": "0px",
      "padding-right": "50px"
    },
    "optionItemStyles": {
      "display": "none",
      "border-bottom": "solid black 1px",
      "margin-bottom": "10px",
      "padding": "5px"
    },
    "selectDivStyles": {
      "background-color": backgroundColor,
      "background-image": backgroundImage,
      "background-repeat": "no-repeat",
      "padding": selectPadding
    }
  };

  function Select($object, options) {
    $.call(this);
    if(!options) { options = {}; }
    var config = $.extend( {}, defaults, options );
    selectElement = $object;
    backgroundColor = config.backgroundColor;
    backgroundImage = config.backgroundImage;
    selectPadding = config.selectPadding;
    imageOffsetPixels = config.imageOffsetPixels;
    selectDivString = config.selectDivString;
    selectListString = config.selectListString;
    optionString = config.optionString;
    selectListStyles = config.selectListStyles;
    optionItemStyles = config.optionItemStyles;
    selectDivStyles = config.selectDivStyles;
  }



  function optionSelect(e) {
    e.stopPropagation();

    var thisOptionItem = this;
    var selectDiv = $(thisOptionItem).parent().parent();
    var imageOffset = selectDiv.width() - this.imageOffsetPixels;
    var selectBox = selectDiv.prev();
    var optionSelectorString = '[value="' + $(thisOptionItem).attr('value') + '"]';
    var selectBoxOptionSelected = selectBox.children(optionSelectorString);

    $(thisOptionItem).css({'display': ''});
    $(thisOptionItem).siblings().css({'display': 'none'});
    $(thisOptionItem).click(displayOptions);
    selectDiv.css("background-position", imageOffset);
    selectDiv.css(selectDivStyles);
    selectBoxOptionSelected.prop("selected", true);

    selectBox.trigger('change');
  }


  function displayOptions(e) {
    e.stopPropagation();
    var that = this; // optionLink
    $(this).off().siblings().off(); // Important: removes previous event handlers
    $(this).click(optionSelect.bind(that));
    $(this).siblings().click(optionSelect);
    $(this).siblings().show('slow');
  }


  $.fn.passAttr = function(sender) {
    var that = this;

    Object.keys(sender.attributes).map(function(key) {
      var attrName = $(sender.attributes[key])['0']['name'];
      var attrValue = $(sender.attributes[key])['0']['value'];
      that.attr(attrName, attrValue);
    });

    return that;
  };


  Select.prototype.convertSelect = function(activeOptionIndex) {
    var newSelect = $(selectDivString);
    var selectList = $(selectListString);

    newSelect.append(selectList);
    selectList.css(selectListStyles);

    $(selectElement).children().each(function(index) {

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
    $(selectElement).css({'display': 'none'});
    $(selectElement).after(newSelect);
    // Style the new select div (note: browser must calculate image width in real time)
    var imageOffset = $(newSelect).width() - imageOffsetPixels;
    $(newSelect).css(selectDivStyles);
    $(newSelect).css("background-position", imageOffset);
  };


  return Select;

})(jQuery, window, document);
