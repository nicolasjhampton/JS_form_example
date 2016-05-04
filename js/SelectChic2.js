var Select = (function($) {
'use strict';

/*
 *  SelectChic Version 0.1.0
 *  Copyright Nicolas James Hampton 2016
 *  Style the "select" menus (drop down menus) on the form
 *  so they match the styling of the text fields.
 *
 */

  var selectDivStyles;

  function Select($object, config) {
    
    if(!config) { config = {}; }
    $.call(this);
    this.selectElement = $object;
    this.backgroundColor = config.backgroundColor || $('input').css('background-color');
    this.backgroundImage = config.backgroundImage || "url(https://upload.wikimedia.org/wikipedia/commons/f/f1/MediaWiki_Vector_skin_action_arrow.svg)";
    this.selectPadding = config.selectPadding || ".1em";
    this.imageOffsetPixels = config.imageOffsetPixels || 20;
    this.selectDivString = config.selectDivString || '<div class="newSelect"></div>';
    this.selectListString = config.selectListString || '<ul class="newSelectList"></ul>';
    this.optionString = config.optionString || '<li class="newOption"></li>';
    this.selectListStyles = config.selectListStyles || {'list-style': 'none', 'padding-left': '0px', "padding-right": "50px"};
    this.optionItemStyles = config.optionItemStyles || {'display': 'none', "border-bottom": "solid black 1px", "margin-bottom": "10px", "padding": "5px"};
    selectDivStyles = config.selectDivStyles || {
                            "background-color": this.backgroundColor,
                            "background-image": this.backgroundImage,
                            "background-repeat": "no-repeat",
                            "padding": this.selectPadding };
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


  $.prototype.passAttr = function(sender) {
    var that = this;

    Object.keys(sender.attributes).map(function(key) {
      var attrName = $(sender.attributes[key])['0']['name'];
      var attrValue = $(sender.attributes[key])['0']['value'];
      that.attr(attrName, attrValue);
    });

    return that;
  };


  Select.prototype.convertSelect = function(activeOptionIndex) {
    var that = this;
    var newSelect = $(this.selectDivString);
    var selectList = $(this.selectListString);

    newSelect.append(selectList);
    selectList.css(this.selectListStyles);

    $(this.selectElement).children().each(function(index) {

      var optionLink = $(that.optionString);

      selectList.append(optionLink);
      optionLink.css(that.optionItemStyles);
      optionLink.passAttr(this);
      optionLink.html($(this).html());

      if(index === activeOptionIndex) {
        optionLink.off();
        optionLink.click(displayOptions);
        optionLink.css({'display': ''});
      }
    });

    // Hide the select and append the selectDiv after it
    $(this.selectElement).css({'display': 'none'});
    $(this.selectElement).after(newSelect);
    // Style the new select div
    var imageOffset = $(newSelect).width() - this.imageOffsetPixels;
    $(newSelect).css(selectDivStyles);
    $(newSelect).css("background-position", imageOffset);
  };


  return Select;

})(jQuery);
