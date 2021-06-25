
const BASE_API_URL="https://api.github.com/users/";
const MAX_NUMBER_PROJECTS=30

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}


function getRepos(){
    document.getElementById("textarea").innerHTML="";
	var [archived,contrib]=[[],[]];
	var username=document.getElementsByName("textbox")[0].value.toLowerCase();
	console.log(username);
    var theUrl=BASE_API_URL+username+"/repos?per_page="+MAX_NUMBER_PROJECTS+"&type=all";
    console.log(theUrl);
    try{
        var repos = JSON.parse(httpGet(theUrl));
        document.getElementById("pfpic").src=repos[0]["owner"]["avatar_url"]
        repos.forEach(element => {
            console.log(element);
            if(element["archived"]){
            	archived.push(element);
            }
            else{
            	if(element["owner"]["login"]!=username){
            		contrib.push(element);
            	}else{
            		document.getElementById("textarea").innerHTML+="<p><a href='"+element["html_url"]+"' target='_blank'>"+element["name"]+"</a></p>";
            	}
            }
        });
        if(contrib.length!==0){
        	console.log(contrib!=[]);
	        document.getElementById("textarea").innerHTML+="<p>Contribuitions in</p>";
	        contrib.forEach(element => {
				document.getElementById("textarea").innerHTML+="<p><a href='"+element["html_url"]+"' target='_blank'>"+element["name"]+"</a>"+(element["archived"]?" (archived)":"")+" - "+element["owner"]["login"]+"</p>";
	        });
        }
        if(archived.length!==0){
        	console.log(archived!=[]);
	        document.getElementById("textarea").innerHTML+="<p>Archived</p>";
	        archived.forEach(element => {
				document.getElementById("textarea").innerHTML+="<p><a href='"+element["html_url"]+"' target='_blank'>"+element["name"]+"</a></p>";
	        });
        }
    }catch(error){
        if(repos["message"]=="Not Found"){
            document.getElementById("textarea").innerHTML="user not found";
        }else{
            document.getElementById("textarea").innerHTML="Something went wrong:  "+error+"<br>";
        }
    }finally{
        console.log(repos)
    }
}

