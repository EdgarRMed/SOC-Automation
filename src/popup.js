try {
    window.onload = function () {

        // Get a reference to the select element
        var selectElement = document.getElementById('categorySelect');
    
        // Fetch the JSON file containing the categories
        fetch('config.json')
            .then(response => response.json())
            .then(data => {
                // Loop through the categories object and extract the keys (category names)
                Object.keys(data.categories).forEach(function (category) {
                    var optionElement = document.createElement('option');
                    optionElement.value = category;
                    optionElement.text = category;
                    selectElement.appendChild(optionElement);
                });
                
                // Listen for changes in the drop down menu
                selectElement.addEventListener("change", function () {
                    var selectedCategory = this.value;
                    var formContainer = document.getElementById("formContainer");
                    formContainer.innerHTML = "";
                    Object.keys(data.categories).forEach(function (category) {
                        // Render the selected category
                        if (category == selectedCategory) {
                            formContainer.innerHTML =
                                '<input type="text" id="inputValue" placeholder="Enter a value">' +
                                '<br><br>' +
                                '<input type="checkbox" id="selectAll"> Select All' + '<br>';
                            data.categories[selectedCategory].forEach(function (element) {
                                formContainer.innerHTML +=
                                    searchInteractionByName(element, data)
                                        ? `<input type="checkbox" id="${element}Checkbox"> ${element} (interaction required)<br>`
                                        : `<input type="checkbox" id="${element}Checkbox"> ${element}<br>`;
                            });
    
                            selectAllCheckboxes("selectAll", data.categories[selectedCategory].map(tool => `${tool}Checkbox`));
                        }
                    });
                });
            })
            .catch(error => console.error(error));
    
        try {
            // Default selected option
            document.getElementById("categorySelect").selectedIndex = 0;
        } catch (error) {
            console.error(error);
        }
    
        // Actions on submit
        document.getElementById("submitButton").addEventListener("click", function (e) {
            e.preventDefault();
            var inputValue;
            var toolsInCategory = [];
            // Store all the links that will be open
            var urlsToOpen = [];
            var categorySelect = document.getElementById("categorySelect");
    
            fetch('config.json')
                .then(response => response.json())
                .then(data => {
                    Object.keys(data.categories).forEach(function (category) {
                        // Detect with category is the current selected
                        if (category == categorySelect.value) {
                            // Store the IOC in a variable
                            inputValue = document.getElementById("inputValue").value;
                            // Store all the tools id's within the category in an array
                            tools = data.categories[categorySelect.value].map(tool => `${tool}Checkbox`)
                            // Search for elements in the DOM
                            tools.forEach((data) => {
                                toolsInCategory.push(document.getElementById(data));
                            });
                        }
                    });
    
    
                    // Link the selected elements with the analizer url
                    toolsInCategory.forEach((tool) => {
                        if (tool.checked) {
                            const toolName = tool.id.slice(0, -8); // Remove "Checkbox" from the end of the id
                            urlsToOpen.push(searchUrlByName(toolName, data, inputValue));
                        }
                    });
    
    
                    if (urlsToOpen.length > 0) {
                        chrome.windows.create({
                            url: urlsToOpen,
                            focused: true,
                            width: 800,
                            height: 600
                        }, function (newWindow) {
                            chrome.tabs.query({
                                windowId: newWindow.id
                            }, function (tabs) {
                                tabs.forEach(function (tab) {
                                    if (tab.url === urlsToOpen[0]) {
                                        chrome.scripting.executeScript(tab.id, {
                                            code: "console.log('Just testing stuff')"
                                        });
                                    }
                                });
                            });
                        });
                    }
                })
                .catch(error => console.error(error));
    
        });
    };
} catch (error) {
    console.error(error);
}


function selectAllCheckboxes(selectAllId, checkboxIds) {
    var selectAll = document.getElementById(selectAllId);
    selectAll.addEventListener("change", function () {
        checkboxIds.forEach(function (checkboxId) {
            document.getElementById(checkboxId).checked = selectAll.checked;
        });
    });
}

// get the asociated tool url with the tool name
function searchUrlByName(name, data, ioc) {
    const tool = data.tools.find(tool => tool.name === name);
    if (tool) {
        let url = tool.url;
        if (ioc && url.includes("IOC")) {
            url = url.replace("IOC", ioc);
        }
        return url;
    }
    return null;
}

// Determines if the tool requires interaction
function searchInteractionByName(name, data) {
    const tool = data.tools.find(tool => tool.name === name);
    return tool ? tool.interaction : false;
}