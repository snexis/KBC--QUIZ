// External JSON Question Bank Loader (Optimized with Chunking & Auto-Error Handling for Large Files)
async function loadQuestionBank() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) throw new Error("Question bank not found");
        
        const textData = await response.text();
        let cleanData = textData.trim();

        // 1. Try standard JSON parse for smaller size/valid JSON
        try {
            fullQuestionPool = JSON.parse(cleanData);
            console.log("Successfully loaded " + fullQuestionPool.length + " questions instantly.");
            return;
        } catch (e) {
            console.warn("Direct JSON parsing failed due to large size or minor syntax errors. Activating Chunked Auto-Processor...");
        }

        // 2. Chunking & Streaming Logic for 13,000+ line/object data
        fullQuestionPool = [];
        let items = [];

        // Clean array brackets if present
        if (cleanData.startsWith('[')) cleanData = cleanData.substring(1);
        if (cleanData.endsWith(']')) cleanData = cleanData.substring(0, cleanData.length - 1);

        // Split into chunks by boundary matching object ends
        const rawObjects = cleanData.split(/\},\s*\{/);
        const BATCH_SIZE = 500;
        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < rawObjects.length; i++) {
            let str = rawObjects[i].trim();
            if (!str.startsWith('{')) str = '{' + str;
            if (!str.endsWith('}')) str = str + '}';

            try {
                const parsedObj = autoFixAndParseObj(str);
                if (parsedObj) {
                    items.push(parsedObj);
                    successCount++;
                }
            } catch (err) {
                errorCount++;
            }

            // Unblock browser thread every 500 records to prevent freezing
            if (items.length >= BATCH_SIZE) {
                fullQuestionPool.push(...items);
                items = [];
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }

        if (items.length > 0) {
            fullQuestionPool.push(...items);
        }

        console.log(`Successfully batch processed ${fullQuestionPool.length} questions. (Auto-fixed/Skipped Errors: ${errorCount})`);

    } catch (error) {
        console.error("Error loading JSON, falling back to default pool:", error);
    }
}

// Automatic Syntax Recovery & Sanitizer
function autoFixAndParseObj(rawText) {
    let cleanText = rawText.trim();
    if (cleanText.endsWith(',')) {
        cleanText = cleanText.slice(0, -1);
    }
    
    try {
        return JSON.parse(cleanText);
    } catch (e) {
        // Fix missing quotes on keys or dangling quotes/trailing commas
        try {
            cleanText = cleanText.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":');
            return JSON.parse(cleanText);
        } catch (innerErr) {
            return null;
        }
    }
}
