// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';
// 2. Define your collection(s)
const modelsCollection = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        poster: z.string(),
        environment: z.string(),
        model: z.string(),
    })
});
// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
    'models': modelsCollection,
};