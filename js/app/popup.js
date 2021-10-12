function autoFillPopUp(question) {
  // console.log(e.target.className);
  // let names = e.target.className.split(" ");
  // let cat = names[1].substr(-1) - 1;
  // let pos = names[2].substr(-1) - 1;
  
  let $questionText = $("<label>")
    .attr("for", "answer")
    .text(`${question}`)
    .addClass("ques")
    .css("display", "block");

  let $input = $("<input>")
    .attr("type", "text")
    .attr("name", "answer")
    .attr("autocomplete", "off")
    .css("display", "inline-block")
    .addClass("ans");

  let $submitButton = $("<input>")
    .attr("type", "submit")
    .attr("value", "submit")
    .addClass("subbmitButton")
    .css("display", "inline-block");

  let $field = $("<form>")
    .addClass("field")
    .append($questionText)
    .append($input)
    .append($submitButton);

  return $("<div>")
    // .html("JEOPARDY!")
    .addClass("question")
    .append($field);

  //   .appendTo(document.body)
  //   .on("submit", function(e){
  //     e.preventDefault();
  //     console.log("goine");
  //     console.log(e.target.className);
  //     $(e.target).
  //       parent().
  //       remove();
  // });
}



// export {autoFillPopUp}; 
const _autoFillPopUp = autoFillPopUp;
export { _autoFillPopUp as autoFillPopUp };
// export { autoFillPopUp as default };
// export default autoFillPopUp;
