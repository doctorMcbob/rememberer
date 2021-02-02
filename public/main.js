// took this function from stack overflow #noshame
function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    // because unescape has been deprecated, replaced with decodeURI
    //return unescape(dc.substring(begin + prefix.length, end));
    return decodeURI(dc.substring(begin + prefix.length, end));
} 

const auth = getCookie("Authentication")


async function storeButton () {
    const tags = document.getElementById("tags").value;
    const text = document.getElementById("text").value;
    const response = await axios({
	method  : "post",
	url     : "/mem",
	headers : {
	    Authorization : auth
	},
	data    : {
	    tags           : tags,
	    text           : text
	}
    })

    document.getElementById("response").innerHTML = `<h3>tags</h3><p>${response.data.tags}</p><h3>text</h3><p>${response.data.text}</p>`
    
}

async function retrieveButton () {
    const tags = document.getElementById("tags").value;
    const response = await axios({
	method  : "get",
	url     : `/tags/${tags}`,
	headers : {
	    Authorization : auth
	}
    })
    const ul = document.createElement("ul");

    for (let i=0; i < response.data.length; i++) {
	const li = document.createElement("li")
	li.innerHTML = `<p>${response.data[i].text}</p>`
	ul.appendChild(li)
    }
    document.getElementById("response").innerHTML = ""
    document.getElementById("response").appendChild(ul)
}

window.onload = function () {
    if (auth === null) {
	document.getElementById("access").innerHTML = "";
    }
}
