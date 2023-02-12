window.onload = function () {
    try {
        document.getElementById("categorySelect").selectedIndex = 0;
    } catch (error) {
        console.error(error);
    }
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
                '<input type="checkbox" id="whoisCheckbox"> Whois' +
                '<br>' +
                '<input type="checkbox" id="netcraftCheckbox"> NETCRAFT' +
                '<br>' +
                '<input type="checkbox" id="virusTotalCheckbox"> VirusTotal (Interaction required)' +
                '<br>' +
                '<input type="checkbox" id="dnsDumpsterCheckbox"> DNSDumpster (Interaction required)' +
                '<br>' +
                '<input type="checkbox" id="URLscanBox"> URL scan (Interaction required)';

            selectAllCheckboxes("selectAll", ["talosCheckbox", "mxLookupCheckbox", "xForceheckbox", "virusTotalCheckbox", "netcraftCheckbox", "dnsDumpsterCheckbox", "whoisCheckbox",
                "URLscanBox"]);
        } else if (category === "ipAdress") {
            formContainer.innerHTML = '<input type="text" id="inputValue2" placeholder="Enter a value">' +
                '<br><br>' +
                '<input type="checkbox" id="selectAll"> Select All' +
                '<br>' +
                '<input type="checkbox" id="talosCheckbox"> Cisco Tallos Intelligence' +
                '<br>' +
                '<input type="checkbox" id="xForceheckbox"> IBM X-Force Exchange' +
                '<br>' +
                '<input type="checkbox" id="geolocationCheckbox"> IP Geolocation' +
                '<br>' +
                '<input type="checkbox" id="virusTotalCheckbox"> VirusTotal (Interaction required)' +
                '<br>' +
                '<input type="checkbox" id="AbuseIPDBCheckbox"> AbuseIPDB';
            selectAllCheckboxes("selectAll", ["talosCheckbox", "xForceheckbox", "virusTotalCheckbox", "AbuseIPDBCheckbox"
                , "geolocationCheckbox"]);
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
        var URLscanBox;
        var geolocationCheckbox;
        if (category === 'url') {
            inputValue = document.getElementById("inputValue").value;
            talosCheckbox = document.getElementById("talosCheckbox");
            mxLookupCheckbox = document.getElementById("mxLookupCheckbox");
            xForceheckbox = document.getElementById("xForceheckbox");
            virusTotalCheckbox = document.getElementById("virusTotalCheckbox");
            netcraftCheckbox = document.getElementById("netcraftCheckbox");
            dnsDumpsterCheckbox = document.getElementById("dnsDumpsterCheckbox");
            whoisCheckbox = document.getElementById("whoisCheckbox");
            URLscanBox = document.getElementById("URLscanBox");
        } else if (category === 'ipAdress') {
            inputValue = document.getElementById("inputValue2").value;
            talosCheckbox = document.getElementById("talosCheckbox");
            xForceheckbox = document.getElementById("xForceheckbox");
            geolocationCheckbox = document.getElementById("geolocationCheckbox");
            virusTotalCheckbox = document.getElementById("virusTotalCheckbox");
            abuseIPDBCheckbox = document.getElementById("AbuseIPDBCheckbox");
        } else if (category === 'headers') {
            msHeaderAnalyzer = document.getElementById("msHeaderAnalyzer");
            mxToolboxCheckBox = document.getElementById("mxToolboxCheckBox");
        }

        // Store all the links that will be open
        var urlsToOpen = [];
        if (talosCheckbox && talosCheckbox.checked) {
            urlsToOpen.push("https://www.talosintelligence.com/reputation_center/lookup?search=" + inputValue);
        }
        if (mxLookupCheckbox && mxLookupCheckbox.checked) {
            urlsToOpen.push("https://mxtoolbox.com/SuperTool.aspx?action=a%3a" + inputValue + "&run=toolpage");
        }
        if (xForceheckbox && xForceheckbox.checked) {
            urlsToOpen.push("https://exchange.xforce.ibmcloud.com/url/" + inputValue);
        }
        if (virusTotalCheckbox && virusTotalCheckbox.checked) {
            urlsToOpen.push("https://www.virustotal.com/gui/home/url");
        }
        if (netcraftCheckbox && netcraftCheckbox.checked) {
            urlsToOpen.push("https://toolbar.netcraft.com/site_report?url=" + inputValue);
        }
        if (dnsDumpsterCheckbox && dnsDumpsterCheckbox.checked) {
            urlsToOpen.push("https://dnsdumpster.com/");
        }
        if (whoisCheckbox && whoisCheckbox.checked) {
            urlsToOpen.push("https://who.is/whois/" + inputValue);
        }
        if (abuseIPDBCheckbox && abuseIPDBCheckbox.checked) {
            urlsToOpen.push("https://www.abuseipdb.com/check/" + inputValue);
        }
        if (msHeaderAnalyzer && msHeaderAnalyzer.checked) {
            urlsToOpen.push("https://mha.azurewebsites.net/");
        }
        if (mxToolboxCheckBox && mxToolboxCheckBox.checked) {
            urlsToOpen.push("https://mxtoolbox.com/EmailHeaders.aspx");
        }
        if (URLscanBox && URLscanBox.checked) {
            urlsToOpen.push("https://urlscan.io/");
        }
        if (geolocationCheckbox && geolocationCheckbox.checked) {
            urlsToOpen.push("https://db-ip.com/" + inputValue);
        }

        if (urlsToOpen.length > 0) {
            chrome.windows.create({
                url: urlsToOpen,
                focused: true
            }, function (newWindow) {
                chrome.tabs.query({
                    windowId: newWindow.id
                }, function (tabs) {
                    tabs.forEach(function (tab) {
                        if (tab.url === urlsToOpen[0]) {
                            chrome.scripting.executeScript(tab.id, {
                                code: "console.log('Hello from the first new tab!')"
                            });
                        }
                    });
                });
            });
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