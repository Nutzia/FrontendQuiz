// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

fetch("/Quiz1/Questions_JSON")
    .then((response) => {
        return response.json();
    }).then((json) => {
        json.forEach(question => {
            const node = document.createElement("h3");                 // Create a <li> node
            const textnode = document.createTextNode(question.description);         // Create a text node
            node.appendChild(textnode);                              // Append the text to <li>
            document.getElementById("main").appendChild(node);     // Append <li> to <ul> with id="myList"

            question.choices.forEach(choice => {
                const choiceNode = document.createElement("li");
                const choiceTextNode = document.createTextNode(choice.description);         // Create a text node
                choiceNode.appendChild(choiceTextNode);                              // Append the text to <li>
                document.getElementById("main").appendChild(choiceNode);     // Append <li> to <ul> with id="myList"
            });
        });
    })

