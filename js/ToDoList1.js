var mrArray=[];

var myFile;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady()
{
  alert("Device Start");
  var size =0;
  window.requestFileSystem(LocalFileSystem.PERSISTENT, size, onFSsuccess, onFSerror);
  alert("device end");
}

function onFSsuccess(FS)
{
   console.log(FS.name);
   myRoot=FS.root;
   alert(FS.name);
   myRoot.getFile('schedule.txt', {create: true, exclusive:false},gotFileEntry, onCreateErr);
   alert ("Success for FS"); 
}

function gotFileEntry(fileEntry) {setUP(fileEntry, null, true);}

function readIT() 
{
   //dec. and reset vars 
   var str = "";
   key = 0;
   mrArray = [];
   
   //read file 
   myFile.file(function (file) {
      var reader = new FileReader();
      reader.onloadend = function()
	  {
		  //reads result to see if successful
		  str = this.result;
		  alert(str);
		  /*if (str != "")
		  {
			updateScreen(str);
		  }*/
      };
      alert(reader.readAsText(file));
    }, onReadErr);
	alert("START");
}

function updateScreen(str1) 
{
	//parsing string into vars
	var cat = str1.split("~")[0];
	var item = str1.split("~")[1];
	var Due = str1.split("~")[2];
	var prior = str1.split("~")[3];
	
	//var. dec. and init.
    var str="";
	var P3="<td>";
	var P4="</td>";
	
	//recieve priority value 
	var prior2="";
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
		
	var P2="</td></tr>";
	
	//increment key 
	var temp=key.toString();
	var temp2=cat+"~"+item+"~"+Due+"~"+prior;
	key++;
	
	//create formatting 
	str += "<tr id="+temp+"><td>" + "<img src='img/sparkle2.gif' width='30px' height='30px' id='point'><input type = 'checkbox' id = 'box"+temp+"' onclick='check(" + temp +")'> <img src='img/sparkle2.gif' width='30px' height='30px'>" + P4 + P3 + item + P4 + P3 + Due + P4 + P3 + prior2 + P4 + P3 + cat + P2;
   
    //place html, update mrArray 
    document.getElementById("output2").innerHTML += str;
	mrArray.push([temp,temp2]);
}

function setUP(fileEntry, x, isAppend)
{
	//setUP the file pointer for later use
    myFile=fileEntry;
}

function onFSerror(err)
{
	alert ("FS Error " + err);
}

function onReadErr (err)
{
   alert ("Read Error " + err);
}

function onCreateErr (err)
{
   alert ("Create Error " + err);
}

function writeIT() 
{
  //getfile already called and set up myFile
  myFile.createWriter(onGetWriter, onWriteErr);
}

function onGetWriter(myWriter) 
{
	//var. dec. and init.
    var str="";
	var P3="<td>";
	var P4="</td>";
	
	//recieve priority value 
	var prior = document.getElementById("priority").value;
	    prior = prior.toString();
		var prior2="";
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
		
	//obtain input from user 
	var cat = document.getElementById("cat").value.toString();
	var item = document.getElementById("item").value.toString();
	var Due = document.getElementById("dueDate").value.toString();
	var P2="</td></tr>";
	
	//increment key 
	var temp=key.toString();
	var temp2=cat+"~"+item+"~"+Due+"~"+prior;
	key++;
	
	//create formatting 
	str += "<tr id="+temp+"><td>" + "<img src='img/sparkle2.gif' width='30px' height='30px' id='point'><input type = 'checkbox' id = 'box"+temp+"' onclick='check(" + temp +")'> <img src='img/sparkle2.gif' width='30px' height='30px'>" + P4 + P3 + item + P4 + P3 + Due + P4 + P3 + prior2 + P4 + P3 + cat + P2;
   
    //place html, update mrArray 
    document.getElementById("output2").innerHTML += str;
	mrArray.push([temp,temp2]);
   
   //update file 
   myWriter.write(temp2);
}

function addDate()
{
	var Due=document.getElementById("dueDate").value;
	alert ("option is: "+ Due);   
}
	  
var key = 0;
var arrayIndex = 0;
	 
function check(a)
{
	var temp="box" + a;
	if (document.getElementById(temp).checked == true)
	{
		alert("Finished task! Good Job!");
		arrayIndex=parseInt(a);
		document.getElementByClass("manipulate").style.display="block";
		document.getElementByClass("main").style.display="none";
	}
} 

function manipulateItem(reference)
{
	if(reference=="delete")
	{
		var answer = window.prompt("Do you want to delete completed task? Enter Y for yes.");
		if (answer == "y" || answer =="Y")
	    {
			if(mrArray[arrayIndex][0]!=null)
			{
				removeArrayItem(arrayIndex);
				document.getElementById("output2").innerHTML="";
				document.getElementByClass("manipulate").style.display="none";
				document.getElementByClass("main").style.display="block";
				reloadFile();
				getAllData();
			}
	    } 		  
	}
	else if(reference=="priority")
	{
		var cat = mrArray[arrayIndex][0].split("~")[0];
		var item = mrArray[arrayIndex][0].split("~")[1];
		var Due = mrArray[arrayIndex][0].split("~")[2];
		var prior = document.getElementById("priorityJr").value;
		
		mrArray[arrayIndex][0]=cat+"~"+item+"~"+Due+"~"+prior;
		document.getElementByClass("manipulate").style.display="none";
		document.getElementByClass("main").style.display="block";
		reloadFile();
		getAllData();
		//fix dis shtuff
	}
}

function removeArrayItem(b)
{
	for(var i = 0; i <= mrArray.length; i++)
	{
		if(i.toString() == b)
		{
			mrArray[i][0]=null;
			break;
		}
	}
}

/*function changePrior()
{
	alert("Working");
	var answer2 = window.prompt("Do you want to change priority? Enter Y for yes.");
	if (answer2 == "y" || answer =="Y")
	{
		var answer3 = window.prompt("Which priority? Enter all lowercase no spaces.");
		if ( answer3 == "low")
		{
			//var newOption = document.getElementById("priority").value;
		    document.getElementById("priority").value = answer3;
			alert(prior);
		}
		else if (answer3 == "medium")
		{
			document.getElementById("priority").value = answer3;
			alert(prior);
        }
        else if (answer3 == "high")
		{
            document.getElementById("priority").value = answer3;
			alert(prior);
		}
        else
		{
			alert(prior);
        }	
	}
}*/
	
function plus()
{	
	writeIT();
	/*const fs = require('fs');*/
}	

function getAllData()
{
	onDeviceReady();
	readIT();
	/*const fs=require('fs');
	var str="";
	//var P1="<tr><td>";
	var P2="</td></tr>";
	var P3="<td>";
	var P4="</td>";
    var cat = "";
	var item = "";
	var Due = "";
	var prior="";
	var prior2="";
	if(fs.exists('schedule.txt')==true)
	{
		fs.readFile('schedule.txt', 'utf-8', (err,line) => {
			cat = line.split("~")[0];
			item = line.split("~")[1];
			Due = line.split("~")[2];
			prior = line.split("~")[3];
			
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
			
			temp=key.toString();
			key++;
			str += "<tr id="+temp+"><td>" + "<img src='img/sparkle2.gif' width='30px' height='30px' id='point'><input type = 'checkbox' id = 'box"+temp+"' onclick='check(" + temp +")'> <img src='img/sparkle2.gif' width='30px' height='30px'>" + P4 + P3 + item + P4 + P3 + Due + P4 + P3 + prior2 + P4 + P3 + cat + P2;	
			
			document.getElementById("output2").innerHTML += str;
		});
	}*/
}

/*function clear()
{

}*/