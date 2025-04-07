import type { PageServerLoad } from "./$types";
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const {slug} = params;
        const filePath = path.resolve('src/posts', `${slug}.md`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { content, data: metadata } = matter(fileContent);

        return {
            content,
            metadata,
        };
    } catch (e) {
        throw error(404, 'Post not found');
    }
};