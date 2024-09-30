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
