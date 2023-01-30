window.onload = function () {
    document.getElementById("categorySelect").selectedIndex = 0;
    document.getElementById("categorySelect").addEventListener("change", function () {
        var category = this.value;
        var formContainer = document.getElementById("formContainer");
        formContainer.innerHTML = "";
        if (category === "url") {
            formContainer.innerHTML = '<input type="text" id="inputValue" placeholder="Enter a value">' +
                '<br><br>' +
                '<input type="checkbox" id="selectAll"> Select All' +
                '<br>' +
                '<input type="checkbox" id="talosCheckbox"> Cisco Tallos Intelligence' +
                '<br>' +
                '<input type="checkbox" id="mxLookupCheckbox"> MX Lookup Tool' +
                '<br>' +
                '<input type="checkbox" id="xForceheckbox"> IBM X-Force Exchange' +
                '<br>' +
                '<input type="checkbox" id="virusTotalCheckbox"> VirusTotal (Interaction required)' +
                '<br>' +
                '<input type="checkbox" id="netcraftCheckbox"> NETCRAFT' +
                '<br>' +
                '<input type="checkbox" id="dnsDumpsterCheckbox"> DNSDumpster (Interaction required)' +
                '<br>' +
                '<input type="checkbox" id="whoisCheckbox"> Whois';

            selectAllCheckboxes("selectAll", ["talosCheckbox", "mxLookupCheckbox", "xForceheckbox", "virusTotalCheckbox", "netcraftCheckbox", "dnsDumpsterCheckbox", "whoisCheckbox"]);
        } else if (category === "ipAdress") {
            formContainer.innerHTML = '<input type="text" id="inputValue2" placeholder="Enter a value">' +
                '<br><br>' +
                '<input type="checkbox" id="selectAll"> Select All' +
                '<br>' +
                '<input type="checkbox" id="talosCheckbox"> Cisco Tallos Intelligence' +
                '<br>' +
                '<input type="checkbox" id="xForceheckbox"> IBM X-Force Exchange' +
                '<br>' +
                '<input type="checkbox" id="virusTotalCheckbox"> VirusTotal (Interaction required)' +
                '<br>' +
                '<input type="checkbox" id="AbuseIPDBCheckbox"> AbuseIPDB';
            selectAllCheckboxes("selectAll", ["talosCheckbox", "xForceheckbox", "virusTotalCheckbox", "AbuseIPDBCheckbox"]);
        } else if (category === "headers") {
            formContainer.innerHTML = '<input type="checkbox" id="selectAll"> Select All' +
                '<br>' +
                '<input type="checkbox" id="msHeaderAnalyzer"> Microsof Header analyzer (Interaction required)' +
                '<br>' +
                '<input type="checkbox" id="mxToolboxCheckBox"> MX toolbox (Interaction required)';
            selectAllCheckboxes("selectAll", ["msHeaderAnalyzer", "mxToolboxCheckBox"]);
        } else if (category === "none") {
            // don't render any form
        }
    });

    document.getElementById("submitButton").addEventListener("click", function (e) {
        e.preventDefault();
        var categorySelect = document.getElementById("categorySelect");
        var category = categorySelect.value;
        var inputValue;
        var talosCheckbox;
        var mxLookupCheckbox;
        var xForceheckbox;
        var virusTotalCheckbox;
        var netcraftCheckbox;
        var dnsDumpsterCheckbox;
        var whoisCheckbox;
        var abuseIPDBCheckbox;
        var msHeaderAnalyzer;
        var mxToolboxCheckBox;
        if (category === 'url') {
            inputValue = document.getElementById("inputValue").value;
            talosCheckbox = document.getElementById("talosCheckbox");
            mxLookupCheckbox = document.getElementById("mxLookupCheckbox");
            xForceheckbox = document.getElementById("xForceheckbox");
            virusTotalCheckbox = document.getElementById("virusTotalCheckbox");
            netcraftCheckbox = document.getElementById("netcraftCheckbox");
            dnsDumpsterCheckbox = document.getElementById("dnsDumpsterCheckbox");
            whoisCheckbox = document.getElementById("whoisCheckbox");
        } else if (category === 'ipAdress') {
            inputValue = document.getElementById("inputValue2").value;
            talosCheckbox = document.getElementById("talosCheckbox");
            xForceheckbox = document.getElementById("xForceheckbox");
            virusTotalCheckbox = document.getElementById("virusTotalCheckbox");
            abuseIPDBCheckbox = document.getElementById("AbuseIPDBCheckbox");
        } else if (category === 'headers') {
            msHeaderAnalyzer = document.getElementById("msHeaderAnalyzer");
            mxToolboxCheckBox = document.getElementById("mxToolboxCheckBox");
        }


        if (talosCheckbox && talosCheckbox.checked) {
            chrome.tabs.create({ url: "https://www.talosintelligence.com/reputation_center/lookup?search=" + inputValue });
        }
        if (mxLookupCheckbox && mxLookupCheckbox.checked) {
            chrome.tabs.create({ url: "https://mxtoolbox.com/SuperTool.aspx?action=a%3a" + inputValue + "&run=toolpage" });
        }
        if (xForceheckbox && xForceheckbox.checked) {
            chrome.tabs.create({ url: "https://exchange.xforce.ibmcloud.com/url/" + inputValue });
        }
        (async () => {
            if (virusTotalCheckbox && virusTotalCheckbox.checked) {

                await chrome.tabs.create({ url: "https://www.virustotal.com/gui/home/url" }, async function (tab) {
                    chrome.tabs.onUpdated.addListener(async function listener(tabId, changeInfo, tab) {
                        if (tabId === tab.id && changeInfo.status === "complete") {
                            chrome.tabs.onUpdated.removeListener(listener);
                            await chrome.scripting.executeScript({
                                target: { tabId: tab.id, allFrames: true },
                                function: function () {
                                    console.log('Script Running:', 'inputValue', inputValue); 
                                    var inputElement = document.getElementById('urlSearchInput'); 
                                    if (inputElement) { inputElement.value = inputValue; } else { console.log('Element not found') };
                                }
                            });
                        }
                    });
                });
            }
        })();

        if (netcraftCheckbox && netcraftCheckbox.checked) {
            chrome.tabs.create({ url: "https://toolbar.netcraft.com/site_report?url=" + inputValue });
        }
        if (dnsDumpsterCheckbox && dnsDumpsterCheckbox.checked) {
            chrome.tabs.create({ url: "https://dnsdumpster.com/" });
        }
        if (whoisCheckbox && whoisCheckbox.checked) {
            chrome.tabs.create({ url: "https://who.is/whois/" + inputValue });
        }
        if (abuseIPDBCheckbox && abuseIPDBCheckbox.checked) {
            chrome.tabs.create({ url: "https://www.abuseipdb.com/check/" + inputValue });
        }
        if (msHeaderAnalyzer && msHeaderAnalyzer.checked) {
            chrome.tabs.create({ url: "https://mha.azurewebsites.net/" });
        }
        if (mxToolboxCheckBox && mxToolboxCheckBox.checked) {
            chrome.tabs.create({ url: "https://mxtoolbox.com/EmailHeaders.aspx" });
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