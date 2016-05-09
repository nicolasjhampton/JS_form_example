!function($, window, document) {
'use strict';

/*
 *  SelectChic Version 2.0.0
 *  Copyright Nicolas James Hampton 2016
 *  Style the "select" menus (drop down menus) on the form
 *  so they match the styling of the text fields.
 *
 */

  var host = {};

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
    }
  };

  $.configureSelect = function(options) {

    if(!options) { options = {}; }
    var config = $.extend( {}, defaults, options );

    //host.selectElement = $object;

    Object.keys(config).map(function(setting) {
      host[setting] = config[setting];
    });

    host.selectDivStyles = {
      "background-color": host.backgroundColor,
      "background-image": host.backgroundImage,
      "background-repeat": "no-repeat",
      "padding": host.selectPadding
    }
  }



  function optionSelect(e) {
    e.stopPropagation();

    var thisOptionItem = $(this);
    var selectDiv = thisOptionItem.parent().parent();
    var imageOffset = selectDiv.width() - host.imageOffsetPixels;
    var selectBox = selectDiv.prev();
    var optionSelectorString = '[value="' + thisOptionItem.attr('value') + '"]';
    var selectBoxOptionSelected = selectBox.children(optionSelectorString);

    thisOptionItem.show()
                  .click(displayOptions)
                  .siblings().hide();

    selectDiv.css("background-position", imageOffset)
             .css(host.selectDivStyles);

    selectBoxOptionSelected.prop("selected", true);

    selectBox.trigger('change');
  }


  function displayOptions(e) {
    e.stopPropagation();
    var that = $(this); // optionLink
    that.off().click(optionSelect);
    that.siblings().off().click(optionSelect).show('slow');
  }


  $.fn.copyElement = function(sender) {
    var that = this;

    Object.keys(sender.attributes).map(function(key) {
      var attrName = sender.attributes[key].name;
      var attrValue = sender.attributes[key].value;
      that.attr(attrName, attrValue);
    });

    that.html(sender.innerHTML);

    return that;
  };


  $.fn.convertSelect = function(activeOptionIndex) {
    var newSelect = $(host.selectDivString);
    var selectList = $(host.selectListString);
    var selectElement = this;//$(host.selectElement);

    newSelect.append(selectList);
    selectList.css(host.selectListStyles);

    selectElement.children().each(function(index) {

      var optionLink = $(host.optionString);

      selectList.append(optionLink);
      optionLink.css(host.optionItemStyles)
                .copyElement(this);

      if(index === activeOptionIndex) {
        optionLink.off()
                  .show()
                  .click(displayOptions);
      }
    });

    selectElement.hide().after(newSelect);
    // Style the new select div (note: browser must calculate image width in real time)
    var imageOffset = newSelect.width() - host.imageOffsetPixels;
    newSelect.css(host.selectDivStyles)
             .css("background-position", imageOffset);
  };


}(jQuery, window, document);
