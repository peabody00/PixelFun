const base_url = "http://localhost:3000"
const userService = new UserService(base_url)

let gridColor = document.getElementById('colorPicker');
let gridHeight = document.getElementById('inputHeight');
let gridWidth = document.getElementById('inputWidth');
const submitButton = document.getElementById("submitButton");
const fill = document.getElementById('fill');
const fillArea = document.getElementById('fillArea');
const eyedropper = document.getElementById('eyedropper');
const grid = document.getElementById('pixelGrid');

// MAKE GRID TABLE

submitButton.addEventListener('click' , function(x){
	grid.innerHTML = " ";
	x.preventDefault();
	makeGrid();		
});

function makeGrid(x) {
	for(let i=0 ; i<gridHeight.value ; i++){
		const row = grid.insertRow(0);
		for(let j=0 ; j<gridWidth.value ; j++){
			row.insertCell(0);
		}
	}
}

//HEX TO RGB

function RGBToHex(rgb) {
	// Choose correct separator
	let sep = rgb.indexOf(",") > -1 ? "," : " ";
	// Turn "rgb(r,g,b)" into [r,g,b]
	rgb = rgb.substr(4).split(")")[0].split(sep);

	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);

	if (r.length == 1)
		r = "0" + r;
	if (g.length == 1)
		g = "0" + g;
	if (b.length == 1)
		b = "0" + b;

	return "#" + r + g + b;
}

// DRAW TOOL - SINGLE PIXEL or FILL

let fillBoolean = false;

grid.addEventListener('mousedown', function(x) {
	if (eyedropperBoolean === true) {
		if(x.target.nodeName === 'TD' && eyedropperBoolean === true){
			console.log("test")
			gridColor.value = RGBToHex(x.target.style.backgroundColor); 
			eyedropperBoolean = false
		}
	} else {
		if(x.target.nodeName === 'TD' && fillBoolean === false){
			x.target.style.backgroundColor = gridColor.value; 
			console.log(gridColor.value)
			console.log(x.target.style.backgroundColor)
			} else {
				let targetPixel = x.target
				let targetColumns = x.target.parentNode.childNodes
				let targetRow = x.target.parentNode
				let rowNumber = [...grid.rows].indexOf(targetRow)
				let colNumber = [...targetColumns].indexOf(targetPixel)
				floodFill(grid,rowNumber,colNumber,gridColor)
				fillBoolean = false
			}	
	}
	
});

// DRAW TOOL - HOLD DOWN TO DRAW

let down = false;

grid.addEventListener('mousedown', function(e) {
	down = true;
	grid.addEventListener('mouseup', function() {
		down = false;
	});

    grid.addEventListener('mouseleave', function() {
    down = false;
    });

    grid.addEventListener('mouseover', function(x) {
    const color = document.getElementById('colorPicker').value;
        if (down) {
            if (e.target.tagName === 'TD') {
            x.target.style.backgroundColor = color;
            }
        }
    });
});

// EYEDROPPER

// grid.addEventListener('mouseover', function(x) {
// 	if(x.target.nodeName === 'TD' && eyedropperBoolean === true){
// 		console.log("test")
// 		gridColor.value = RGBToHex(x.target.style.backgroundColor); 
// 		eyedropperBoolean = false
// 	}	
// });

let eyedropperBoolean = false

eyedropper.addEventListener('click', function(x) {
    x.preventDefault();
	eyedropperBoolean = true;
});

// DOUBLE CLICK TO ERASE

grid.addEventListener('dblclick', function(x) {
	x.target.style.backgroundColor = null; 
});

// FILL TOOLS

fill.addEventListener('click', function(x) {
    x.preventDefault();
    const color = document.getElementById('colorPicker').value;
    grid.querySelectorAll('td').forEach(td => td.style.backgroundColor = color);
});

fillArea.addEventListener('click', function(x) {
    x.preventDefault();
	fillBoolean = true;
	
});

const floodFill = (grid, sr, sc, gridColor) => {
    //Get the input which needs to be replaced.
    const current = grid.rows[sr].cells[sc];
    
    //If the newColor is same as the existing 
    //Then return the original image.
	// console.log(gridColor.value)
	// console.log(current.style.backgroundColor)
    // if(current.style.backgroundColor === gridColor.value || current.style.backgroundColor === ""){
	// 	console.log("Hey")
    //     return grid;
    // }
    
    //Other wise call the fill function which will fill in the existing image.
    fill(image, sr, sc, gridColor, current);
    
    //Return the image once it is filled
    return image;
};









// document.addEventListener('DOMContentLoaded', welcome)

// function welcome() {
//     const h2 = document.createElement('h2')
//     const h3 = document.createElement('h3')
//     const guestButton = document.createElement('button')
//     const container = document.getElementById('welcome-container')
//     container.append(h2)
//     h2.innerText = 'Welcome to Pixel Fun'
//     container.append(h3)
//     h3.innerText = 'Please select an option'
//     container.append(guestButton)
//     guestButton.innerText = 'Continue as Guest'
//     guestButton.setAttribute('onclick', 'guestArtwork()')

// }

// function guestArtwork() {
//     const container = document.getElementById('welcome-container')
//     container.innerHTML = ''
//     addTools();
//     // new Artwork()
// }