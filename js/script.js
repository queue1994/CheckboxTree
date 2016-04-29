var input = document.querySelectorAll('.checkboxtree input[type=checkbox]');

Array.prototype.forEach.call(input, function(node){
    node.addEventListener('change', function(){
      onChangeCheckBox(node);
    });
});

function onChangeCheckBox(checkbox){
  var isChecked = checkbox.checked;
  console.log( (isChecked ? "checked" : "unchecked") + " " + checkbox.nextSibling.innerHTML);

  if(isChecked){
    setAllChildren(checkbox,true);
    setCheckedParents(checkbox);
  }else{
    setAllChildren(checkbox,false);
    updateParents(checkbox);
  }
}

function setAllChildren(node, check){
  var children = node.parentNode.querySelectorAll('input');
  
  Array.prototype.forEach.call(children, function(chb){
      chb.checked = check;
  });
}

function getCheckBoxParent(chb){
  var parentChB = chb.parentNode.parentNode.previousSibling.previousSibling;
  if(parentChB != null){
      return parentChB.previousSibling;
  }
  return null;
}

function getCheckBoxSiblings(chb){
  var sibs = [];
  chb = chb.parentNode.parentNode.firstElementChild;
  do {
    sibs.push(chb.firstElementChild);
  } while (chb = chb.nextElementSibling)
  return sibs;
}

function setCheckedParents(node){
  var sibs = getCheckBoxSiblings(node);
  var allChecked = true;

  sibs.forEach(function(iter){
    if(!iter.checked)
      allChecked = false;
  });

  if(allChecked){
    var parent = getCheckBoxParent(node);
    parent.checked = true;
    setCheckedParents(parent);
  }

  /*
  var parent = getCheckBoxParent(node);

  if(parent != null){
    parent.checked = true;
    setCheckedParents(parent);
  }
  */
}

function updateParents(node){
  var parent = getCheckBoxParent(node);
  parent.checked = false;
  updateParents(parent);

  /*
  var sibs = getCheckBoxSiblings(node);
  var allUnchecked = true;


  sibs.forEach(function(iter){
    if(iter.checked)
      allUnchecked = false;
  });

  if(allUnchecked){
    var parent = getCheckBoxParent(node);
    parent.checked = false;
    updateParents(parent);
  }
  */
}