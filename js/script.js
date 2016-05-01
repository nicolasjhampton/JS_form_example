'use strict';

var otherTitle = $('<label for="other-title">Title:</label><input type="text" id="other-title" name="other_title" placeholder="Your Title">')


var punsOptions = $('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option><option value="gold">Gold (JS Puns shirt only)</option>');
var heartOptions = $('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>');
var colorsSelect = $('#colors-js-puns');

colorsSelect.hide();
$('#name').focus();

$.prototype.getVal = function() {
  return this.children(':selected').attr('value');
}

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


$('#design').change(function() {
  colorsSelect.show();
  if($(this).getVal() === "js puns") {
    $('#color').html(punsOptions);
  } else if ($(this).getVal() === "heart js") {
    $('#color').html(heartOptions);
  } else {
    colorsSelect.hide();
  }
});

$('select').each

var payment = $('#payment');
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

var jsFrameworks = $(':input[name="js-frameworks"]');
var express = $(':input[name="express"]');
var jsLibs = $(':input[name="js-libs"]');
var node = $(':input[name="node"]');

// var all = $(':input[name="all"]');
// var buildTools = $(':input[name="build-tools"]');
// var npm = $(':input[name="npm"]');
var totalCost = 0;

var activities = $('.activities :input[type="checkbox"]');

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
