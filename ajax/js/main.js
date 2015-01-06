(function(){
	//reference link element ... index 0
	var link = document.getElementsByTagName("a")[0];
	link.onclick = function (){
		//xhr object
		var xhr = new XMLHttpRequest();

		//handle the "onreadystatechange" event
		//xhr.readyState property values
		//0 = uninialized = the request hasn't been opned
		//1 = loading the = the requet has been opens
		//2 = loaded = the request has been sent to the server
		//3 = interactive = in the process of sending something back
		//4 = complete we have access to the server's response
		
		xhr.onreadystatechange = function() {
			if ((xhr.readyState == 4) && (xhr.status == 200 || xhr.status == 304)){
				var body = document.getElementsByTagName("body")[0];
				//retrive/access json data from the server
				//turn into json object
				var json = JSON.parse(xhr.responseText);

				var heading = json.heading;
				var h2 = document.createElement("h2");
				var h2Text = document.createTextNode(heading);
				h2.appendChild(h2Text);
				
				var list = document.createElement("ul");

				var items = json.items;
				//key variable inside the loop hold the ame of the key it's looping over
				for (var key in items){
					//grab each items' text value
					var item = items[key];
					//create li element
					var li = document.createElement("li");
					//get li text
					var liText = document.createTextNode(item);
					//append li text to the li
					li.appendChild(liText);
					//append the li to the list
					list.appendChild(li);
				}

				body.appendChild(h2);
				body.appendChild(list);

				//remove the link from the body
				body.removeChild(link);
			}
		};
		//open the request #1
		xhr.open("GET", "files/ajax.json", true);
		//send the request to the server #2
		xhr.send(null)
		//disable default behavior doesn't follow through.
		return false;
	};
})();