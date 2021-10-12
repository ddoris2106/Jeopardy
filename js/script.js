"use strict";function _createForOfIteratorHelper(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var o=0,n=function(){};return{s:n,n:function(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,c=!0,a=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return c=e.done,e},e:function(e){a=!0,l=e},f:function(){try{c||null==r.return||r.return()}finally{if(a)throw l}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _createClass(e,t,r){return t&&_defineProperties(e.prototype,t),r&&_defineProperties(e,r),e}for(var category1=document.querySelectorAll(".cat1"),category2=document.querySelectorAll(".cat2"),category3=document.querySelectorAll(".cat3"),category4=document.querySelectorAll(".cat4"),category5=document.querySelectorAll(".cat5"),category6=document.querySelectorAll(".cat6"),categories=[category1,category2,category3,category4,category5,category6],jeopardyAPI="http://jservice.io/api/clues?category=",Clues=function(){function e(){_classCallCheck(this,e),this.clue=[],this.randNum=Math.floor(1e3*Math.random())}return _createClass(e,[{key:"getClues",value:function(){var e=this;fetch(jeopardyAPI+this.randNum).then((function(e){return e.json()})).then((function(t){if(t.length>=5){e.clue.length>0&&(e.clue=[]),e.clue.push(t[0].category.title);for(var r=0;r<5;r++){var o=t[r].value,n=t[r].question,l=t[r].answer;e.clue.push({clueVal:o,clueQuest:n,clueAns:l})}}else e.randNum=Math.floor(1e3*Math.random()),e.getClues()})).catch((function(e){return console.error(e)}))}}]),e}(),hasEmptyField=function(e){for(var t=[],r=1;r<e.length;r++)""==e[r].clueQuest||""==e[r].clueAns?t.push(1):t.push(0);return t},clues=[],i=0;i<categories.length;i++)clues[i]=new Clues;for(var _loop=function(){var e=_clues[_i];e.getClues(),setTimeout((function(){hasEmptyField(e.clue).includes(1)&&e.getClues()}),500)},_i=0,_clues=clues;_i<_clues.length;_i++)_loop();setTimeout((function(){var e,t=_createForOfIteratorHelper(clues);try{for(t.s();!(e=t.n()).done;)for(var r=e.value,o=1;o<r.clue.length;o++)null==r.clue[o].clueVal&&(console.log("There is a missing value!"),console.log(100*o),r.clue[o].clueVal="".concat(100*o))}catch(e){t.e(e)}finally{t.f()}}),2e3),setTimeout((function(){for(var e=0;e<categories.length;e++){categories[e][0].innerHTML="".concat(clues[e].clue[0]);for(var t=1;t<categories[e].length;t++)categories[e][t].innerHTML="".concat(clues[e].clue[t].clueVal)}console.log(clues),$(".clue").on("click",(function(e){e.preventDefault(),console.log(e),console.log(e.target.className);var t=e.target.className.split(" "),r=t[1].substr(-1)-1,o=t[2].substr(-1);console.log(r,o),console.log(clues[r].clue[o].clueQuest);var n=autoFillPopUp(clues[r].clue[o].clueQuest);console.log(n),e.target.classList.add("clicked"),n.appendTo(document.body).on("submit",(function(e){e.preventDefault(),console.log("submitted. checking!");var t=$(".ans").val().toLowerCase(),n=clues[r].clue[o].clueAns.toLowerCase();t==n?console.log("correct"):(console.log("incorrect"),console.log(n)),$(e.target).parent().remove()}))}))}),15e3);
//# sourceMappingURL=script.js.map