var mrArray = [];
var catArray=[];
var itemArray =[];
var priorArray=[];
//var all=[];
var index=0;
var d = new Date();


function addDate()
{
	var Due=document.getElementById("dueDate"+temp).value;
	alert ("option is: "+ Due);   
}

//Global Variable	  
var key = 1;
var referenceIndex = "";
	  
function check(reference)
{
	if (document.getElementById('box'+reference).checked == true)
	{
		alert("Finished task! Good Job!");
		referenceIndex = reference;
		document.getElementById("manipulate").style.display="block";
		document.getElementById("main").style.display="none";
	}
	else
	{
		document.getElementById("manipulate").style.display="none";
		document.getElementById("main").style.display="block";
	}
} 

function manipulateItem(reference)
{
	if(reference=="delete")
	{
		var answer = window.prompt("Do you want to delete completed task? Enter Y for yes.");
		if (answer == "y" || answer =="Y")
	    {
			
			document.getElementById("output2").innerHTML="";
			window.localStorage.removeItem(referenceIndex);
			reloadScreen();
			document.getElementById("manipulate").style.display="none";
			document.getElementById("main").style.display="block";
	    } 		  
	}
	else if(reference=="priority")
	{
		//alert(referenceIndex);
		var lsval = window.localStorage.getItem(referenceIndex);
		window.localStorage.removeItem(referenceIndex);
		if(lsval != null)
		{
			var cat = lsval.split("~")[0];
			var item = lsval.split("~")[1];
			var Due = lsval.split("~")[2];
			var prior = document.getElementById("priorityJr").value;
			var temp = cat+"~"+item+"~"+Due+"~"+prior;
				
			window.localStorage.setItem(referenceIndex, temp);
			document.getElementById("output2").innerHTML="";
			reloadScreen();
			document.getElementById("manipulate").style.display="none";
			document.getElementById("main").style.display="block";
		}
	}
}

function reloadScreen()
{
	key = 1;
	var lsval = "";
	//parsing string into vars
	var cat = "";
	var item = "";
	var Due = "";
	var prior = "";
	
	//var. dec. and init.
    var str="";
	var P3="<td>";
	var P4="</td>";
	var prior2="";
	var P2="</td></tr>";
	var temp = "";
	var temp2 = "";

	for(var i in localStorage)
	{	
		str = "";
		lsval = window.localStorage.getItem(i);
		
		if(lsval != null)
		{
			//parsing string into vars
			cat = lsval.split("~")[0];
			item = lsval.split("~")[1];
			Due = lsval.split("~")[2];
			prior = lsval.split("~")[3];
		
			//recieve priority value 
		
			if (prior == "High")
			{
				prior2 = prior.fontcolor("blue");
			}
			else if (prior == "Medium")
			{
				prior2 = prior.fontcolor("green");
			}
			else if (prior == "Low") 
			{
				prior2 = prior.fontcolor("red");
			}
			
			//increment key 
			temp=i;
			temp2=cat+"~"+item+"~"+Due+"~"+prior;
			key++;
			
			//create formatting 
			str += "<tr id="+temp+"><td>" + "<img src='img/sparkle2.gif' width='30px' height='30px' id='point'><input type = 'checkbox' id = 'box"+temp+"' onclick='check(" + temp +")'> <img src='img/sparkle2.gif' width='30px' height='30px'>" + P4 + P3 + item + P4 + P3 + Due + P4 + P3 + prior2 + P4 + P3 + cat + P2;
		   
			//place html, update mrArray 
			document.getElementById("output2").innerHTML += str;
		}
		
	}
	console.log(localStorage);
}
	
