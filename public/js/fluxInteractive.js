var START_YEARS = 0;//Initial value for years. Set as CONSTANT to prevent side-effects
var START_TREES = 60;//Initial value for tree. Set as CONSTANT to prevent side-effects
var START_SOILNUM = 120;//Initial value for years. Set as CONSTANT to prevent side-effects
var OVAL_RATIO = 2;
var SCALING_FACTOR = 90;
var flowIncrArrow = document.getElementById("flowIncrArrow");//Container for flow arrow
var dentrArrow = document.getElementById("dentrArrow");//Container for dentrification arrow
var uptakeArrow = document.getElementById("uptakeArrow");//Container for uptake arrow
var decompArrow = document.getElementById("decompArrow");//Container for decomposition arrow
var soilPool = document.getElementById("soilPool");//Container for soilPool oval
var treePool = document.getElementById("treePool");//Container for treePooloval
var years, trees, soilNum;//Variables for reset function to change
var yearsDisplayElem = document.getElementById('year')//Years display value
var soilDisplayElem = document.getElementById('soil')//Soil display value
var treeDisplayElem = document.getElementById('tree')//Tree display value
setDefault();
resetValue();//Call for reset function

setInterval(function () {
    var yearDisplay = Number(yearsDisplayElem.innerHTML);
    if (yearDisplay < years) {
        yearsDisplayElem.innerHTML = yearDisplay + 1;
    } else if (yearDisplay > years) {
        yearsDisplayElem.innerHTML = years
    }
    var soilNumDisp = Number(soilDisplayElem.innerHTML);//soilNum
    var soilChangePerYear = (soilNum - soilNumDisp) / ((years - yearDisplay) || 1);//soilNum subtracted
    soilDisplayElem.innerHTML = years === 0 ? soilNum : Math.round(soilNumDisp + soilChangePerYear);


    var treeNumDisp = Number(treeDisplayElem.innerHTML);
    var treeChangePerYear = (trees - treeNumDisp) / ((years - yearDisplay) || 1);
    treeDisplayElem.innerHTML = years === 0 ? trees : Math.round(treeNumDisp + treeChangePerYear);
    renderEllipsePool(treePool, treeNumDisp);//function for adjusting width/height of treePool
    renderEllipsePool(soilPool, soilNumDisp);//function for adjusting width/height of soilPool

    if (soilNum <= 70) {//Makes opacity disappear and keeps ovals at width + height to prevent arrows from dissapearing
        document.getElementById("soilPool").style.background = "rgba(68, 27, 0, " + " ." + (soilNum + 20) + ")";
        document.getElementById("soilPool").style.boxShadow = "0 0 10px 5px rgba(68, 27, 0," + " ." + (soilNum + 20) + ")";
        document.getElementById("soilPool").style.width = "134px";
        document.getElementById("soilPool").style.height = "67px";

    } else {
        document.getElementById("soilPool").style.background = "";
        document.getElementById("soilPool").style.boxShadow = "";

    }

    if (soilNum >= 210) {
        document.getElementById("nitroSoilFull").style.display = "block";
        document.getElementById("soilPool").style.width = "274px";
        document.getElementById("soilPool").style.height = "137px";

    } else {
        document.getElementById("nitroSoilFull").style.display = "none";
        document.getElementById("soilPool").style.display = "block";
    }

    if (trees >= 210) {
        document.getElementById("treePool").style.width = "274px";
        document.getElementById("treePool").style.height = "137px";
        document.getElementById("nitroTreeFull").style.display = "block";

    } else {
        document.getElementById("nitroTreeFull").style.display = "none";
    }

    if (trees <= 50) {
        document.getElementById("treePool").style.background = "rgba(235, 248, 202, " + " ." + (trees + 20) +  ")";
        document.getElementById("treePool").style.boxShadow = "0 0 10px 5px rgba(235, 248, 202, " + " ." + (trees + 20) +  ")";
        document.getElementById("treePool").style.width = "134px";
        document.getElementById("treePool").style.height = "67px";
    } else {
        document.getElementById("treePool").style.background = "";
        document.getElementById("treePool").style.boxShadow = "";
    }
}, 80);


function setDefault() {
    document.getElementById("decompInc").value = '4.0';
    document.getElementById("uptakeInc").value = '4.0';
    document.getElementById("flowIncr").value = '2.0';
    document.getElementById("dentInc").value = '2.0';
    resetValue()
}

function flowMaker() {//Button for increasing fixation
    var fixValue = document.getElementById("flowIncr").value;//Points to value for options
    var dentValue = document.getElementById("dentInc").value;//Points to value for options
    var uptakeValue = document.getElementById("uptakeInc").value;//Points to value for options
    var decompValue = document.getElementById("decompInc").value;//Points to value for options
    years += 10;//adds 10 years to year value
    //countdown();

    years === 300 ? (document.getElementById("10years").disabled = true) : false;//Disables button at value 50years
    var newSoil = soilNum + ((fixValue * 10) + (decompValue * 10)) - ((uptakeValue * 10) + (dentValue * 10))//equation for soil value
    console.log("new soil", newSoil)
    soilNum = Math.max(0, newSoil);//equations for output
    var newTree = trees + ((uptakeValue * 10) - (decompValue * 10))//equation for tree value
    trees = Math.max(0, newTree)//equations for output
    render();
}

function renderEllipsePool(elem, value) {
    var ovalHeight = Math.round(Math.sqrt(value * SCALING_FACTOR))//equation for increase/decrease of pools height
    var ovalWidth = OVAL_RATIO * ovalHeight//equation for increase/decrease of pools width
    elem.style.height = ovalHeight + 'px';
    elem.style.width = ovalWidth + 'px';
}

