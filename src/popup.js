window.onload = function () {
    document.getElementById("categorySelect").selectedIndex = 0;
    document.getElementById("categorySelect").addEventListener("change", function () {
        var category = this.value;
        var formContainer = document.getElementById("formContainer");
        formContainer.innerHTML = "";
        if (category === "category1") {
            formContainer.innerHTML = '<input type="text" id="inputValue" placeholder="Enter a value">' +
                '<br><br>' +
                '<input type="checkbox" id="selectAll1"> Select All' +
                '<br>' +
                '<input type="checkbox" id="checkbox1"> Cisco Tallos Intelligence' +
                '<br>' +
                '<input type="checkbox" id="checkbox2"> MX Lookup Tool' +
                '<br>' +
                '<input type="checkbox" id="checkbox3"> IBM X-Force Exchange' +
                '<br>' +
                '<input type="checkbox" id="checkbox4"> VirusTotal' +
                '<br>' +
                '<input type="checkbox" id="checkbox5"> NETCRAFT' +
                '<br>' +
                '<input type="checkbox" id="checkbox6"> DNSDumpster' +
                '<br>' +
                '<input type="checkbox" id="checkbox7"> Whois';

            selectAllCheckboxes("selectAll1", ["checkbox1", "checkbox2", "checkbox3", "checkbox4", "checkbox5", "checkbox6", "checkbox7"]);
        } else if (category === "category2") {
            formContainer.innerHTML = '<input type="text" id="inputValue2" placeholder="Enter a value">' +
                '<br><br>' +
                '<input type="checkbox" id="checkbox4"> Checkbox 4' +
                '<br>' +
                '<input type="checkbox" id="checkbox5"> Checkbox 5' +
                '<br>' +
                '<input type="checkbox" id="checkbox6"> Checkbox 6';
        } else if (category === "category3") {
            formContainer.innerHTML = '<input type="text" id="inputValue3" placeholder="Enter a value">' +
                '<br><br>' +
                '<input type="checkbox" id="checkbox7"> Checkbox 7' +
                '<br>' +
                '<input type="checkbox" id="checkbox8"> Checkbox 8' +
                '<br>' +
                '<input type="checkbox" id="checkbox9">; Checkbox 9' +
                '<br>' +
                '<input type="checkbox" id="checkbox10">; Checkbox 10';
        } else if (category === "none") {
            // don't render any form
        }
    });

    document.getElementById("submitButton").addEventListener("click", function (e) {
        e.preventDefault();
        var categorySelect = document.getElementById("categorySelect");
        var category = categorySelect.value;
        var inputValue;
        var checkbox1;
        var checkbox2;
        var checkbox3;
        var checkbox4;
        var checkbox5;
        var checkbox6;
        var checkbox7;
        if (category === 'category1') {
            inputValue = document.getElementById("inputValue").value;
            checkbox1 = document.getElementById("checkbox1");
            checkbox2 = document.getElementById("checkbox2");
            checkbox3 = document.getElementById("checkbox3");
            checkbox4 = document.getElementById("checkbox4");
            checkbox5 = document.getElementById("checkbox5");
            checkbox6 = document.getElementById("checkbox6");
            checkbox7 = document.getElementById("checkbox7");
        } else if (category === 'category2') {
            inputValue = document.getElementById("inputValue2").value;
            checkbox1 = document.getElementById("checkbox4");
            checkbox2 = document.getElementById("checkbox5");
            checkbox3 = document.getElementById("checkbox6");
        } else if (category === 'category3') {
            inputValue = document.getElementById("inputValue3").value;
            checkbox1 = document.getElementById("checkbox7");
            checkbox2 = document.getElementById("checkbox8");
            checkbox3 = document.getElementById("checkbox9");
        }
        if (checkbox1.checked) {
            chrome.tabs.create({ url: "https://www.talosintelligence.com/reputation_center/lookup?search=" + inputValue });
        }
        if (checkbox2.checked) {
            chrome.tabs.create({ url: "https://mxtoolbox.com/SuperTool.aspx?action=a%3a" + inputValue + "&run=toolpage" });
        }
        if (checkbox3.checked) {
            chrome.tabs.create({ url: "https://exchange.xforce.ibmcloud.com/url/" + inputValue });
        }
        if (checkbox4.checked) {
            chrome.tabs.create({ url: "https://www.virustotal.com/gui/home/url" }, function (tab) {
                console.log("Working");
                setTimeout(() => {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: tab.id },
                            function: function () {
                                document.addEventListener('DOMContentLoaded', () => {
                                    document.getElementById("urlSearchInput").value = "${inputValue}";
                                    document.getElementById("urlSearchInput").form.submit();
                                })
                            }


                        });
                }, 1000);

            });
        }
        if (checkbox5.checked) {
            chrome.tabs.create({ url: "https://toolbar.netcraft.com/site_report?url=" + inputValue });
        }
        if (checkbox6.checked) {
            chrome.tabs.create({ url: "https://dnsdumpster.com/" });
        }
        if (checkbox7.checked) {
            chrome.tabs.create({ url: "https://who.is/whois/" + inputValue });
        }
    });
};

function selectAllCheckboxes(selectAllId, checkboxIds) {
    var selectAll = document.getElementById(selectAllId);
    selectAll.addEventListener("change", function () {
        checkboxIds.forEach(function (checkboxId) {
            document.getElementById(checkboxId).checked = selectAll.checked;
        });
    });
}