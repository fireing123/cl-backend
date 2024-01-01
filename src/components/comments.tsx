'use client';
 
import Giscus from '@giscus/react';
 
const Comments = ({term}: {term : string | undefined}) => {
	return (
		<div>
			{term && <Giscus
            id="comments"
			repo="fireing123/cl-backend"
			repoId="R_kgDOKpz8cQ"
			category="General"
			categoryId="DIC_kwDOKpz8cc4Cbzrt"
			mapping="specific"
            term={term}
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
			lang="en"
			loading="lazy"
		    />}
		</div>
	);
};

export default Comments;