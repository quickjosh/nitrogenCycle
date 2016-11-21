var START_YEARS = 0;//Initial value for years. Set as CONSTANT to prevent side-effects
var START_TREES = 60;//Initial value for tree. Set as CONSTANT to prevent side-effects
var START_SOILNUM = 120;//Initial value for years. Set as CONSTANT to prevent side-effects
var treePool = document.getElementById("treePool");//Container for treePool
var years, trees, soilNum;//Variables for reset function to change
resetValue();//Call for reset function

function flowMaker() {//Button for increasing fixation
    var fix = document.getElementById("flowIncr").value;//Points to value for options
    soilNum += ((fix /.5) - 3) * 5;//Equation for amount of soil nitrogen using fix values
    years += 10;//Value for year incrementer
    trees += 10;//Value for tree incrementer
    render();
    years===50 ? (document.getElementById("10years").disabled = true) : false;//Disables button at value 50years
    if (treePool.style.padding === ""){//Conditionals for adding padding to tree nitrogen ****WILL REFACTOR
        treePool.style.padding = "2px"
    } else if (treePool.style.padding === "2px"){
        treePool.style.padding = "4px"
    } else if (treePool.style.padding === "4px") {
        treePool.style.padding = "6px" } else {
        treePool.style.padding = "8px"
    }
}


function adjustPixels(value, amount){//possible solution to replace padding for tree nitorgen
    var arr = value.split(' ');
    for (var i=0; i<arr.length; i++) {
       if (isInteger(arr[i])===true) {
        
       }
    }
}

function render() {//created to stop redundancy in the resetValue function
    document.getElementById("tree").innerHTML = trees;
    document.getElementById("year").innerHTML = years;
    document.getElementById("soil").innerHTML = soilNum;
}

function resetValue() {//resets value for years, trees soil and padding.
    years = START_YEARS;//constants to reset values
    trees = START_TREES;
    soilNum = START_SOILNUM;
    treePool.style.padding = "";
    render();
    document.getElementById("10years").disabled = false;
}








//$('select').on('change', function(){
//    $(this).val()
//    fix = Number($(this).val())
//    console.log(fix)
//})
//
//
//$('button').on('click', function(){
//    console.log('Button clicked')
//    years += 10
//    soil += ((fix /.5) - 3) * 5
//    tree += 10
//    $('#soil').text(soil);
//    $('#tree').text(tree);
//    $('#years').text(years);
//})






