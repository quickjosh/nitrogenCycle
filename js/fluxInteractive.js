var START_YEARS = 0;//Initial value for years. Set as CONSTANT to prevent side-effects
var START_TREES = 60;//Initial value for tree. Set as CONSTANT to prevent side-effects
var START_SOILNUM = 120;//Initial value for years. Set as CONSTANT to prevent side-effects
var flowIncrArrow = document.getElementById("flowIncrArrow");//Container for treePool
var treePool = document.getElementById("treePool");//Container for treePool
var years, trees, soilNum;//Variables for reset function to change
resetValue();//Call for reset function

function flowMaker() {//Button for increasing fixation
    var fix = document.getElementById("flowIncr").value;//Points to value for options
    soilNum += ((fix / .5) - 3) * 5;//Equation for amount of soil nitrogen using fix values
    years += 10;//Value for year incrementer
    trees += 10;//Value for tree incrementer
    render();
    years === 50 ? (document.getElementById("10years").disabled = true) : false;//Disables button at value 50years

    var padding = treePool.style.padding;//Increases padding for tree pool
    padding = Number(padding.slice(0, padding.length - 2));
    treePool.style.padding = (padding + 2) + 'px';
}

function render() {//created to stop redundancy in the resetValue function
    document.getElementById("tree").innerHTML = trees;
    document.getElementById("year").innerHTML = years;
    document.getElementById("soil").innerHTML = soilNum;
}

document.addEventListener("change", selectFlow);//changes select value which changes stroke width

function resetValue() {//resets value for years, trees soil and padding.
    years = START_YEARS;//constants to reset values
    trees = START_TREES;
    soilNum = START_SOILNUM;
    treePool.style.padding = "";
    render();
    flowIncrArrow.style.borderLeftWidth = "2px";//Resets stroke width to original on dropdown change
    flowIncrArrow.style.borderBottomWidth = "2px";//Resets stroke width to original on dropdown change
    document.getElementById("flowIncr").value = 0;
    document.getElementById("10years").disabled = false;
}

function selectFlow() {
    flowIncrArrow.style.borderLeftWidth = "";//Resets stroke width
    flowIncrArrow.style.borderBottomWidth = "";//Resets stroke width
    var fixWidth = document.getElementById("flowIncr").value;
    var widthNum = (2 * fixWidth) + 2;//Equation for finding stroke width y=2x+2
    console.log(fixWidth, widthNum);//See what's going down

    var borderLeft = flowIncrArrow.style.borderLeftWidth;//Increases stroke width left
    borderLeft = Number(borderLeft.slice(0, borderLeft.length - 2));
    flowIncrArrow.style.borderLeftWidth = (borderLeft + widthNum) + 'px';

    var borderBottom = flowIncrArrow.style.borderBottomWidth;//Increases stroke width bottom
    borderBottom = Number(borderBottom.slice(0, borderBottom.length - 2));
    flowIncrArrow.style.borderBottomWidth = (borderBottom + widthNum) + 'px';


}






