//2. Click start
//3. Readout for years increases by 10
//4. Readout for tree nitrogen increases by 10
//5. Readout for soil = ((fix value/.5)-13 * 5)
var START_YEARS = 0;
var START_TREES = 60;
var START_SOILNUM = 120;

var years, trees, soilNum;
resetValue();

function flowMaker() {
    var fix = document.getElementById("flowIncr").value;
    soilNum += ((fix /.5) - 3) * 5;
    years += 10;
    trees += 10;
    render();
    var treePool = document.getElementById("treePool")
    treePool.style.padding = adjustPixels(treePool.style.padding, 2)

    years===50 ? (document.getElementById("10years").disabled = true) : false;
    console.log(fix)
}

// example input "2px", 2
// should return "4px"
function adjustPixels(value, amount){
    var arr = value.split(' ');
    for (var i=0; i<arr.length; i++) {
       if (isInteger(arr[i])===true) {
        
       }
    }
}


function render() {//created to stop redundancy
    document.getElementById("tree").innerHTML = trees;
    document.getElementById("year").innerHTML = years;
    document.getElementById("soil").innerHTML = soilNum;
}

function resetValue() {
    years = START_YEARS;//constants to reset values
    trees = START_TREES;
    soilNum = START_SOILNUM;
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






