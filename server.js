const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const CATEGORIES_DIR = path.join(__dirname, 'categories');

// Serve static files
app.use(express.static(__dirname));

// API endpoint to get categories and nominees
app.get('/api/categories', async (req, res) => {
    try {
        // Check if categories directory exists
        try {
            await fs.access(CATEGORIES_DIR);
        } catch {
            // Create categories directory if it doesn't exist
            await fs.mkdir(CATEGORIES_DIR, { recursive: true });
            return res.json([]);
        }

        // Read all folders in categories directory
        const entries = await fs.readdir(CATEGORIES_DIR, { withFileTypes: true });
        const categoryFolders = entries.filter(entry => entry.isDirectory());

        const categories = [];

        for (const folder of categoryFolders) {
            const categoryPath = path.join(CATEGORIES_DIR, folder.name);
            const files = await fs.readdir(categoryPath);

            // Filter image files (jpg, jpeg, png, gif, webp)
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            const imageFiles = files.filter(file => {
                const ext = path.extname(file).toLowerCase();
                return imageExtensions.includes(ext);
            });

            if (imageFiles.length > 0) {
                const nominees = imageFiles.map(file => {
                    // Remove extension for caption
                    const caption = path.basename(file, path.extname(file));
                    return {
                        caption: caption,
                        path: `/categories/${encodeURIComponent(folder.name)}/${encodeURIComponent(file)}`
                    };
                });

                categories.push({
                    name: folder.name,
                    nominees: nominees
                });
            }
        }

        res.json(categories);
    } catch (error) {
        console.error('Error reading categories:', error);
        res.status(500).json({ error: 'Failed to read categories' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🏆 Stickers Awards Server rodando!\n`);
    console.log(`   Acesse: http://localhost:${PORT}\n`);
    console.log(`   Pasta de categorias: ${CATEGORIES_DIR}\n`);
    console.log(`   Pressione Ctrl+C para parar o servidor\n`);
});
