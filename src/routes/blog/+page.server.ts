export const load = async () => {
    const {default: matter} = await import('gray-matter');

    const postsImported = import.meta.glob('../../posts/*.md', {as: 'raw', eager: true});

    const posts = Object.entries(postsImported).map(([path, module]) => {
        const { content, data: metadata } = matter(module as string);
        const slug = path.split('/').pop()?.replace('.md', '');

        const preview = content.substring(0, 100) + '...';

        return { metadata, slug, preview };
    });
    return {posts};
}