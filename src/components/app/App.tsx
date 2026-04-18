import { CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);

	function applySettings(newSettings: ArticleStateType) {
		setAppliedSettings(newSettings);
	}

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appliedSettings.fontFamilyOption.value,
					'--font-size': appliedSettings.fontSizeOption.value,
					'--font-color': appliedSettings.fontColor.value,
					'--container-width': appliedSettings.contentWidth.value,
					'--bg-color': appliedSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialSettings={appliedSettings}
				defaultSettings={defaultArticleState}
				onApply={applySettings}
			/>
			<Article />
		</main>
	);
};