function plus()
{	
	//document.getElementById("output2").innerHTML = "";
    key=1;
	//parsing string into vars
	var cat = "";
	var item = "";
	var Due = "";
	var prior = "";
	
	
	//var. dec. and init.
    var str="";
	var P3="<td>";
	var P4="</td>";
	var prior2="";
	var P2="</td></tr>";
	var temp = "";
	var temp2 = "";

    temp=key;

	prior = document.getElementById("priority").value;

	prior = prior.toString();
	if (prior == "High")
	{
		prior2 = prior.fontcolor("blue");
	}
	else if (prior == "Medium")
	{
		prior2 = prior.fontcolor("green");
	}
	else if (prior == "Low") 
	{
		prior2 = prior.fontcolor("red");
	}
	
	cat = document.getElementById("cat").value;
	item = document.getElementById("item").value;
	Due = document.getElementById("dueDate").value;
	
	if ( d.getDate() < 10 )
	{
		var day = "0" + d.getDate();
	}
	else
	{
		var day = d.getDate();
	}
	var currDate = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + day ;
	//alert(currDate);
	var item1 = "";
	if ( Due == currDate )
	{
		item1 = item.bold();
	}
	
	if ( Due > currDate )
	{
		item1 = item.bold().toColor("red");
	}
	
	
	temp=key.toString();
	temp2=cat+"~"+item+"~"+Due+"~"+prior;
	key++;
	
	window.localStorage.setItem(temp, temp2);
	
	loadArray();
	
	for (var i = 0; i < mrArray.length; i++)
	{		
		Due = mrArray[i];
		cat = catArray[i];
		item = itemArray[i];
		prior = priorArray[i];

		//create formatting 
		str += "<tr id="+temp+"><td>" + "<img src='img/sparkle2.gif' width='30px' height='30px' id='point'><input type = 'checkbox' id = 'box"+temp+"' onclick='check(" + temp +")'> <img src='img/sparkle2.gif' width='30px' height='30px'>" + P4 + P3 + item1+ P4 + P3 + Due + P4 + P3 + prior2 + P4 + P3 + cat + P2;
		
		document.getElementById("output2").innerHTML += str;
		str="";
	}
}
	  
function getAllData()
{
	reloadScreen();
}

function clearValues()
{
	window.localStorage.clear();
	//reloadScreen();  //not working #rude
	mrArray = [];
	itemArray = [];
	catArray = [];
	priorArray = [];
	key=1;
	document.getElementById("output2").innerHTML="";
}

function loadArray()
{
	index=0;
	for(var i in localStorage) 
	{
		lsval = window.localStorage.getItem(i);
		
		if(lsval != null)
		{
			//mrArray+=lsval;
			
			//parsing string into vars
			cat = lsval.split("~")[0];
			item = lsval.split("~")[1];
			Due = lsval.split("~")[2];
			prior = lsval.split("~")[3];
			
			mrArray[index]=Due;
			catArray[index]=cat;
			itemArray[index]=item;
			priorArray[index]=prior;
			index++;
			
			//recieve priority value 
			/*if (prior == "High")
			{
				prior2 = prior.fontcolor("blue");
			}
			else if (prior == "Medium")
			{
				prior2 = prior.fontcolor("green");
			}
			else if (prior == "Low") 
			{
				prior2 = prior.fontcolor("red");
			}*/
			
			//increment key 
			/*temp=i;
			temp2=cat+"~"+item+"~"+Due+"~"+prior;
			key++;*/
		}
	}
	
	
		/*year = Due.split("-")[0];
		month = Due.split("-")[1];
		day = Due.split("-")[2];*/
		var tmp;
			for (var k=index-1; k>1; k--) {
               for (var j= 0; j < k; j++ ) {
				if (mrArray[j] > mrArray[j+1]) {
					tmp = mrArray[j];
					mrArray[j] = mrArray[j+1];
					mrArray[j+1] = tmp;
					
					tmp = catArray[j];
					catArray[j] = catArray[j+1];
					catArray[j+1] = tmp;
					
					tmp = itemArray[j];
					itemArray[j] = itemArray[j+1];
					itemArray[j+1] = tmp;
					
					tmp = priorArray[j];
					priorArray[j] = priorArray[j+1];
					priorArray[j+1] = tmp;
				}
			}
		} 
		
	
    	//alert(mrArray); 
		//alert(catArray);
		//alert(itemArray);
		//alert(priorArray); //prevent error of two or more of same dates 
}