function render() {//created to stop redundancy in the resetValue function
}

function resetValue() {//resets value for years, trees soil and padding.
    years = START_YEARS;//constants to reset values
    trees = START_TREES;
    soilNum = START_SOILNUM;
    render();
    document.getElementById("10years").disabled = false;
    window.onLoad = decompFlow();
    window.onLoad = uptakeFlow();
    window.onLoad = dentrificationFlow();
    window.onLoad = selectFlow();
}

document.addEventListener("change", selectFlow);

function selectFlow() {
    if (document.getElementById("flowIncr").value != 0) {
        flowIncrArrow.style.borderLeftWidth = "";//Resets stroke width / 2
        flowIncrArrow.style.borderBottomWidth = "";//Resets stroke width
        flowIncrArrow.style.display = "block";
        document.getElementById("arrowRight").style.display = "block";

        var fixWidth = document.getElementById("flowIncr").value;

        var widthNum = (2 * fixWidth) + 1;//Equation for finding stroke width y=2x+2

        var borderLeft = flowIncrArrow.style.borderLeftWidth;//Increases stroke width left
        borderLeft = Number(borderLeft.slice(0, borderLeft.length - 2));
        flowIncrArrow.style.borderLeftWidth = (borderLeft + widthNum) + 'px';

        var borderBottom = flowIncrArrow.style.borderBottomWidth;//Increases stroke width bottom
        borderBottom = Number(borderBottom.slice(0, borderBottom.length - 2));
        flowIncrArrow.style.borderBottomWidth = (borderBottom + widthNum) + 'px';
    } else {
        flowIncrArrow.style.display = "none";
        document.getElementById("arrowRight").style.display = "none";
    }
}

document.addEventListener("change", dentrificationFlow);

function dentrificationFlow() {
    if (document.getElementById("dentInc").value != 0) {
        document.getElementById("arrowUp2").style.display = "block";
        dentrArrow.style.display = "block";
        dentrArrow.style.borderRightWidth = "";//Resets stroke width
        dentrArrow.style.borderBottomWidth = "";//Resets stroke width
        arrowUp2.style.right = "";

        var fixWidth = document.getElementById("dentInc").value;
        var widthNum = (2 * fixWidth) + 1;//Equation for finding stroke width y=2x+2

        var borderRight = dentrArrow.style.borderRightWidth;//Increases stroke width right
        borderRight = Number(borderRight.slice(0, borderRight.length - 2));
        dentrArrow.style.borderRightWidth = (borderRight + widthNum) + 'px';

        var widthDen = (2 * fixWidth / 1.5) + 18;
        var arrHeadChange = arrowUp2.style.right;
        arrHeadChange = Number(arrHeadChange.slice(0, arrHeadChange.length - 2));
        arrowUp2.style.right = (arrHeadChange + widthDen) + 'px';

        var rightBorderBottom = dentrArrow.style.borderBottomWidth;//Increases stroke width bottom
        rightBorderBottom = Number(rightBorderBottom.slice(0, rightBorderBottom.length - 2));
        dentrArrow.style.borderBottomWidth = (rightBorderBottom + widthNum) + 'px';
    } else {
        dentrArrow.style.display = "none";
        document.getElementById("arrowUp2").style.display = "none";
    }
}

document.addEventListener("change", uptakeFlow);

function uptakeFlow() {
    if (document.getElementById("uptakeInc").value != 0) {
        document.getElementById("arrowUp").style.display = "block";
        uptakeArrow.style.borderRightWidth = "";//Resets stroke width
        uptakeArrow.style.display = "block";
        arrowUp.style.right = "";
        var fixWidth = document.getElementById("uptakeInc").value;
        var widthNum = (2 * fixWidth) + 1;//Equation for finding stroke width y=2x+2

        var borderRight = uptakeArrow.style.borderRightWidth;//Increases stroke right
        borderRight = Number(borderRight.slice(0, borderRight.length - 2));
        uptakeArrow.style.borderRightWidth = (borderRight + widthNum) + 'px';

        var widthUptake = (2 * fixWidth) - 76;//**why is this portion always commented out? I fixed arrows to be betta**
        var arrHeadChange = arrowUp.style.right;
        arrHeadChange = Number(arrHeadChange.slice(0, arrHeadChange.length - 2));
        arrowUp.style.right = (arrHeadChange + widthUptake) + 'px';

    } else {
        uptakeArrow.style.display = "none";
        document.getElementById("arrowUp").style.display = "none";
    }
}

document.addEventListener("change", decompFlow);

function decompFlow() {
    if (document.getElementById("decompInc").value != 0) {
        document.getElementById("arrowDown").style.display = "block";
        decompArrow.style.borderRightWidth = "";//Resets stroke width
        arrowDown.style.left = "";
        decompArrow.style.display = "block";
        var fixWidth = document.getElementById("decompInc").value;
        var widthNum = (2 * fixWidth) + 1;//Equation for finding stroke width y=2x+2

        var borderRight = decompArrow.style.borderRightWidth;//moves the arrowhead to center of border-line
        borderRight = Number(borderRight.slice(0, borderRight.length - 2));
        decompArrow.style.borderRightWidth = (borderRight + widthNum) + 'px';

        var widthDecomp = (2 * fixWidth / 1) - 81;
        var arrHeadChange = arrowDown.style.right;
        arrHeadChange = Number(arrHeadChange.slice(0, arrHeadChange.length - 2));
        arrowDown.style.left = (arrHeadChange + widthDecomp) + 'px';
    } else {
        decompArrow.style.display = "none";
        document.getElementById("arrowDown").style.display = "none";
    }
}









