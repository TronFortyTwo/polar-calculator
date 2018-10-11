function init()
{
	sessionStorage.setItem("ptnum", "0");
}


function addPoint()
{
	let table = document.getElementById("table");
	
	// update pts counter
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	ptnum++;
	sessionStorage.setItem("ptnum", ptnum);
	
	// remove last row (button)
	table.deleteRow(ptnum);
	
	// add a new row to the table for the new point
	let new_row = document.createElement("tr");
	
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	
	cell1.innerHTML = "Point&nbsp;" + ptnum;
	cell2.innerHTML = "<center><input id='inang' type='text' style='width:80%'></center>";
	cell3.innerHTML = "<center><input id='indis' type='text' style='width:80%'></center>";
	
	new_row.appendChild(cell1);
	new_row.appendChild(cell2);
	new_row.appendChild(cell3);
	
	table.appendChild(new_row);
	
	// create the new button
	let but_row = document.createElement("tr"); 
	but_row.colspan = "3";
	
	but_row.innerHTML = "<input id='b' type='button' onclick='confirm()' value='OK' style='width:100%'>";
	
	table.appendChild(but_row);
}

function confirm()
{
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	let table = document.getElementById("table");
	
	let ang = document.getElementById("inang").value;
	ang = ang.replace(",", ".");
	sessionStorage.setItem("ang"+ptnum, ang);
	
	let dis = document.getElementById("indis").value;
	dis = dis.replace(",", ".");
	sessionStorage.setItem("dis"+ptnum, dis);
	
	// remove old rows
	table.deleteRow(ptnum+1);
	table.deleteRow(ptnum);
	
	// create new point row
	let new_row = document.createElement("tr");
	
	let cell1 = document.createElement("td");
	let cell2 = document.createElement("td");
	let cell3 = document.createElement("td");
	
	cell1.innerHTML = "Point&nbsp;" + ptnum;
	cell2.innerHTML = "<center>"+ang+"</center>";
	cell3.innerHTML = "<center>"+dis+"</center>";
	
	new_row.appendChild(cell1);
	new_row.appendChild(cell2);
	new_row.appendChild(cell3);
	
	table.appendChild(new_row);
	
	// create new button
	let but_row = document.createElement("tr"); 
	but_row.colspan = "3";
	
	but_row.innerHTML = "<input id='b' type='button' onclick='addPoint()' value='Add point' style='width:100%'>";
	
	table.appendChild(but_row);
	
	updateArea();
}

function updateArea()
{
	let ptnum = Number(sessionStorage.getItem("ptnum"));
	
	let A = Number(0);
	
	let i;
	
	for(i=1; i<=ptnum; i++)
	{
		let next_ang = Number(0);
		let next_dis = Number(0);
		let ang_fin = Number(0);
		
		if(i != ptnum)
		{
			next_ang = Number(sessionStorage.getItem("ang"+(i+1)));
			next_dis = Number(sessionStorage.getItem("dis"+(i+1)));
		}
		else
		{
			next_ang = Number(sessionStorage.getItem("ang1"));
			next_dis = Number(sessionStorage.getItem("dis1"));
		}
		
		ang_fin = (next_ang - Number(sessionStorage.getItem("ang"+i))) * Math.PI / 200;
		
		A += Number(sessionStorage.getItem("dis"+i)) * next_dis * Math.sin( ang_fin );
	}
	
	A /= 2;
	if(A < 0)
		A = -A;
	
	document.getElementById("area").innerHTML = "AREA: " + A;
}
