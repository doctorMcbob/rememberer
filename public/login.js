/*
  js
*/
async function formSubmit () {
    
    const name = document.getElementById("name").value;
    const pass = document.getElementById("password").value;
    const response = await axios.post("/login", {
	name     : name,
	password : pass
    })
    if (response.status === 200){
	document.cookie = `Authentication=Bearer ${response.data}`;
	document.getElementById("form").innerHTML = "<p>Logged in!</p>";
    }
}
