'use client';
 
import Giscus from '@giscus/react';
 
const Comments = ({ id, repo, repoId, category, categoryId }: { id: string, repo: `${string}/${string}`, repoId: string, category: string, categoryId: string }) => {
	return (
		<Giscus
            id={id}
			repo={repo}
			repoId={repoId}
			category={category}
			categoryId={categoryId}
			mapping="pathname"
			reactionsEnabled="1"
			emitMetadata="0"
			inputPosition="top"
			theme="preferred_color_scheme"
			lang="en"
			loading="lazy"
		/>
	);
};
 
export default Comments;