<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OP.GG Champion Builder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            overflow: auto;
            background: #333;
        }
        .container {
            padding: 5px;
            text-align: center;
        }
        .quick-select {
            margin-top: 20px;
        }
        .quick-select input {
            margin: 5px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: text;
        }
        footer {
            left: 0;
            bottom: 0;
            width: 100%;
            color: white;
            text-align: center;
            padding: 2px;
            font-size: 14px;
        }
        footer a {
            color: #e44444;
            text-decoration: none;
        }
        footer a.hl {
            color: #1062fe;
            text-decoration: none;
        }
        h4 {
            text-align: center;
            color: gray;
        }
        form {
            text-align: center;
            margin-top: 20px;
        }
        button, select, input[type="button"] {
            margin-top: 10px;
            padding: 8px 16px;
            font-size: 16px;
            border-radius: 4px;
        }
        input[type="text"] {
            padding: 8px;
            border-radius: 4px;
        }
        button:hover {
            cursor: pointer;
        }
        .quick-pick-item {
            display: inline-block;
            margin: 5px;
            cursor: pointer;
            background: #444;
            color: white;
            padding: 10px;
            border-radius: 4px;
        }
        .remove-button {
            color: red;
            font-weight: bold;
            margin-left: 5px;
            border: none;
            background: transparent;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2 style="color:#fff;">OP.GG Champion Builder</h2>
        <form id="championForm">
            <label style="color:#fff;" for="champion">Enter Champion Name:</label>
            <input type="text" id="champion" name="champion" placeholder="Lux/Miss Fortune/Twitch">
            <br><br>
            <label style="color:#fff;" for="region">Select Region:</label>
            <select id="region" name="region">
                <option value="euw">EUW</option>
                <option value="eune">EUNE</option>
                <option value="na1">NA</option>
                <option value="kr">KR</option>
                <option value="jp">JP</option>
                <option value="br">BR</option>
                <option value="las">LAS</option>
                <option value="lan">LAN</option>
                <option value="oce">OCE</option>
                <option value="ru">RU</option>
            </select>
            <br><br>
            <label style="color:#fff;" for="tier">Select Rank:</label>
            <select id="tier" name="tier">
                <option value="iron">Iron</option>
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
                <option value="diamond">Diamond</option>
                <option value="master">Master</option>
                <option value="grandmaster">Grandmaster</option>
                <option value="challenger">Challenger</option>
            </select>
            <br><br>
            <button type="submit">Open Build Page</button>
        </form>

        <div class="quick-select">
            <h3 style="color:#fff;">Quick Picks - Most Popular Champions</h3>
            <div id="quickPicksContainer"></div>
            <h3 style="color:#fff;">Add Custom Champion to Quick Picks</h3>
            <input type="text" id="customChampion" placeholder="Enter Champion Name">
            <button onclick="addCustomChampion()">Add to Quick Picks</button>
        </div>
        <p>Your browser will use local storage to remember: Last Region Used, Last Rank Selected and Saved Quick Picks.</p>
        <p>No data is saved to our servers.</p>

        <!-- Button to clear saved data -->
        <button onclick="clearLocalStorage()">Clear All Saved Data</button>
    </div>

    <footer>
        <h3>This is a free tool because everyone loves shortcuts... And free things! 😉 Brought to you by <b><a href="https://opsassist.net" target="_blank">Ops Assist</a></b> and <b><a class="hl" href="https://hyperlayer.net" target="_blank">Hyper Layer</a></b>.</h3>
        <p style="font-size: 1em; color: #666;">Disclaimer: This tool is not affiliated with or endorsed by OP.GG. All trademarks and copyrights belong to their respective owners.</p>
    </footer>

    <script>
        // Function to load custom quick picks from local storage
        function loadCustomQuickPicks() {
            const quickPicks = JSON.parse(localStorage.getItem('quickPicks')) || [];
            const container = document.getElementById('quickPicksContainer');
            container.innerHTML = ''; // Clear existing buttons

            // Sort quick picks alphabetically
            quickPicks.sort((a, b) => a.localeCompare(b));

            quickPicks.forEach(champion => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'quick-pick-item';

                // Champion name
                const championName = document.createElement('span');
                championName.innerText = champion; // Use the raw champion name for display
                championName.onclick = () => setChampion(champion); // Set champion on click

                // Remove button
                const removeButton = document.createElement('button');
                removeButton.className = 'remove-button';
                removeButton.innerText = '❌';
                removeButton.onclick = (event) => {
                    event.stopPropagation(); // Prevent triggering the champion click
                    removeCustomChampion(champion);
                };

                // Append elements
                itemDiv.appendChild(championName);
                itemDiv.appendChild(removeButton);
                container.appendChild(itemDiv);
            });
        }

        // Function to set champion name in input field
        function setChampion(champion) {
            document.getElementById('champion').value = champion; // Directly set the champion name
        }

        // Function to add a custom champion to quick picks
        function addCustomChampion() {
            const customChampion = document.getElementById('customChampion').value.trim();
            if (customChampion) {
                const quickPicks = JSON.parse(localStorage.getItem('quickPicks')) || [];
                if (!quickPicks.includes(customChampion)) {
                    quickPicks.push(customChampion);
                    localStorage.setItem('quickPicks', JSON.stringify(quickPicks));
                    loadCustomQuickPicks(); // Refresh quick picks
                }
                document.getElementById('customChampion').value = ''; // Clear input
            }
        }

        // Function to remove a custom champion from quick picks
        function removeCustomChampion(champion) {
            let quickPicks = JSON.parse(localStorage.getItem('quickPicks')) || [];
            quickPicks = quickPicks.filter(c => c !== champion);
            localStorage.setItem('quickPicks', JSON.stringify(quickPicks));
            loadCustomQuickPicks(); // Refresh quick picks
        }

        // Function to clear all saved data (local storage)
        function clearLocalStorage() {
            if (confirm('Are you sure you want to clear all saved data? This will remove all custom quick picks, region, and rank settings.')) {
                localStorage.clear();
                loadCustomQuickPicks(); // Refresh quick picks
                loadLastUsedSettings(); // Load default settings
            }
        }

        // Detect "Enter" keypress in customChampion input field and add the champion
        document.getElementById('customChampion').addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission
                addCustomChampion(); // Add champion
            }
        });

// Event listener for form submission to open the build page
document.getElementById('championForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    saveLastUsedSettings(); // Save current settings
    const champion = document.getElementById('champion').value.trim(); // Get the champion name
    const encodedChampion = encodeURIComponent(champion.replace(/\s+/g, '')); // Encode champion name without spaces
    const region = document.getElementById('region').value;
    const tier = document.getElementById('tier').value;
    const url = `https://www.op.gg/champions/${encodedChampion}/build/?region=${region}&tier=${tier}`;
    window.open(url, '_blank');
});


        // Load the last used region and rank on page load
        function loadLastUsedSettings() {
            const lastRegion = localStorage.getItem('lastRegion') || 'euw'; // Default to EUW
            const lastTier = localStorage.getItem('lastTier') || 'bronze'; // Default to Bronze

            document.getElementById('region').value = lastRegion;
            document.getElementById('tier').value = lastTier;
        }

        // Save the last used region and rank
        function saveLastUsedSettings() {
            const region = document.getElementById('region').value;
            const tier = document.getElementById('tier').value;
            localStorage.setItem('lastRegion', region);
            localStorage.setItem('lastTier', tier);
        }

        // Load custom quick picks and last used settings on page load
        window.onload = function() {
            loadCustomQuickPicks();
            loadLastUsedSettings();
        };
    </script>
</body>
</html>
