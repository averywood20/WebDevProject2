'use strict';

// Daily Bible Verse Implementation

// Used this API: https://scripture.api.bible/

const API_KEY = '297f0606ab430dfbcdebb20b13a97191';
const BIBLE_ID = '06125adad2d5898a-01'; 

// Verse references to fetch from the API
const verseReferences = [
    { 
        reference: 'JER.29.11', 
        context: 'God is reminding His people that He has good plans for them, even in the midst of challenges.'
    },
    { 
        reference: 'PSA.23.1', 
        context: 'A statement of trust in God\'s provision and care.'
    },
    { 
        reference: 'JHN.3.16', 
        context: 'This verse emphasizes God\'s immense love for humanity and His gift of salvation through Jesus.'
    },
    { 
        reference: 'PHP.4.13', 
        context: 'Paul encourages believers that they can endure any situation with Christ\'s strength.'
    },
    {
        reference: 'PSA.46.1',
        context: 'A statement about God\'s power and protection during hardtimes.'
    },
    {
        reference: 'ROM.8.28',
        context: 'Reassurance to believers that when life does not make sense, God is still sovereign.'
    },
    {
        reference: 'JOS.1.9',
       context: 'God has called us to be strong and not have fear. He will be with us everywhere and will never leave us.' 
    }

];

// Function to fetch verse from API.Bible
async function fetchVerse(bibleId, verseId) {
    try {
        const response = await fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/verses/${verseId}?content-type=json&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=false&include-verse-spans=false`, {
            headers: {
                'api-key': API_KEY
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch verse');
        }
        
        const data = await response.json();
        return data; // Return the full response including meta data
    } catch (error) {
        console.error('Error fetching verse:', error);
        return null;
    }
}

// Display the verse of the day 
async function displayVerseOfDay() {
    const verseContent = document.getElementById('verse-content');
    if (!verseContent) return;

    // Loading state 
    verseContent.innerHTML = 'Loading verse...';

    // Generate verse index 
    const verseIndex = Math.floor(Math.random() * verseReferences.length);
    const verseID = verseReferences[verseIndex];

    // console.log(verseID);

    try {
        const response = await fetchVerse(BIBLE_ID, verseID.reference);
        const verseData = response ? response.data : null;

        // Extract the verse text from the nested JSON structure
        let verseText = '';
            
        // Navigate through the content structure to find the text
        if (verseData.content && verseData.content.length > 0) {
            // Loop through each content item
            verseData.content.forEach(contentItem => {
                // Check if it has items (for nested structure)
                if (contentItem.items && contentItem.items.length > 0) {
                    // Extract text from each item
                    contentItem.items.forEach(item => {
                        if (item.text) {
                            verseText += item.text;
                        }
                    });
                }
            });
        }
        
        // Display the verse content
        verseContent.title = `Context: ${verseID.context}`;
        verseContent.innerHTML = `${verseText} - ${verseData.reference}`;
    } catch (error) {
        console.error('Error displaying verse:', error);
        verseContent.innerHTML = 'Unable to load verse. Please try again later.';
    }
}

displayVerseOfDay();